// eslint-disable-next-line no-unused-vars
import { LogLevel } from './LogLevel';
import { EventType } from './EventType';
import { AddonMessageType } from '../messages/AddonMessageType';
import { EventOrigin } from './EventOrigin';

export class Event {
  /**
   * Type of event indicating if it is internal sdk event
   * or a communication message being sent or received from addon host.
   *
   * @type {EventType}
   * @memberof Event
   */
  type: EventType;

  /**
   * Contains information on where the event originated (addon or host).
   *
   * @type {EventOrigin}
   * @memberof Event
   */
  origin: EventOrigin;

  /**
   * In case of EventType.Message events contains the type of the message being received
   * In case of EventType.Internal it is Undefined.
   *
   * @type {AddonMessageType}
   * @memberof Event
   */
  messageType?: AddonMessageType;

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
