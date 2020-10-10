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
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(0);
    });
  });

  describe('author', () => {
    test('privacyUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.privacyUrl = 'bananas';
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Author privacy url is invalid url. Value: bananas");
    });

    test('termsOfUseUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.termsOfUseUrl = 'bananas';
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Author terms of use url is invalid url. Value: bananas");
    });

    test('websiteUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.websiteUrl = 'bananas';
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Author website url is invalid url. Value: bananas");
    });
  });

  describe('api', () => {
    test('only valid scope should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(invalidScopeTypeManifest));
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Invalid api scope value. Value: BANANA");
    });

    test('applicationId should be defined', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      delete manifest.api!.applicationId;
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Manifest Api section needs to have applicationId value.");
    });

    test('redirectUri should be valid URL', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.api!.redirectUri = 'bananas';
      
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Manifest Api section needs to have a valid redirect url. Value: bananas");
    });

  });

  describe('host', () => {
    test('host has to be defined', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      delete manifest.host;
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Host section is missing.");
    });

    test('host.url - only url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.url = 'bananas';
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Host url is invalid. Value: bananas");
    });

    test('host.url - tokenized url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.url = "https://tokenizedurl.com/{opp.id}?uid={usr.id}";
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(0);
    });

    test('host.icon - only url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.icon = 'bananas';
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Host icon definition is invalid url. Value: bananas");
    });

    test('only valid type should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(invalidHostTypeManifest));
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Host type  is invalid. Value: BANANAS");
    });
  });

  describe('context', () => {
    test('only valid contexts should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(invalidContextManifest));
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(2);
      expect(issues[0]).toBe("Context key is not one of the valid values. Key: bananas");
      expect(issues[1]).toBe("Context key is not one of the valid values. Key: apples");
    });
  });

  describe('store', () => {
    test('only valid store type hould be acceptable', () => {
      const manifest = JSON.parse(JSON.stringify(invalidStoreTypeManifest));
      var issues = validator.validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe("Store value is invalid. Value:BANANAS");
      
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
    token: 'https://someurl.com/token',
    applicationId: "AbCd123456qW",
    redirectUri: "https://addon-host.com/hello-world"
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
    token: 'https://someurl.com/token',
    applicationId: "AbCd123456qW",
    redirectUri: "https://addon-host.com/hello-world"
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
    token: 'https://someurl.com/token',
    applicationId: "AbCd123456qW",
    redirectUri: "https://addon-host.com/hello-world"
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
    token: 'https://someurl.com/token',
    applicationId: "AbCd123456qW",
    redirectUri: "https://addon-host.com/hello-world"
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
    token: 'https://someurl.com/token',
    applicationId: "AbCd123456qW",
    redirectUri: "https://addon-host.com/hello-world"
  }
} as Manifest;