import { AsyncReturnType } from '@xenopomp/advanced-types';

import { join } from 'path';

import { readdir } from 'fs/promises';

import DebugLogger from './lib/DebugLogger';
import { REG_EGS_PATH_32, REG_EGS_PATH_64 } from './lib/constants';
import getInstallPath from './lib/getInstallPath';
import isWin from './lib/isWin';
import parseEgsDataItem from './lib/parseEgsDataItem';

let cacheEgsMainLocation: string | null = null;
let cacheEgsLibraryLocations: string[] | null = null;
let cacheEgsGameLocations: Record<string, string> | null = null;

export interface SharedProps {
  debug?: boolean;
}

/**
 * This function returns EGS main installation path.
 *
 * If user uses Linux or EGS is not installed, return false.
 */
export const getEgsMainLocation = async (
  options?: SharedProps
): Promise<false | string> => {
  const logger = new DebugLogger({
    enabled: options?.debug ?? false,
  });

  if (cacheEgsMainLocation) {
    logger.log('Cached EGS main location detected.');

    return cacheEgsMainLocation;
  }

  const sharedGetInstallPathOptions: Parameters<typeof getInstallPath>[1] = {
    key: 'AppDataPath',
  };

  const egsPath = isWin
    ? (await getInstallPath(REG_EGS_PATH_32, {
        ...sharedGetInstallPathOptions,
      })) ||
      (await getInstallPath(REG_EGS_PATH_64, {
        ...sharedGetInstallPathOptions,
      }))
    : null;

  if (!egsPath) {
    return false;
  }

  logger.log(`Detected EGS at "${egsPath}".`);

  cacheEgsMainLocation = egsPath;

  return egsPath;
};

/**
 * Get all installed EGS Games.
 *
 * @example
 * const res = await getAllEgsGames();
 *
 * console.log(res);
 */
export const getAllEgsGames = async (
  options?: SharedProps
): Promise<
  Record<
    string,
    {
      path: string;
      size: number;
    }
  >
> => {
  const logger = new DebugLogger({
    enabled: options?.debug ?? false,
  });

  const res: AsyncReturnType<typeof getAllEgsGames> = {};

  const egsMainLocation = await getEgsMainLocation({
    debug: options?.debug ?? false,
  });

  if (!egsMainLocation) {
    return {};
  }

  const pathToManifests = join(egsMainLocation, 'Manifests');

  logger.log(`Path to manifest: ${pathToManifests}`);

  const files = (await readdir(pathToManifests, { withFileTypes: true }))
    .filter(item => item.isFile())
    .filter(item => /^.*\.item$/gi.test(item.name));

  logger.log(
    `All files/directories: [${(
      await readdir(pathToManifests, { withFileTypes: true })
    )
      .filter(item => item.isFile())
      .map(file => file.name)}]`
  );
  logger.log(`Files: [${files.map(file => file.name)}]`);

  const tasks = files.map(async file => {
    logger.log(`Now processing ${JSON.stringify(file, null, 2)}`);

    const pathToFile = join(pathToManifests, file.name);

    const {
      DisplayName: displayingName,
      InstallSize: size,
      InstallLocation: path,
    } = await parseEgsDataItem(pathToFile, {
      debug: options?.debug ?? false,
    });

    res[displayingName] = {
      path,
      size,
    };
  });

  await Promise.all(tasks);

  logger.log(`Detected games:\n ${JSON.stringify(res, null, 2)}`);

  return res;
};
