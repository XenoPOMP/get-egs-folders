import shellExecute from './shellExecute';

interface GetInstallPathsOptions {
  /** This key will be used in registry query. */
  key?: string;
}

/**
 * Get installation path by registry path.
 *
 * @param regPath
 * @param options
 */
const getInstallPath = async (
  regPath: string,
  options?: GetInstallPathsOptions
): Promise<string | false> => {
  const res = await shellExecute(
    `reg query "${regPath}" /V ${options?.key ?? 'Path'}`
  );

  if (!res.error) {
    return res.stdout.split('REG_SZ')[1].trim();
  }

  return false;
};

export default getInstallPath;
