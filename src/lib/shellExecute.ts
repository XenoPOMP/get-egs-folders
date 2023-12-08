import { ExecException, exec } from 'child_process';

/**
 * Execute Shell command.
 * @param command
 */
const shellExecute = async (
  command: string
): Promise<{
  error: ExecException | null;
  stdout: string;
  stderr: string;
}> => {
  return new Promise(resolve => {
    exec(command, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
};

export default shellExecute;
