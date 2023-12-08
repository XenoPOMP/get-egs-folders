import { EgsDataItem } from '../types/EgsDataItem';
import { readFile } from 'fs/promises';

/**
 * Parses .item file.
 *
 * EGS uses these files to store info about managed games.
 */
const parseEgsDataItem = async (path: string) => {
  const fileContent = await readFile(path, { encoding: 'ascii' });
  const parsedJson = JSON.parse(fileContent);

  const dataItem: EgsDataItem = parsedJson as EgsDataItem;

  return dataItem;
};

export default parseEgsDataItem;
