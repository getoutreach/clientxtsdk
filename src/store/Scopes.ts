/* eslint-disable no-unused-vars */

export enum Scopes {
    AUDITS_ALL = 'audits.all',
    AUDITS_READ = 'audits.read',

    ACCOUNTS_ALL = 'accounts.all',
    ACCOUNTS_READ = 'accounts.read',
    ACCOUNTS_WRITE = 'accounts.write',
    ACCOUNTS_DELETE = 'accounts.delete',

    CALL_DISPOSITIONS_ALL = 'callDispositions.all',
    CALL_DISPOSITIONS_READ = 'callDispositions.read',
    CALL_DISPOSITIONS_WRITE = 'callDispositions.write',
    CALL_DISPOSITIONS_DELETE= 'callDispositions.delete',

    CALL_PURPOSES_ALL = 'callPurposes.all',
    CALL_PURPOSES_READ = 'callPurposes.read',
    CALL_PURPOSES_WRITE = 'callPurposes.write',
    CALL_PURPOSES_DELETE = 'callPurposes.delete',

    CALLS_ALL = 'calls.all',
    CALLS_READ = 'calls.read',
    CALLS_WRITE = 'calls.write',
    CALLS_DELETE = 'calls.delete',

    CUSTOM_DUTIES_ALL = 'customDuties.all',
    CUSTOM_DUTIES_READ = 'customDuties.read',
    CUSTOM_DUTIES_WRITE = 'customDuties.write',
    CUSTOM_DUTIES_DELETE = 'customDuties.delete',

    CONTENT_CATEGORIES_ALL = 'contentCategories.all',
    CONTENT_CATEGORIES_READ = 'contentCategories.read',
    CONTENT_CATEGORIES_WRITE = 'contentCategories.write',
    CONTENT_CATEGORIES_DELETE = 'contentCategories.delete',

    CONTENT_CATEGORY_MEMBERSHIPS_ALL = 'contentCategoryMemberships.all',
    CONTENT_CATEGORY_MEMBERSHIPS_READ = 'contentCategoryMemberships.read',
    CONTENT_CATEGORY_MEMBERSHIPS_WRITE = 'contentCategoryMemberships.write',
    CONTENT_CATEGORY_MEMBERSHIPS_DELETE = 'contentCategoryMemberships.delete',

    DUTIES_ALL = 'duties.all',
    DUTIES_READ = 'duties.read',
    DUTIES_WRITE = 'duties.write',
    DUTIES_DELETE = 'duties.delete',

    EMAIL_ADDRESSES_ALL = 'emailAddresses.all',
    EMAIL_ADDRESSES_READ = 'emailAddresses.read',
    EMAIL_ADDRESSES_WRITE = 'emailAddresses.write',
    EMAIL_ADDRESSES_DELETE = 'emailAddresses.delete',

    EVENTS_ALL = 'events.all',
    EVENTS_READ = 'events.read',
    EVENTS_WRITE = 'events.write',
    EVENTS_DELETE = 'events.delete',

    FAVORITES_ALL = 'favorites.all',
    FAVORITES_READ = 'favorites.read',
    FAVORITES_WRITE = 'favorites.write',
    FAVORITES_DELETE = 'favorites.delete',

    MAIL_ALIASES_ALL = 'mailAliases.all',
    MAIL_ALIASES_READ = 'mailAliases.read',

    MAILBOXES_ALL = 'mailboxes.all',
    MAILBOXES_READ = 'mailboxes.read',
    MAILBOXES_WRITE = 'mailboxes.write',
    MAILBOXES_DELETE = 'mailboxes.delete',

    MAILINGS_READ = 'mailings.read',
    MAILINGS_WRITE = 'mailings.write',
    MAILINGS_DELETE = 'mailings.delete',

    OPPORTUNITIES_ALL = 'opportunities.all',
    OPPORTUNITIES_READ = 'opportunities.read',
    OPPORTUNITIES_WRITE = 'opportunities.write',
    OPPORTUNITIES_DELETE = 'opportunities.delete',

    OPPORTUNITY_PROSPECT_ROLES_ALL = 'opportunityProspectRoles.all',
    OPPORTUNITY_PROSPECT_ROLES_READ = 'opportunityProspectRoles.read',
    OPPORTUNITY_PROSPECT_ROLES_WRITE = 'opportunityProspectRoles.write',
    OPPORTUNITY_PROSPECT_ROLES_DELETE = 'opportunityProspectRoles.delete',

