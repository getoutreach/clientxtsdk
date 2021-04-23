import { ExternalProspectProvider } from './ExternalProspectProvider';

/**
 * Definition of the prospect in the external data provider
 * which is linked with Outreach prospect data.
 *
 * @export
 * @class ExternalProspectContext
 */
export class ExternalProspectContext {
  /**
   *Type of external prospect data provider.
   *
   * @type {ExternalProspectProvider}
   * @memberof ExternalProspectContext
   */
  public provider: ExternalProspectProvider;

  /**
   * Is external provider plugin integration enabled?
   *
   * @type {boolean}
   * @memberof ExternalProspectContext
   */
  public enabled: boolean;

  /**
   * External data provider prospect id
   *
   * @type {string}
   * @memberof ExternalProspectContext
   */
  public id: string;

  /**
   * External data provider prospect name
   *
   * @type {(string | null)}
   * @memberof ExternalProspectContext
   */
  public name?: string | null;

  /**
   * External data provider type.
   *
   * @type {string}
   * @memberof ExternalProspectContext
   */
  public type: string;

  /**
   * The date of last data inbound operation.
   *
   * @type {Date}
   * @memberof ExternalProspectContext
   */
  public lastInbound?: Date | null;

  /**
   * The date of last data outbound operation.
   *
   * @type {(Date | null)}
   * @memberof ExternalProspectContext
   */
  public lastOutbound?: Date | null;
}
