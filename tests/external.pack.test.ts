import { ExternalInfoContext, ExternalInfoProvider } from '../src';
import { ExternalInfoUtils } from '../src/context/ExternalInfoUtils';

describe('ExternalInfoProviders tests', () => {
  test('pack/unpack works fine', () => {
    const now = new Date();
    const externalContexts: ExternalInfoContext[] = [
      {
        enabled: true,
        id: '123',
        name: null,
        provider: ExternalInfoProvider.SALESFORCE,
        type: 'Lead',
        lastInbound: now,
        lastOutbound: null,
      },
      {
        enabled: false,
        id: '456',
        name: 'name',
        provider: ExternalInfoProvider.SALESFORCE_SANDBOX,
        type: 'Test',
        lastInbound: null,
        lastOutbound: now,
      },
    ];

    const packedContext = ExternalInfoUtils.pack(externalContexts);
    const unpackedContext = ExternalInfoUtils.unpack(packedContext);

    expect(externalContexts).toStrictEqual(unpackedContext);
  });
});
