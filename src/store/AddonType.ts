/* eslint-disable no-unused-vars */
/**
 * List of supported addon types.
 * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#type
 * @export
 * @enum {number}
 */
export enum AddonType {
  AccountTab = 'tab-account',
  OpportunityTab = 'tab-opportunity',
  ProspectTab = 'tab-prospect',
  LeftSideMenu = 'left-side-menu',
  ShellAction = 'shell-action',
  ShellApplication = 'shell-application',
  ShellCompanion = 'shell-companion',
  ShellKnowledge = 'shell-knowledge',
  ShellTool = 'shell-tool',
  ProspectTabSidebar = 'tab-prospect-sidebar',
  ProspectTabAction = 'tab-prospect-action',
}
