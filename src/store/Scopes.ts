/* eslint-disable no-unused-vars */
export declare type AllScopes = AuditScopes | AccountsScopes | CallDispositions |
                                CallPurposes | Calls | CustomDuties | ContentCategories |
                                ContentCategoryMemberships | Duties | EmailAddresses |
                                Events | Favorites | MailAliases | Mailboxes | Mailings |
                                Opportunities | OpportunityProspectRoles | OpportunityStages |
                                Personas | PhoneNumbers | Profiles | Profiles | Prospects |
                                Roles | Rulesets | SequenceStates | SequenceSteps | SequenceTemplates |
                                SequencesTemplates | SnippetsTemplates | StagesTemplates | TaskPriorities |
                                Tasks | Teams | Templates | Users | Webhooks;

export enum AuditScopes {
    All = 'audits.all',
    Read = 'audits.read'
};

export enum AccountsScopes {
    All = 'accounts.all',
    Read = 'accounts.read',
    Write = 'accounts.write',
    Delete = 'accounts.delete'
};

export enum CallDispositions {
    All = 'callDispositions.all',
    Read = 'callDispositions.read',
    Write = 'callDispositions.write',
    Delete = 'callDispositions.delete'
}

export enum CallPurposes {
    All = 'callPurposes.all',
    Read = 'callPurposes.read',
    Write = 'callPurposes.write',
    Delete = 'callPurposes.delete'
}

export enum Calls {
    All = 'calls.all',
    Read = 'calls.read',
    Write = 'calls.write',
    Delete = 'calls.delete'
}

export enum CustomDuties {
    All = 'customDuties.all',
    Read = 'customDuties.read',
    Write = 'customDuties.write',
    Delete = 'customDuties.delete'
}

export enum ContentCategories {
    All = 'contentCategories.all',
    Read = 'contentCategories.read',
    Write = 'contentCategories.write',
    Delete = 'contentCategories.delete'
}

export enum ContentCategoryMemberships {
    All = 'contentCategoryMemberships.all',
    Read = 'contentCategoryMemberships.read',
    Write = 'contentCategoryMemberships.write',
    Delete = 'contentCategoryMemberships.delete'
}

export enum Duties {
    All = 'duties.all',
    Read = 'duties.read',
    Write = 'duties.write',
    Delete = 'duties.delete'
}

export enum EmailAddresses {
    All = 'emailAddresses.all',
    Read = 'emailAddresses.read',
    Write = 'emailAddresses.write',
    Delete = 'emailAddresses.delete'
}

export enum Events {
    All = 'events.all',
    Read = 'events.read',
    Write = 'events.write',
    Delete = 'events.delete'
}

export enum Favorites {
    All = 'favorites.all',
    Read = 'favorites.read',
    Write = 'favorites.write',
    Delete = 'favorites.delete'
}

export enum MailAliases {
    All = 'mailAliases.all',
    Read = 'mailAliases.read',
}

export enum Mailboxes {
    All = 'mailboxes.all',
    Read = 'mailboxes.read',
    Write = 'mailboxes.write',
    Delete = 'mailboxes.delete'
}

export enum Mailings {
    Read = 'mailings.read',
    Write = 'mailings.write',
    Delete = 'mailings.delete'
}

export enum Opportunities {
    All = 'mailboxes.all',
    Read = 'mailboxes.read',
    Write = 'mailboxes.write',
    Delete = 'mailboxes.delete'
}

export enum OpportunityProspectRoles {
    All = 'opportunityProspectRoles.all',
    Read = 'opportunityProspectRoles.read',
    Write = 'opportunityProspectRoles.write',
    Delete = 'opportunityProspectRoles.delete'
}

export enum OpportunityStages {
    All = 'opportunityStages.all',
    Read = 'opportunityStages.read',
    Write = 'opportunityStages.write',
    Delete = 'opportunityStages.delete'
}

export enum Personas {
    All = 'personas.all',
    Read = 'personas.read',
    Write = 'personas.write',
    Delete = 'personas.delete'
}

export enum PhoneNumbers {
    All = 'phoneNumbers.all',
    Read = 'phoneNumbers.read',
    Write = 'phoneNumbers.write',
    Delete = 'phoneNumbers.delete'
}

export enum Profiles {
    All = 'profiles.all',
    Read = 'profiles.read',
    Write = 'profiles.write',
    Delete = 'profiles.delete'
}

export enum Prospects {
    All = 'prospects.all',
    Read = 'prospects.read',
    Write = 'prospects.write',
    Delete = 'prospects.delete'
}

export enum Roles {
    All = 'roles.all',
    Read = 'roles.read',
    Write = 'roles.write',
    Delete = 'roles.delete'
}

export enum Rulesets {
    All = 'rulesets.all',
    Read = 'rulesets.read',
    Write = 'rulesets.write',
    Delete = 'rulesets.delete'
}

export enum SequenceStates {
    All = 'sequenceStates.all',
    Read = 'sequenceStates.read',
    Write = 'sequenceStates.write',
    Delete = 'sequenceStates.delete'
}

export enum SequenceSteps {
    All = 'sequenceSteps.all',
    Read = 'sequenceSteps.read',
    Write = 'sequenceSteps.write',
    Delete = 'sequenceSteps.delete'
}

export enum SequenceTemplates {
    All = 'sequenceTemplates.all',
    Read = 'sequenceTemplates.read',
    Write = 'sequenceTemplates.write',
    Delete = 'sequenceTemplates.delete'
}

export enum SequencesTemplates {
    All = 'sequences.all',
    Read = 'sequences.read',
    Write = 'sequences.write',
    Delete = 'sequences.delete'
}

export enum SnippetsTemplates {
    All = 'snippets.all',
    Read = 'snippets.read',
    Write = 'snippets.write',
    Delete = 'snippets.delete'
}

export enum StagesTemplates {
    All = 'stages.all',
    Read = 'stages.read',
    Write = 'stages.write',
    Delete = 'stages.delete'
}

export enum TaskPriorities {
    All = 'taskPriorities.all',
    Read = 'taskPriorities.read',
    Write = 'taskPriorities.write',
    Delete = 'taskPriorities.delete'
}

export enum Tasks {
    All = 'tasks.all',
    Read = 'tasks.read',
    Write = 'tasks.write',
    Delete = 'tasks.delete'
}

export enum Teams {
    All = 'teams.all',
    Read = 'teams.read',
    Write = 'teams.write',
    Delete = 'teams.delete'
}

export enum Templates {
    All = 'templates.all',
    Read = 'templates.read',
    Write = 'templates.write',
    Delete = 'templates.delete'
}

export enum Users {
    All = 'users.all',
    Read = 'users.read',
    Write = 'users.write',
    Delete = 'users.delete'
}

export enum Webhooks {
    All = 'webhooks.all',
    Read = 'webhooks.read',
    Write = 'webhooks.write',
    Delete = 'webhooks.delete'
}
