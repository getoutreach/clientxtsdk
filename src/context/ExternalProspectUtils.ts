import { ExternalProspectContext } from './ExternalProspectContext';
import { ExternalProspectProvider } from './ExternalProspectProvider';

export interface PackedProvider {
  e: boolean;
  i: string;
  n?: string | null;
  p: ExternalProspectProvider;
  t: string;
  li?: Date | null;
  lo?: Date | null;
}

export class ExternalProspectUtils {
  /**
   * Packs the contextual provider information to a shorter format
   * which is more suitable for url usage.
   *
   * @static
   * @param {ExternalProspectContext[]} contexts
   * @returns {string}
   * @memberof ExternalProspectUtils
   */
  public static pack = (contexts: ExternalProspectContext[]): string => {
    const packedProviders: PackedProvider[] = [];
    contexts.forEach((context) => {
      packedProviders.push({
        e: context.enabled,
        i: context.id,
        n: context.name,
        p: context.provider,
        t: context.type,
        li: context.lastInbound,
        lo: context.lastOutbound,
      });
    });

    return JSON.stringify(packedProviders);
  };

  /**
   * Unpacks the packed format of the external prospect information
   *
   * @memberof ExternalProspectContexts
   */
  public static unpack = (packed: string): ExternalProspectContext[] => {
    const providers: ExternalProspectContext[] = [];
    try {
      const packedProviders = JSON.parse(packed) as PackedProvider[];
      packedProviders.forEach((pp) => {
        providers.push({
          enabled: pp.e,
          id: pp.i,
          lastInbound: pp.li ? new Date(pp.li) : null,
          lastOutbound: pp.lo ? new Date(pp.lo) : null,
          name: pp.n,
          provider: pp.p,
          type: pp.t,
        } as ExternalProspectContext);
      });
    } catch (err) {
      console.error("Can't unpack the provider info", { err, packed });
    }

    return providers;
  };
}
