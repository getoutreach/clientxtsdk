import { ExternalInfoProvider } from './ExternalInfoProvider';

/**
 * Definition of the prospect in the external data provider
 * which is linked with Outreach prospect data.
 *
 * @export
 * @class ExternalInfoContext
 */
export class ExternalInfoContext {
  /**
   *Type of external prospect data provider.
   *
   * @type {ExternalInfoProvider}
   * @memberof ExternalInfoContext
   */
  public provider: ExternalInfoProvider;

  /**
   * Is external provider plugin integration enabled?
   *
   * @type {boolean}
   * @memberof ExternalInfoContext
   */
  public enabled: boolean;

  /**
   * External data provider prospect id
   *
   * @type {string}
   * @memberof ExternalInfoContext
   */
  public id: string;

  /**
   * External data provider prospect name
   *
   * @type {(string | null)}
   * @memberof ExternalInfoContext
   */
  public name?: string | null;

  /**
   * External data provider type.
   *
   * @type {string}
   * @memberof ExternalInfoContext
   */
  public type: string;

  /**
   * The date of last data inbound operation.
   *
   * @type {Date}
   * @memberof ExternalInfoContext
   */
  public lastInbound?: Date | null;

  /**
   * The date of last data outbound operation.
   *
   * @type {(Date | null)}
   * @memberof ExternalInfoContext
   */
  public lastOutbound?: Date | null;
}
