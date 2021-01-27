
/**
   * Type of decoration update being requested
   *    text - The text update is requested
   *    badge - The badge  is being updated (empty text hides badge)
   *    icon -  Adodn icon is being updated (if any shown)
   *
   * @param {string} text
   * @param {DecorationType} [type] type of decoration update
   * @memberof AddonsSdk
   */
export declare type DecorationType = 'text' | 'badge' | 'icon';
