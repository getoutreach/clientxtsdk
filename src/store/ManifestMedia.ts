/**
 * Definition of the media file shown in the extension marketplace.
 *
 * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#media
 *
 * @export
 * @class ManifestMedia
 */
export class ManifestMedia {
  /**
   * Uri of the media file.
   *
   * @type {string}
   * @memberof ManifestMedia
   */
  public uri: string;

  /**
   * Title of the media file (used as alt tag value)
   *
   * @type {string}
   * @memberof ManifestMedia
   */
  public title: string;

  /**
   * Ordinal index of file compared to other files.
   *
   * @type {number}
   * @memberof ManifestMedia
   */
  public index: number;

  /**
   * Type of the media file.
   *
   * @type {('video' | 'image')}
   * @memberof ManifestMedia
   */
  public type: 'video' | 'image';
}
