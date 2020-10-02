/* eslint-disable no-unused-vars */
import { OutreachContext } from '../context/OutreachContext';
import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { Theme } from '../sdk/Theme';
import { Locale } from '../sdk/Locale';
import { ContextParam } from '../context/ContextParam';

export class InitMessage extends AddonMessage implements OutreachContext {
  /**
   *Creates an instance of InitMessage.
   * @memberof InitMessage
   */
  constructor () {
    super(AddonMessageType.INIT);
  }

  /**
   * Language locale to be used in rendering addon.
   *
   * @type {Locale}
   * @memberof InitMessage
   */
  locale: Locale = Locale.ENGLISH;
  /**
   * A theme addon should be using in rendering.
   *
   * @type {Theme}
   * @memberof InitMessage
   */
  theme: Theme = Theme.LIGHT;
  /**
   * Unique identifier hash of the Outreach user.
   *
   * @type {(string | undefined)}
   * @memberof InitMessage
   */
  userIdentifier: string | undefined;

  /**
   * Collection of the context parameters
   *
   * @type {ContextParam[]}
   * @memberof InitMessage
   */
  context: ContextParam[] = [];

  /**
   * Parent origin to be used when posting messages to parent
   *
   * @type {string}
   * @memberof InitMessage
   */
  origin: string;
}
