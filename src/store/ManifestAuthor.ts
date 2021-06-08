/**
 * Section of the manifest describing the addon author.
 * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#author
 * @export
 * @class ManifestAuthor
 */
export class ManifestAuthor {
  /**
   * Name of the company publishing addon.
   *
   * @type {string}
   * @memberof ManifestAuthor
   */
  company: string;

  /**
   *
   * Website of the addon creator.
   *
   * @type {string}
   * @memberof Author
   */
  websiteUrl: string;

  /**
   * Url of the addon creator privacy policy.
   *
   * @type {string}
   * @memberof Author
   */
  privacyUrl: string;

  /**
   * Terms of use policy url.
   *
   * @type {string}
   * @memberof Author
   */
  termsOfUseUrl: string;
}
