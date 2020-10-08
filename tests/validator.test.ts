import { AddonStore } from '../src/store/AddonStore';
import { AddonType } from '../src/store/AddonType';
import { OpportunityContextKeys } from '../src/store/keys/OpportunityContextKeys';
import { UserContextKeys } from '../src/store/keys/UserContextKeys';
import { Manifest } from '../src/store/Manifest';
import validator from '../src/sdk/Validator';
import { Scopes } from '../src/store/Scopes';

describe('manifest tests', () => {
  describe('valid', () => {
    test('only valid manifest should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      expect(validator.validate(manifest).length).toBe(0);
    });
  });

  describe('author', () => {
    test('privacyUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.privacyUrl = 'bananas';
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Author privacy url is invalid url. Value: bananas");
    });

    test('termsOfUseUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.termsOfUseUrl = 'bananas';
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Author terms of use url is invalid url. Value: bananas");
    });

    test('websiteUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.websiteUrl = 'bananas';
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Author website url is invalid url. Value: bananas");
    });
  });

  describe('api', () => {
    test('only valid scope should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(invalidScopeTypeManifest));
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Invalid api scope value. Value: BANANA");
    });
  });

  describe('host', () => {
    test('host has to be defined', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      delete manifest.host;
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Host section is missing.");
    });

    test('host.url - only url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.url = 'bananas';
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Host url is invalid. Value: bananas");
    });

    test('host.url - tokenized url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.url = "https://tokenizedurl.com/{opp.id}?uid={usr.id}";
      expect(validator.validate(manifest).length).toBe(0);
    });

    test('host.icon - only url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.icon = 'bananas';
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Host icon definition is invalid url. Value: bananas");
    });

    test('only valid type should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(invalidHostTypeManifest));
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Host type  is invalid. Value: BANANAS");
    });
  });

  describe('context', () => {
    test('only valid contexts should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(invalidContextManifest));
      expect(validator.validate(manifest).length).toBe(2);
      expect(validator.validate(manifest)[0]).toBe("Context key is not one of the valid values. Key: bananas");
      expect(validator.validate(manifest)[1]).toBe("Context key is not one of the valid values. Key: apples");
    });
  });

  describe('store', () => {
    test('only valid store type hould be acceptable', () => {
      const manifest = JSON.parse(JSON.stringify(invalidStoreTypeManifest));
      expect(validator.validate(manifest).length).toBe(1);
      expect(validator.validate(manifest)[0]).toBe("Store value is invalid. Value:tab-opportunity");
      
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