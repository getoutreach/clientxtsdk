import { ManifestApi } from '../store/ManifestApi';
import { Locale } from './Locale';
import { Theme } from './Theme';

class RuntimeContext {
  public api?: ManifestApi;

  public locale: Locale = Locale.ENGLISH;

  public theme: Theme = Theme.LIGHT;

  public userIdentifier!: string;
}

export default new RuntimeContext();
