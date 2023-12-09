import { SharedProps } from '../index';
import { EgsDataItem } from '../types/EgsDataItem';
import { readFile } from 'fs/promises';

import DebugLogger from './DebugLogger';

/**
 * Parses .item file.
 *
 * EGS uses these files to store info about managed games.
 */
const parseEgsDataItem = async (path: string, options?: SharedProps) => {
  const logger = new DebugLogger({
    enabled: options?.debug ?? false,
  });

  logger.log(`Received file: ${path}`);

  const fileContent = await readFile(path, { encoding: 'ascii' });
  logger.log(`File content: ${fileContent}`);

  const parsedJson = JSON.parse(fileContent);
  logger.log(`Parsed JSON: ${JSON.stringify(parsedJson, null, 2)}`);

  const dataItem: EgsDataItem = parsedJson as EgsDataItem;
  logger.log(`Parsed data: ${JSON.stringify(dataItem, null, 2)}`);

  return dataItem;
};

export default parseEgsDataItem;
