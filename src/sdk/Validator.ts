import { ContextParam } from '../context/ContextParam';
import { AddonStore } from '../store/AddonStore';
import { AddonType } from '../store/AddonType';
import { ClientContextKeys } from '../store/keys/ClientContextKeys';
import { OpportunityContextKeys } from '../store/keys/OpportunityContextKeys';
import { ProspectContextKeys } from '../store/keys/ProspectContextKeys';
import { UserContextKeys } from '../store/keys/UserContextKeys';
import { Manifest } from '../store/Manifest';
import { Scopes } from '../store/Scopes';
import { utils } from '../utils';
import { AccountContextKeys } from '../store/keys/AccountContextKeys';

/**
 * Validates given manifest if it contains all of the required fields with correct values.
 *
 * @param {Manifest} manifest
 * @returns {string[]} list of validation issues (if any)
 */
export const validate = (manifest: Manifest): string[] => {
  const issues: string[] = [];
  if (manifest.api) {
    if (!manifest.api.scopes) {
      issues.push('Undefined api scopes');
    } else if (!Array.isArray(manifest.api.scopes)) {
      issues.push(
        'Api scopes value is not an array. Value: ' + manifest.api.scopes
      );
    } else {
      manifest.api.scopes.forEach((scope) => {
        if (!Object.values(Scopes).includes(scope as Scopes)) {
          issues.push('Invalid api scope value. Value: ' + scope);
        }
      });
    }
    if (!urlValidation(manifest.api.token)) {
      issues.push(
        'Manifest Api section needs to have a valid token endpoint url. Value: ' +
          manifest.api.token
      );
    }

    if (!manifest.api.applicationId) {
      issues.push('Manifest Api section needs to have applicationId value.');
    }

    if (!urlValidation(manifest.api.redirectUri)) {
      issues.push(
        'Manifest Api section needs to have a valid redirect url. Value: ' +
          manifest.api.redirectUri
      );
    }

    if (!urlValidation(manifest.api.connect)) {
      issues.push(
        'Manifest Api section needs to have a valid connect endpoint url. Value: ' +
          manifest.api.connect
      );
    }
  }

  if (!manifest.author) {
    issues.push('Author section is missing');
  } else {
    if (!urlValidation(manifest.author.websiteUrl)) {
      issues.push(
        'Author website url is invalid url. Value: ' +
          manifest.author.websiteUrl
      );
    }
    if (!urlValidation(manifest.author.privacyUrl)) {
      issues.push(
        'Author privacy url is invalid url. Value: ' +
          manifest.author.privacyUrl
      );
    }
    if (!urlValidation(manifest.author.termsOfUseUrl)) {
      issues.push(
        'Author terms of use url is invalid url. Value: ' +
          manifest.author.termsOfUseUrl
      );
    }
  }

  if (!manifest.categories) {
    issues.push('Categories section is missing');
  } else {
    if (!Array.isArray(manifest.categories)) {
      issues.push('Categories is not an array. Value: ' + manifest.categories);
    } else {
      if (manifest.categories.length === 0) {
        issues.push(
          'There are no categories selected for addon. Value: ' +
            manifest.categories
        );
      }
    }
  }

  if (manifest.medias) {
    if (!Array.isArray(manifest.medias)) {
      issues.push(
        'Medias section value is not a valid array. Value: ' + manifest.medias
      );
    } else {
      const indexes: number[] = [];

      manifest.medias.forEach((media) => {
        if (!media.uri) {
          issues.push('Uri value is missing');
        } else {
          const validUrl = urlValidation(media.uri);
          if (!validUrl) {
            issues.push('Uri value is not a valid url. Value: ' + media.uri);
          }
        }

        if (!media.title) {
          issues.push('Title value is missing');
        }
        if (!media.type) {
          issues.push('Type value is missing');
        } else {
          if (media.type !== 'image' && media.type !== 'video') {
            issues.push('Type value is invalid. Value: ' + media.type);
          }
        }

        if (media.index === undefined) {
          issues.push('Index value is missing');
        } else {
          if (isNaN(parseInt(media.index.toString()))) {
            issues.push('Index value is not a number. Value: ' + media.index);
          }

          const existingIndex = indexes.findIndex((i) => i === media.index);
          if (existingIndex > -1) {
            issues.push('Index value: ' + media.index + ' is not unique');
          }

          indexes.push(media.index);
        }
      });
    }
  }

  if (!manifest.context) {
    issues.push('Context section is missing');
  } else {
    if (!Array.isArray(manifest.context)) {
      issues.push(
        'Context section is not an array. Value: ' + manifest.context
      );
    } else {
      manifest.context.forEach((context) => {
        if (
          !Object.values(UserContextKeys).includes(
            context as UserContextKeys
          ) &&
          !Object.values(ClientContextKeys).includes(
            context as ClientContextKeys
          ) &&
          !Object.values(OpportunityContextKeys).includes(
            context as OpportunityContextKeys
          ) &&
          !Object.values(ProspectContextKeys).includes(
            context as ProspectContextKeys
          ) &&
          !Object.values(AccountContextKeys).includes(
            context as AccountContextKeys
          )
        ) {
          issues.push(
            'Context key is not one of the valid values. Key: ' + context
          );
        }
      });
    }
  }

  if (!manifest.description) {
    issues.push('Description section is missing.');
  } else {
    if (!manifest.description.en) {
      issues.push('Description section is missing English entry.');
    }
  }

  if (!manifest.host) {
    issues.push('Host section is missing.');
  } else {
    if (!urlValidation(manifest.host.icon)) {
      issues.push(
        'Host icon definition is invalid url. Value: ' + manifest.host.icon
      );
    }

    if (!hostUrlValidation(manifest)) {
      issues.push('Host url is invalid. Value: ' + manifest.host.url);
    }

    if (
      !manifest.host.type ||
      !Object.values(AddonType).includes(manifest.host.type as AddonType)
    ) {
      issues.push('Host type  is invalid. Value: ' + manifest.host.type);
    }
  }

  if (!manifest.identifier) {
    issues.push('Manifest identifier definition is missing.');
  }

  if (!manifest.title) {
    issues.push('Title section is missing.');
  } else {
    if (!manifest.title.en) {
      issues.push('Title section is missing English entry.');
    }
  }

  if (
    !manifest.store ||
    !Object.values(AddonStore).includes(manifest.store as AddonStore)
  ) {
    issues.push('Store value is invalid. Value:' + manifest.store);
  }

  if (!manifest.version) {
    issues.push('Manifest Version definition is missing.');
  }

  return issues;
};

const hostUrlValidation = (manifest: Manifest): boolean => {
  const hostUrl = manifest.host.url;
  if (!hostUrl) {
    return false;
  }

  const contextParams: ContextParam[] = [];
  manifest.context.forEach((key) =>
    contextParams.push({ key, value: 'marker' })
  );

  try {
    const { url } = utils.tokenizeUrl(hostUrl, contextParams);
    const validatedUrl = new URL(url);
    return validatedUrl.toString() === url;
  } catch (e) {
    return false;
  }
};

export const urlValidation = (url: string): boolean => {
  if (!url) {
    return false;
  }

  try {
    const validatedUrl = new URL(url).toString();
    if (validatedUrl === url) {
      return true;
    }

    if (validatedUrl.endsWith('/')) {
      const trimmedUrl = validatedUrl.substring(0, validatedUrl.length - 1);
      if (trimmedUrl === url) {
        return true;
      }
    }

    return false;
  } catch (e) {
    return false;
  }
};
