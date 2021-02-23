/**
 * This context describes any requirements addon has from host in order to
 * be able to properly function.
 *
 * @export
 * @class EnvironmentContext
 */
export class EnvironmentContext {
  /**
   * Should host provide maximum space on the page for addon? (optional)
   * e.g. If true, for tab addons, Outreach host will hide right pane when addon tab is active
   *
   * @type {boolean}
   * @memberof EnvironmentContext
   */
  public fullWidth?: boolean;
}
