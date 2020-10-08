import { Event } from './Event';
import { LogLevel } from './LogLevel';

export interface ILogger {
  log: (event: Event) => void;
}

class Logger implements ILogger {
  public logging: LogLevel = window.outreach.log || LogLevel.Error;

  public log = (event: Event) => {
    switch (event.level) {
      case LogLevel.None:
        // ignore the event
        break;
      case LogLevel.Trace:
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.log(
            '[CXT][AddonSdk]::onInfo-trace (default)',
            event,
            event.context
          );
        }
        break;
      case LogLevel.Debug:
        if (this.logging <= LogLevel.Debug) {
          // tslint:disable-next-line: no-console
          console.log(
            '[CXT][AddonSdk]::onInfo-debug (default)',
            event,
            event.context
          );
        }
        break;
      case LogLevel.Info:
        if (this.logging <= LogLevel.Info) {
          // tslint:disable-next-line: no-console
          console.info(
            '[CXT][AddonSdk]::onInfo-info (default)',
            event,
            event.context
          );
        }
        break;
      case LogLevel.Warning:
        if (this.logging <= LogLevel.Warning) {
          // tslint:disable-next-line: no-console
          console.warn(
            '[CXT][AddonSdk]::onInfo-warning (default)',
            event,
            event.context
          );
        }
        break;
      case LogLevel.Error:
        // tslint:disable-next-line: no-console
        console.error(
          '[CXT][AddonSdk]::onInfo-error (default)',
          event,
          event.context
        );
        break;
    }
  };
}

export default new Logger();