    OPPORTUNITY_STAGES_ALL = 'opportunityStages.all',
    OPPORTUNITY_STAGES_READ = 'opportunityStages.read',
    OPPORTUNITY_STAGES_WRITE = 'opportunityStages.write',
    OPPORTUNITY_STAGES_DELETE = 'opportunityStages.delete',

    PERSONAS_ALL = 'personas.all',
    PERSONAS_READ = 'personas.read',
    PERSONAS_WRITE = 'personas.write',
    PERSONAS_DELETE = 'personas.delete',

    PHONE_NUMBERS_ALL = 'phoneNumbers.all',
    PHONE_NUMBERS_READ = 'phoneNumbers.read',
    PHONE_NUMBERS_WRITE = 'phoneNumbers.write',
    PHONE_NUMBERS_DELETE = 'phoneNumbers.delete',

    PROFILES_ALL = 'profiles.all',
    PROFILES_READ = 'profiles.read',
    PROFILES_WRITE = 'profiles.write',
    PROFILES_DELETE = 'profiles.delete',

    PROSPECTS_ALL = 'prospects.all',
    PROSPECTS_READ = 'prospects.read',
    PROSPECTS_WRITE = 'prospects.write',
    PROSPECTS_DELETE = 'prospects.delete',

    ROLES_ALL = 'roles.all',
    ROLES_READ = 'roles.read',
    ROLES_WRITE = 'roles.write',
    ROLES_DELETE = 'roles.delete',

    RULESETS_ALL = 'rulesets.all',
    RULESETS_READ = 'rulesets.read',
    RULESETS_WRITE = 'rulesets.write',
    RULESETS_DELETE = 'rulesets.delete',

    SEQUENCE_STATES_ALL = 'sequenceStates.all',
    SEQUENCE_STATES_READ = 'sequenceStates.read',
    SEQUENCE_STATES_WRITE = 'sequenceStates.write',
    SEQUENCE_STATES_DELETE = 'sequenceStates.delete',

    SEQUENCE_STEPS_ALL = 'sequenceSteps.all',
    SEQUENCE_STEPS_READ = 'sequenceSteps.read',
    SEQUENCE_STEPS_WRITE = 'sequenceSteps.write',
    SEQUENCE_STEPS_DELETE = 'sequenceSteps.delete',

    SEQUENCE_TEMPLATES_ALL = 'sequenceTemplates.all',
    SEQUENCE_TEMPLATES_READ = 'sequenceTemplates.read',
    SEQUENCE_TEMPLATES_WRITE = 'sequenceTemplates.write',
    SEQUENCE_TEMPLATES_DELETE = 'sequenceTemplates.delete',

    SEQUENCES_ALL = 'sequences.all',
    SEQUENCES_READ = 'sequences.read',
    SEQUENCES_WRITE = 'sequences.write',
    SEQUENCES_DELETE = 'sequences.delete',

    SNIPPETS_ALL = 'snippets.all',
    SNIPPETS_READ = 'snippets.read',
    SNIPPETS_WRITE = 'snippets.write',
    SNIPPETS_DELETE = 'snippets.delete',

    STAGES_ALL = 'stages.all',
    STAGES_READ = 'stages.read',
    STAGES_WRITE = 'stages.write',
    STAGES_DELETE = 'stages.delete',

    TASK_PRIORITIES_ALL = 'taskPriorities.all',
    TASK_PRIORITIES_READ = 'taskPriorities.read',
    TASK_PRIORITIES_WRITE = 'taskPriorities.write',
    TASK_PRIORITIES_DELETE = 'taskPriorities.delete',

    TASKS_ALL = 'tasks.all',
    TASKS_READ = 'tasks.read',
    TASKS_WRITE = 'tasks.write',
    TASKS_DELETE = 'tasks.delete',

    TEAMS_ALL = 'teams.all',
    TEAMS_READ = 'teams.read',
    TEAMS_WRITE = 'teams.write',
    TEAMS_DELETE = 'teams.delete',

    TEMPLATES_ALL = 'templates.all',
    TEMPLATES_READ = 'templates.read',
    TEMPLATES_WRITE = 'templates.write',
    TEMPLATES_DELETE = 'templates.delete',

    USERS_ALL = 'users.all',
    USERS_READ = 'users.read',
    USERS_WRITE = 'users.write',
    USERS_DELETE = 'users.delete',

    WEBHOOKS_ALL = 'webhooks.all',
    WEBHOOKS_READ = 'webhooks.read',
    WEBHOOKS_WRITE = 'webhooks.write',
    WEBHOOKS_DELETE = 'webhooks.delete'
}
