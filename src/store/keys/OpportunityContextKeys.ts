/* eslint-disable no-unused-vars */

/**
 * An opportunity for a sale or pending deal.
 *
 * @see https://api.outreach.io/api/v2/docs#opportunity
 * @export
 * @enum {number}
 */
export enum OpportunityContextKeys {
  /**
   * The amount the opportunity is worth.
   */
  AMOUNT = 'opp.amnt',

  /**
   * A description of the opportunity.
   */
  DESCRIPTION = 'opp.desc',

  /**
   * The date the opportunity was created in the external system.
   */
  EXTERNAL_CREATED_AT = 'opp.ecrat',

  /**
   * Opportunity id
   */
  ID = 'opp.id',

  /**
   * The name of the opportunity.
   */
  NAME = 'opp.name',

  /**
   * The next step to take for the opportunity.
   */
  NEXT_STEP = 'opp.nstp',

  /**
   * The chances of the opportunity succeeding, represented as a percentage.
   */
  PROBABILITY = 'opp.prob',

  /**
   * Tags associated with the opportunity.
   */
  TAGS = 'opp.tags',

  /**
   * The type of opportunity.
   */
  TYPE = 'opp.type',

  /**
   *The opportunity's external information received from the installed plugins (Salesforce, Dynamics etc.)
   */
  EXTERNAL = 'opp.ext',

  CUSTOM_FIELD_1 = 'opp.csf1',
  CUSTOM_FIELD_2 = 'opp.csf2',
  CUSTOM_FIELD_3 = 'opp.csf3',
  CUSTOM_FIELD_4 = 'opp.csf4',
  CUSTOM_FIELD_5 = 'opp.csf5',
  CUSTOM_FIELD_6 = 'opp.csf6',
  CUSTOM_FIELD_7 = 'opp.csf7',
  CUSTOM_FIELD_8 = 'opp.csf8',
  CUSTOM_FIELD_9 = 'opp.csf9',

  CUSTOM_FIELD_10 = 'opp.csf10',
  CUSTOM_FIELD_11 = 'opp.csf11',
  CUSTOM_FIELD_12 = 'opp.csf12',
  CUSTOM_FIELD_13 = 'opp.csf13',
  CUSTOM_FIELD_14 = 'opp.csf14',
  CUSTOM_FIELD_15 = 'opp.csf15',
  CUSTOM_FIELD_16 = 'opp.csf16',
  CUSTOM_FIELD_17 = 'opp.csf17',
  CUSTOM_FIELD_18 = 'opp.csf18',
  CUSTOM_FIELD_19 = 'opp.csf19',

  CUSTOM_FIELD_20 = 'opp.csf20',
  CUSTOM_FIELD_21 = 'opp.csf21',
  CUSTOM_FIELD_22 = 'opp.csf22',
  CUSTOM_FIELD_23 = 'opp.csf23',
  CUSTOM_FIELD_24 = 'opp.csf24',
  CUSTOM_FIELD_25 = 'opp.csf25',
  CUSTOM_FIELD_26 = 'opp.csf26',
  CUSTOM_FIELD_27 = 'opp.csf27',
  CUSTOM_FIELD_28 = 'opp.csf28',
  CUSTOM_FIELD_29 = 'opp.csf29',

  CUSTOM_FIELD_30 = 'opp.csf30',
  CUSTOM_FIELD_31 = 'opp.csf31',
  CUSTOM_FIELD_32 = 'opp.csf32',
  CUSTOM_FIELD_33 = 'opp.csf33',
  CUSTOM_FIELD_34 = 'opp.csf34',
  CUSTOM_FIELD_35 = 'opp.csf35',
  CUSTOM_FIELD_36 = 'opp.csf36',
  CUSTOM_FIELD_37 = 'opp.csf37',
  CUSTOM_FIELD_38 = 'opp.csf38',
  CUSTOM_FIELD_39 = 'opp.csf39',

