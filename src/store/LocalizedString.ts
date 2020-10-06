import { Locale } from '../sdk/Locale';

export class LocalizedString {
  public en: string;

  constructor () {
    this.en = '';
  }

  public getText = (locale: Locale) => {
    switch (locale) {
      case Locale.ENGLISH:
        return this.en;
      default:
        // TODO: nimal, 28.9.2020 - Report this to telemetry
        return this.en;
    }
  }
}
