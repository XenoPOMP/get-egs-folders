import { join } from 'path';

import { REG_EGS_PATH_32, REG_EGS_PATH_64 } from './lib/constants';
import getInstallPath from './lib/getInstallPath';
import isWin from './lib/isWin';

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
