/**
 * This context describes any requirements addon has from host in order to
 * be able to properly function.
 *
 * @export
 * @class ManifestHostEnvironment
 */
export class ManifestHostEnvironment {
  /**
   * Should host provide maximum space on the page for addon? (optional)
   * e.g. If true, for tab addons, Outreach host will hide right pane when addon tab is active
   *
   * @type {boolean}
   * @memberof ManifestHostEnvironment
   */
  public fullWidth?: boolean;

  /**
   * Type of the decoration to be used for badge decorations.
   *  - none - no decoration badge
   *  - simple - a dot will be shown in case of badge decoration message with count > 0
   * - full - a badge with counter will be shown.
   *
   * @type {('none' | 'dot' | 'count')}
   * @memberof ManifestHostEnvironment
   */
  public decoration: 'none' | 'simple' | 'full' = 'none';
}
