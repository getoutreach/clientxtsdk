import { Locale } from '../sdk/Locale';

export class LocalizedString {
    [key: string]: string;

    public getText = (locale: Locale) => {
      return this[locale];
    }
}
