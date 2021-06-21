import { AddonStore } from '../src/store/AddonStore';
import { AddonType } from '../src/store/AddonType';
import { OpportunityContextKeys } from '../src/store/keys/OpportunityContextKeys';
import { UserContextKeys } from '../src/store/keys/UserContextKeys';
import { Manifest } from '../src/store/Manifest';
import { urlValidation, validate } from '../src/sdk/Validator';
import { Scopes } from '../src/store/Scopes';
import { AddonCategory } from '../src';

describe('manifest tests', () => {
  describe('valid', () => {
    test('only valid manifest should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      var issues = validate(manifest);
      expect(issues.length).toBe(0);
    });
  });

  describe('author', () => {
    test('privacyUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.privacyUrl = 'bananas';
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Author privacy url is invalid url. Value: bananas'
      );
    });

    test('termsOfUseUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.termsOfUseUrl = 'bananas';
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Author terms of use url is invalid url. Value: bananas'
      );
    });

    test('websiteUrl should be url', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.author.websiteUrl = 'bananas';
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Author website url is invalid url. Value: bananas'
      );
    });
  });

  describe('api', () => {
    test('only valid scope should be acceptable', () => {
      const manifest: Manifest = JSON.parse(
        JSON.stringify(invalidScopeTypeManifest)
      );
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe('Invalid api scope value. Value: BANANA');
    });

    test('applicationId should be defined', () => {
      const manifest = JSON.parse(JSON.stringify(validManifest));
      delete manifest.api!.applicationId;
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Manifest Api section needs to have applicationId value.'
      );
    });

    test('redirectUri should be valid URL', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.api!.redirectUri = 'bananas';

      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Manifest Api section needs to have a valid redirect url. Value: bananas'
      );
    });

    test('token endpoint should be valid URL', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.api!.token = 'bananas';

      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Manifest Api section needs to have a valid token endpoint url. Value: bananas'
      );
    });

    test('connect endpoint should be valid URL', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.api!.connect = 'bananas';

      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Manifest Api section needs to have a valid connect endpoint url. Value: bananas'
      );
    });
  });

  describe('host', () => {
    test('host has to be defined', () => {
      const manifest = JSON.parse(JSON.stringify(validManifest));
      delete manifest.host;
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe('Host section is missing.');
    });

    test('host.url - only url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.url = 'bananas';
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe('Host url is invalid. Value: bananas');
    });

    test('host.url - tokenized url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.url = 'https://tokenizedurl.com/{opp.id}?uid={usr.id}';
      var issues = validate(manifest);
      expect(issues.length).toBe(0);
    });

    test('host.icon - only url should be acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.host.icon = 'bananas';
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Host icon definition is invalid url. Value: bananas'
      );
    });

    test('only valid type should be acceptable', () => {
      const manifest: Manifest = JSON.parse(
        JSON.stringify(invalidHostTypeManifest)
      );
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe('Host type  is invalid. Value: BANANAS');
    });
  });

  describe('categories', () => {
    test('no categories section is not acceptable', () => {
      const manifest: any = JSON.parse(JSON.stringify(validManifest));
      delete manifest.categories;
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe('Categories section is missing');
    });
    test('empty categories section is not acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      manifest.categories = [];
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'There are no categories selected for addon. Value: '
      );
    });
  });

  describe('context', () => {
    test('only valid contexts should be acceptable', () => {
      const manifest: Manifest = JSON.parse(
        JSON.stringify(invalidContextManifest)
      );
      var issues = validate(manifest);
      expect(issues.length).toBe(2);
      expect(issues[0]).toBe(
        'Context key is not one of the valid values. Key: bananas'
      );
      expect(issues[1]).toBe(
        'Context key is not one of the valid values. Key: apples'
      );
    });
  });

  describe('medias', () => {
    test('no medias section is acceptable', () => {
      const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
      delete manifest.medias;
      var issues = validate(manifest);
      expect(issues.length).toBe(0);
    });

    test('no medias section is acceptable', () => {
      const manifest: any = JSON.parse(JSON.stringify(validManifest));
      manifest.medias = 'invalid-media-value';
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe(
        'Medias section value is not a valid array. Value: invalid-media-value'
      );
    });

    describe('Invalid media file info is not acceptable', () => {
      test('No uri', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            index: 0,
            title: 'Some title',
            type: 'image',
          } as any,
        ];
        var issues = validate(manifest);
        expect(issues.length).toBe(1);
        expect(issues[0]).toBe('Uri value is missing');
      });

      test('Uri not a valid url', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            index: 0,
            title: 'Some title',
            type: 'image',
            uri: 'not-a-valid-url',
          },
        ];
        var issues = validate(manifest);
        expect(issues.length).toBe(1);
        expect(issues[0]).toBe(
          'Uri value is not a valid url. Value: not-a-valid-url'
        );
      });

      test('No index', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            title: 'Some title',
            type: 'image',
            uri: 'https://www.site.com/image.png',
          } as any,
        ];
        var issues = validate(manifest);

        expect(issues.length).toBe(1);
        expect(issues[0]).toBe('Index value is missing');
      });
      test('Index is not a number', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            index: 'not-a-number',
            title: 'Some title',
            type: 'image',
            uri: 'https://www.site.com/image.png',
          } as any,
        ];
        var issues = validate(manifest);

        expect(issues.length).toBe(1);
        expect(issues[0]).toBe(
          'Index value is not a number. Value: not-a-number'
        );
      });
      test('Index is duplicated', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            index: 0,
            title: 'Some title',
            type: 'image',
            uri: 'https://www.site.com/image.png',
          },
          {
            index: 0,
            title: 'Some title',
            type: 'image',
            uri: 'https://www.site.com/image.png',
          },
        ];
        var issues = validate(manifest);

        expect(issues.length).toBe(1);
        expect(issues[0]).toBe('Index value: 0 is not unique');
      });

      test('Title is missing', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            index: 0,
            type: 'image',
            uri: 'https://www.site.com/image.png',
          } as any,
        ];
        var issues = validate(manifest);

        expect(issues.length).toBe(1);
        expect(issues[0]).toBe('Title value is missing');
      });

      test('Type is missing', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            index: 0,
            title: 'Some title',
            uri: 'https://www.site.com/image.png',
          } as any,
        ];
        var issues = validate(manifest);

        expect(issues.length).toBe(1);
        expect(issues[0]).toBe('Type value is missing');
      });

      test('Type is invalid', () => {
        const manifest: Manifest = JSON.parse(JSON.stringify(validManifest));
        manifest.medias = [
          {
            index: 0,
            title: 'Some title',
            type: 'invalid-type',
            uri: 'https://www.site.com/image.png',
          } as any,
        ];
        var issues = validate(manifest);

        expect(issues.length).toBe(1);
        expect(issues[0]).toBe('Type value is invalid. Value: invalid-type');
      });
    });
  });

  describe('store', () => {
    test('only valid store type hould be acceptable', () => {
      const manifest = JSON.parse(JSON.stringify(invalidStoreTypeManifest));
      var issues = validate(manifest);
      expect(issues.length).toBe(1);
      expect(issues[0]).toBe('Store value is invalid. Value:BANANAS');
    });
  });

  describe('urlValidation', () => {
    test('url with no trailing / is valid', () => {
      expect(urlValidation('https://somedomain.com')).toBe(true);
    });
  });
});

const validManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/',
  },
  categories: [AddonCategory.ACCOUNT_BASED_MARKETING],
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)',
  },
  title: {
    en: 'Some title (en)',
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host',
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    applicationId: 'AbCd123456qW',
    redirectUri: 'https://addon-host.com/hello-world',
    token: 'https://someurl.com/token',
    connect: 'https://someurl.com/connect',
  },
} as Manifest;

const invalidContextManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/',
  },
  categories: [AddonCategory.ACCOUNT_BASED_MARKETING],
  context: ['bananas', OpportunityContextKeys.ID, 'apples'],
  description: {
    en: 'Some description (en)',
  },
  title: {
    en: 'Some title (en)',
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host',
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token',
    applicationId: 'AbCd123456qW',
    redirectUri: 'https://addon-host.com/hello-world',
    connect: 'https://someurl.com/connect',
  },
} as Manifest;

const invalidHostTypeManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/',
  },
  categories: [AddonCategory.ACCOUNT_BASED_MARKETING],
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)',
  },
  title: {
    en: 'Some title (en)',
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: 'BANANAS',
    url: 'http://someurl.com/host',
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token',
    applicationId: 'AbCd123456qW',
    redirectUri: 'https://addon-host.com/hello-world',
    connect: 'https://someurl.com/connect',
  },
};

const invalidStoreTypeManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/',
  },
  categories: [AddonCategory.ACCOUNT_BASED_MARKETING],
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)',
  },
  title: {
    en: 'Some title (en)',
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host',
  },
  identifier: 'addon-identifier',
  store: 'BANANAS',
  version: '0.10',
  api: {
    scopes: [Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token',
    applicationId: 'AbCd123456qW',
    redirectUri: 'https://addon-host.com/hello-world',
    connect: 'https://someurl.com/connect',
  },
};

const invalidScopeTypeManifest = {
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/',
  },
  categories: [AddonCategory.ACCOUNT_BASED_MARKETING],
  context: [UserContextKeys.ID, OpportunityContextKeys.ID],
  description: {
    en: 'Some description (en)',
  },
  title: {
    en: 'Some title (en)',
  },
  host: {
    icon: 'http://someurl.com/favicon.png',
    type: AddonType.OpportunityTab,
    url: 'http://someurl.com/host',
  },
  identifier: 'addon-identifier',
  store: AddonStore.Personal,
  version: '0.10',
  api: {
    scopes: ['BANANA', Scopes.ACCOUNTS_ALL, Scopes.CALLS_ALL],
    token: 'https://someurl.com/token',
    applicationId: 'AbCd123456qW',
    redirectUri: 'https://addon-host.com/hello-world',
    connect: 'https://someurl.com/connect',
  },
} as Manifest;
