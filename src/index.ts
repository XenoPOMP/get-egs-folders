import { AsyncReturnType } from '@xenopomp/advanced-types';

import { join } from 'path';

import { readdir } from 'fs/promises';

import { REG_EGS_PATH_32, REG_EGS_PATH_64 } from './lib/constants';
import getInstallPath from './lib/getInstallPath';
import isWin from './lib/isWin';
import parseEgsDataItem from './lib/parseEgsDataItem';

let cacheEgsMainLocation: string | null = null;
let cacheEgsLibraryLocations: string[] | null = null;
let cacheEgsGameLocations: Record<string, string> | null = null;

/**
 * This function returns EGS main installation path.
 *
 * If user uses Linux or EGS is not installed, return false.
 */
export const getEgsMainLocation = async (): Promise<false | string> => {
  if (cacheEgsMainLocation) {
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
export const getAllEgsGames = async (): Promise<
  Record<
    string,
    {
      path: string;
      size: number;
    }
  >
> => {
  const res: AsyncReturnType<typeof getAllEgsGames> = {};

  const egsMainLocation = await getEgsMainLocation();

  if (!egsMainLocation) {
    return {};
  }

  const pathToManifests = join(egsMainLocation, 'Manifests');

  const files = (await readdir(pathToManifests, { withFileTypes: true }))
    .filter(item => item.isFile())
    .filter(item => /^.*\.item$/gi.test(item.name));

  await Promise.all(
    files.map(async file => {
      if ('path' in file && typeof file.path === 'string') {
        const pathToFile = join(file['path'], file.name);

        const {
          DisplayName: displayingName,
          InstallSize: size,
          InstallLocation: path,
        } = await parseEgsDataItem(pathToFile);

        res[displayingName] = {
          path,
          size,
        };
      }
    })
  );

  return res;
};
