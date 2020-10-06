import { AddonStore } from '../src/store/AddonStore';
import { AddonType } from '../src/store/AddonType';
import { AllContextKeys } from '../src/store/keys/AllContextKeys';
import { OpportunityContextKeys } from '../src/store/keys/OpportunityContextKeys';
import { UserContextKeys } from '../src/store/keys/UserContextKeys';
import { Manifest } from '../src/store/Manifest';
import { Scopes } from '../src/store/Scopes';

describe('manifest tests', () => {
  describe('author', () => {
    const manifest: Manifest = Object.apply(new Manifest(), validManifest);

    test('privacyUrl should be url', () => {
      manifest.author.privacyUrl = 'bananas';
      expect(manifest.validate()).toBe(false);
    });

    test('termsOfUseUrl should be url', () => {
      manifest.author.termsOfUseUrl = 'bananas';
      expect(manifest.validate()).toBe(false);
    });

    test('websiteUrl should be url', () => {
      manifest.author.websiteUrl = 'bananas';
      expect(manifest.validate()).toBe(false);
    });
  });

  describe('context', () => {
    test('only valid context keys should be acceptable', () => {
      expect(invalidContextManifest.validate()).toBe(false);
    });
  });
  describe('host', () => {


    test('host has to be defined', () => {
      const manifest: Manifest = Object.apply(new Manifest(), validManifest);
      delete manifest.host;
      expect(invalidContextManifest.validate()).toBe(false);
    });

    describe('icon', () => {
      const manifest: Manifest = Object.apply(new Manifest(), validManifest);

      test('only url should be acceptable', () => {
        manifest.host.icon = 'bananas';
        expect(invalidContextManifest.validate()).toBe(false);
      });
    });

    describe('icon', () => {
      const manifest: Manifest = Object.apply(new Manifest(), validManifest);

      test('only url should be acceptable', () => {
        manifest.host.icon = 'bananas';
        expect(invalidContextManifest.validate()).toBe(false);
      });j
    });

    describe('icon', () => {
      const manifest: Manifest = Object.apply(new Manifest(), validManifest);

      test('only url should be acceptable', () => {
        manifest.host.icon = 'bananas';
        expect(invalidContextManifest.validate()).toBe(false);
      });
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
