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

class Validator {
  /**
   * Validates given manifest if it contains all of the required fields with correct values.
   *
   * @memberof Validator
   */
  public validate = (manifest: Manifest): string[] => {
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
      if (!this.urlValidation(manifest.api.token)) {
        issues.push('Api token endpoint is invalid url. Value: ' + manifest.api.token);
      }

      if (!manifest.api.applicationId) {
        issues.push('Manifest Api section needs to have applicationId value.');
      }

      if (!this.urlValidation(manifest.api.redirectUri)) {
        issues.push('Manifest Api section needs to have a valid redirect url. Value: ' + manifest.api.redirectUri);
      }
    }

    if (!manifest.author) {
      issues.push('Author section is missing');
    } else {
      if (!this.urlValidation(manifest.author.websiteUrl)) {
        issues.push(
          'Author website url is invalid url. Value: ' + manifest.author.websiteUrl
        );
      }
      if (!this.urlValidation(manifest.author.privacyUrl)) {
        issues.push(
          'Author privacy url is invalid url. Value: ' + manifest.author.privacyUrl
        );
      }
      if (!this.urlValidation(manifest.author.termsOfUseUrl)) {
        issues.push(
          'Author terms of use url is invalid url. Value: ' +
            manifest.author.termsOfUseUrl
        );
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
      if (!this.urlValidation(manifest.host.icon)) {
        issues.push('Host icon definition is invalid url. Value: ' + manifest.host.icon);
      }

      if (!this.hostUrlValidation(manifest)) {
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
      issues.push('Store value is invalid. Value:' + manifest.host.type);
    }

    if (!manifest.version) {
      issues.push('Manifest Version definition is missing.');
    }

    return issues;
  };

  private hostUrlValidation = (manifest: Manifest): boolean => {
    const hostUrl = manifest.host.url;
    if (!hostUrl) {
      return false;
    }

    const contextParams: ContextParam[] = [];
    manifest.context.forEach((key) => contextParams.push({ key, value: 'marker' }));

    try {
      const { url } = utils.tokenizeUrl(hostUrl, contextParams);
      const validatedUrl = new URL(url);
      return validatedUrl.toString() === url;
    } catch (e) {
      return false;
    }
  };

  private urlValidation = (url: string): boolean => {
    if (!url) {
      return false;
    }

    try {
      const validatedUrl = new URL(url);
      return validatedUrl.toString() === url;
    } catch (e) {
      return false;
    }
  };
}

export default new Validator();
