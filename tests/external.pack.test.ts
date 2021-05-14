import { ExternalProspectContext, ExternalProspectProvider } from '../src';
import { ExternalProspectUtils } from '../src/context/ExternalProspectUtils';

describe('ExternalProspectProviders tests', () => {
  test('pack/unpack works fine', () => {
    const now = new Date();
    const externalContexts: ExternalProspectContext[] = [
      {
        enabled: true,
        id: '123',
        name: null,
        provider: ExternalProspectProvider.SALESFORCE,
        type: 'Lead',
        lastInbound: now,
        lastOutbound: null,
      },
      {
        enabled: false,
        id: '456',
        name: 'name',
        provider: ExternalProspectProvider.SALESFORCE_SANDBOX,
        type: 'Test',
        lastInbound: null,
        lastOutbound: now,
      },
    ];

    const packedContext = ExternalProspectUtils.pack(externalContexts);
    const unpackedContext = ExternalProspectUtils.unpack(packedContext);

    expect(externalContexts).toStrictEqual(unpackedContext);
  });
});