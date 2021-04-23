/* eslint-disable no-unused-vars */
import { UserContextKeys } from './UserContextKeys';
import { AccountContextKeys } from './AccountContextKeys';
import { OpportunityContextKeys } from './OpportunityContextKeys';
import { ClientContextKeys } from './ClientContextKeys';
import { ProspectContextKeys } from './ProspectContextKeys';

export type AllContextKeys =
  | UserContextKeys
  | AccountContextKeys
  | OpportunityContextKeys
  | ClientContextKeys
  | ProspectContextKeys;
