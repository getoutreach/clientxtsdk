import { LogLevel } from './LogLevel';


export class Event {
  /**
   * Message describing the event.
   *
   * @type {string}
   * @memberof Event
   */
  message?: string;

  /**
   * Type of the event.
   *
   * @type {LogLevel}
   * @memberof Event
   */
  level: LogLevel;

  /**
   * An array of contextual parameters describing the event state.
   *
   * @type {string[]}
   * @memberof Event
   */
  context: string[] = [];
}
