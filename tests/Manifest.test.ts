import { AddonStore } from '../src/store/AddonStore';
import { AddonType } from '../src/store/AddonType';
import { OpportunityContextKeys } from '../src/store/keys/OpportunityContextKeys';
import { UserContextKeys } from '../src/store/keys/UserContextKeys';
import { Manifest } from '../src/store/Manifest';
import { Scopes } from '../src/store/Scopes';

describe('manifest tests', () => {
  describe('valid', () => {
    test('only valid manifest should be acceptable', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      expect(manifest.validate()).toBe(true);
    });
  });

  describe('author', () => {
    test('privacyUrl should be url', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      manifest.author.privacyUrl = 'bananas';
      expect(manifest.validate()).toBe(false);
    });

    test('termsOfUseUrl should be url', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      manifest.author.termsOfUseUrl = 'bananas';
      expect(manifest.validate()).toBe(false);
    });

    test('websiteUrl should be url', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      manifest.author.websiteUrl = 'bananas';
      expect(manifest.validate()).toBe(false);
    });
  });

  describe('api', () => {
    test('only valid scope should be acceptable', () => {
      const manifest: Manifest = Object.assign(new Manifest(), invalidScopeTypeManifest);
      expect(manifest.validate()).toBe(false);
    });
  });

  describe('host', () => {
    test('host has to be defined', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      delete manifest.host;
      expect(manifest.validate()).toBe(false);
    });

    test('host.url - only url should be acceptable', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      manifest.host.url = 'bananas';
      expect(manifest.validate()).toBe(false);
    });

    test('host.icon - only url should be acceptable', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      manifest.host.icon = 'bananas';
      expect(manifest.validate()).toBe(false);
    });

    test('only valid type should be acceptable', () => {
      const manifest: Manifest = Object.assign(new Manifest(), validManifest);
      invalidHostTypeManifest.host.type = 'bananas';
      expect(manifest.validate()).toBe(false);
    });
  });

  describe('context', () => {
    test('only valid contexts should be acceptable', () => {
      const manifest: Manifest = Object.assign(new Manifest(), invalidContextManifest);
      expect(manifest.validate()).toBe(false);
    });
  });

  describe('store', () => {
    test('only valid store type hould be acceptable', () => {
      const manifest: Manifest = Object.assign(new Manifest(), invalidStoreTypeManifest);
      expect(manifest.validate()).toBe(false);
    });
  });
});


const validManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/'
  },
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)'
  },
  title: {
    en: 'Some title (en)'
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host'
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token'
  }
} as Manifest;

const invalidContextManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/'
  },
  context: ['bananas', OpportunityContextKeys.ID, 'apples'],
  description: {
    en: 'Some description (en)'
  },
  title: {
    en: 'Some title (en)'
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host'
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token'
  }
} as Manifest;

const invalidHostTypeManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/'
  },
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)'
  },
  title: {
    en: 'Some title (en)'
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: 'BANANAS',
    url: 'http://someurl.com/host'
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token'
  }
};

const invalidStoreTypeManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/'
  },
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)'
  },
  title: {
    en: 'Some title (en)'
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host'
  },
  identifier: 'addon-identifier',
  store: 'BANANAS',
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token'
  }
};

const invalidScopeTypeManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/'
  },
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)'
  },
  title: {
    en: 'Some title (en)'
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host'
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: ['BANANA',Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token'
  }
} as Manifest;