  CUSTOM_FIELD_40 = 'opp.csf40',
  CUSTOM_FIELD_41 = 'opp.csf41',
  CUSTOM_FIELD_42 = 'opp.csf42',
  CUSTOM_FIELD_43 = 'opp.csf43',
  CUSTOM_FIELD_44 = 'opp.csf44',
  CUSTOM_FIELD_45 = 'opp.csf45',
  CUSTOM_FIELD_46 = 'opp.csf46',
  CUSTOM_FIELD_47 = 'opp.csf47',
  CUSTOM_FIELD_48 = 'opp.csf48',
  CUSTOM_FIELD_49 = 'opp.csf49',

  CUSTOM_FIELD_50 = 'opp.csf50',
  CUSTOM_FIELD_51 = 'opp.csf51',
  CUSTOM_FIELD_52 = 'opp.csf52',
  CUSTOM_FIELD_53 = 'opp.csf53',
  CUSTOM_FIELD_54 = 'opp.csf54',
  CUSTOM_FIELD_55 = 'opp.csf55',
  CUSTOM_FIELD_56 = 'opp.csf56',
  CUSTOM_FIELD_57 = 'opp.csf57',
  CUSTOM_FIELD_58 = 'opp.csf58',
  CUSTOM_FIELD_59 = 'opp.csf59',

  CUSTOM_FIELD_60 = 'opp.csf60',
  CUSTOM_FIELD_61 = 'opp.csf61',
  CUSTOM_FIELD_62 = 'opp.csf62',
  CUSTOM_FIELD_63 = 'opp.csf63',
  CUSTOM_FIELD_64 = 'opp.csf64',
  CUSTOM_FIELD_65 = 'opp.csf65',
  CUSTOM_FIELD_66 = 'opp.csf66',
  CUSTOM_FIELD_67 = 'opp.csf67',
  CUSTOM_FIELD_68 = 'opp.csf68',
  CUSTOM_FIELD_69 = 'opp.csf69',

  CUSTOM_FIELD_70 = 'opp.csf70',
  CUSTOM_FIELD_71 = 'opp.csf71',
  CUSTOM_FIELD_72 = 'opp.csf72',
  CUSTOM_FIELD_73 = 'opp.csf73',
  CUSTOM_FIELD_74 = 'opp.csf74',
  CUSTOM_FIELD_75 = 'opp.csf75',
  CUSTOM_FIELD_76 = 'opp.csf76',
  CUSTOM_FIELD_77 = 'opp.csf77',
  CUSTOM_FIELD_78 = 'opp.csf78',
  CUSTOM_FIELD_79 = 'opp.csf79',

  CUSTOM_FIELD_80 = 'opp.csf80',
  CUSTOM_FIELD_81 = 'opp.csf81',
  CUSTOM_FIELD_82 = 'opp.csf82',
  CUSTOM_FIELD_83 = 'opp.csf83',
  CUSTOM_FIELD_84 = 'opp.csf84',
  CUSTOM_FIELD_85 = 'opp.csf85',
  CUSTOM_FIELD_86 = 'opp.csf86',
  CUSTOM_FIELD_87 = 'opp.csf87',
  CUSTOM_FIELD_88 = 'opp.csf88',
  CUSTOM_FIELD_89 = 'opp.csf89',

  CUSTOM_FIELD_90 = 'opp.csf90',
  CUSTOM_FIELD_91 = 'opp.csf91',
  CUSTOM_FIELD_92 = 'opp.csf92',
  CUSTOM_FIELD_93 = 'opp.csf93',
  CUSTOM_FIELD_94 = 'opp.csf94',
  CUSTOM_FIELD_95 = 'opp.csf95',
  CUSTOM_FIELD_96 = 'opp.csf96',
  CUSTOM_FIELD_97 = 'opp.csf97',
  CUSTOM_FIELD_98 = 'opp.csf98',
  CUSTOM_FIELD_99 = 'opp.csf99',

  CUSTOM_FIELD_100 = 'opp.csf100',
}
