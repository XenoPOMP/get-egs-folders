import * as clc from 'cli-color';
import { InspectOptions } from 'util';

class DebugLogger implements Pick<Omit<Console, 'Console'>, 'log'> {
  public constructor(options?: { enabled?: boolean }) {
    this.enabled = options?.enabled ?? true;
  }

  private enabled: boolean = true;

  private prefixes: Record<keyof Omit<Console, 'Console'>, string> = {
    assert: '',
    clear: '',
    count: '',
    countReset: '',
    debug: '',
    dir: '',
    dirxml: '',
    error: '',
    group: '',
    groupCollapsed: '',
    groupEnd: '',
    info: '',
    log: '[LOG]',
    profile: '',
    profileEnd: '',
    table: '',
    time: '',
    timeEnd: '',
    timeLog: '',
    timeStamp: '',
    trace: '',
    warn: '',
  };

  private inprefixiateMessage = (
    method: keyof Omit<Console, 'Console'>,
    message: string
  ): string => {
    return `${method} ${message}`;
  };

  public enable = () => (this.enabled = true);
  public disable = () => (this.enabled = false);

  // assert(value: any, message?: string, ...optionalParams: any[]): void {}

  // clear(): void {}

  // count(label?: string): void {}

  // countReset(label?: string): void {}

  // debug(message?: any, ...optionalParams: any[]): void {}

  // dir(obj: any, options?: InspectOptions): void {}

  // dirxml(...data: any[]): void {}

  // error(message?: any, ...optionalParams: any[]): void {}

  // group(...label: any[]): void {}

  // groupCollapsed(...label: any[]): void {}

  // groupEnd(): void {}

  // info(message?: any, ...optionalParams: any[]): void {}

  log(message?: any, ...optionalParams: any[]): void {
    if (!this.enabled) {
      return;
    }

    console.log(this.inprefixiateMessage('log', message), optionalParams);
  }

  // profile(label?: string): void {}

  // profileEnd(label?: string): void {}

  // table(tabularData: any, properties?: ReadonlyArray<string>): void {}

  // time(label?: string): void {}

  // timeEnd(label?: string): void {}

  // timeLog(label?: string, ...data: any[]): void {}

  // timeStamp(label?: string): void {}

  // trace(message?: any, ...optionalParams: any[]): void {}

  // warn(message?: any, ...optionalParams: any[]): void {}
}

export default DebugLogger;
