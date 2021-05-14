/* eslint-disable no-unused-vars */
/**
 * A descriptor of a person.
 *
 * @see https://api.outreach.io/api/v2/docs#prospect
 * @export
 * @enum {number}
 */
export enum ProspectContextKeys {
  /**
   * The date and time the prospect is available to contact again.
   */
  AVAILABLE_AT = 'pro.avail',

  /**
   * The name of the company the prospect works at.
   * If associated with an account, this is the name of the account. (e.g. Acme International).
   */
  COMPANY = 'pro.comp',

  /**
   * The locality of prospect’s company.
   */
  COMPANY_LOCALITY = 'pro.loc',

  /**
   * Collection of prospect emails
   */
  EMAILS = 'pro.emails',

  /**
   * Prospect id
   */
  ID = 'pro.id',

  /**
   * A list of tag values associated with the account (e.g. ["Interested", "2017 Expo"]).
   */
  TAGS = 'pro.tags',

  /**
   * The prospect’s current timezone, preferably in the IANA format (e.g. "America/LosAngeles").
   */
  TIMEZONE = 'pro.tzone',

  /**
   * The title of the prospect.
   */
  TITLE = 'pro.title',

  /**
   *The prospect's external information received from the installed plugins (Salesforce, Dynamics etc.)
   */
  EXTERNAL = 'pro.ext',

  CUSTOM_FIELD_1 = 'pro.csf1',
  CUSTOM_FIELD_2 = 'pro.csf2',
  CUSTOM_FIELD_3 = 'pro.csf3',
  CUSTOM_FIELD_4 = 'pro.csf4',
  CUSTOM_FIELD_5 = 'pro.csf5',
  CUSTOM_FIELD_6 = 'pro.csf6',
  CUSTOM_FIELD_7 = 'pro.csf7',
  CUSTOM_FIELD_8 = 'pro.csf8',
  CUSTOM_FIELD_9 = 'pro.csf9',

  CUSTOM_FIELD_10 = 'pro.csf10',
  CUSTOM_FIELD_11 = 'pro.csf11',
  CUSTOM_FIELD_12 = 'pro.csf12',
  CUSTOM_FIELD_13 = 'pro.csf13',
  CUSTOM_FIELD_14 = 'pro.csf14',
  CUSTOM_FIELD_15 = 'pro.csf15',
  CUSTOM_FIELD_16 = 'pro.csf16',
  CUSTOM_FIELD_17 = 'pro.csf17',
  CUSTOM_FIELD_18 = 'pro.csf18',
  CUSTOM_FIELD_19 = 'pro.csf19',

  CUSTOM_FIELD_20 = 'pro.csf20',
  CUSTOM_FIELD_21 = 'pro.csf21',
  CUSTOM_FIELD_22 = 'pro.csf22',
  CUSTOM_FIELD_23 = 'pro.csf23',
  CUSTOM_FIELD_24 = 'pro.csf24',
  CUSTOM_FIELD_25 = 'pro.csf25',
  CUSTOM_FIELD_26 = 'pro.csf26',
  CUSTOM_FIELD_27 = 'pro.csf27',
  CUSTOM_FIELD_28 = 'pro.csf28',
  CUSTOM_FIELD_29 = 'pro.csf29',

  CUSTOM_FIELD_30 = 'pro.csf30',
  CUSTOM_FIELD_31 = 'pro.csf31',
  CUSTOM_FIELD_32 = 'pro.csf32',
  CUSTOM_FIELD_33 = 'pro.csf33',
  CUSTOM_FIELD_34 = 'pro.csf34',
  CUSTOM_FIELD_35 = 'pro.csf35',
  CUSTOM_FIELD_36 = 'pro.csf36',
  CUSTOM_FIELD_37 = 'pro.csf37',
  CUSTOM_FIELD_38 = 'pro.csf38',
  CUSTOM_FIELD_39 = 'pro.csf39',

  CUSTOM_FIELD_40 = 'pro.csf40',
  CUSTOM_FIELD_41 = 'pro.csf41',
  CUSTOM_FIELD_42 = 'pro.csf42',
  CUSTOM_FIELD_43 = 'pro.csf43',
  CUSTOM_FIELD_44 = 'pro.csf44',
  CUSTOM_FIELD_45 = 'pro.csf45',
  CUSTOM_FIELD_46 = 'pro.csf46',
  CUSTOM_FIELD_47 = 'pro.csf47',
  CUSTOM_FIELD_48 = 'pro.csf48',
  CUSTOM_FIELD_49 = 'pro.csf49',

  CUSTOM_FIELD_50 = 'pro.csf50',
  CUSTOM_FIELD_51 = 'pro.csf51',
  CUSTOM_FIELD_52 = 'pro.csf52',
  CUSTOM_FIELD_53 = 'pro.csf53',
  CUSTOM_FIELD_54 = 'pro.csf54',
  CUSTOM_FIELD_55 = 'pro.csf55',
  CUSTOM_FIELD_56 = 'pro.csf56',
  CUSTOM_FIELD_57 = 'pro.csf57',
  CUSTOM_FIELD_58 = 'pro.csf58',
  CUSTOM_FIELD_59 = 'pro.csf59',

  CUSTOM_FIELD_60 = 'pro.csf60',
  CUSTOM_FIELD_61 = 'pro.csf61',
  CUSTOM_FIELD_62 = 'pro.csf62',
  CUSTOM_FIELD_63 = 'pro.csf63',
  CUSTOM_FIELD_64 = 'pro.csf64',
  CUSTOM_FIELD_65 = 'pro.csf65',
  CUSTOM_FIELD_66 = 'pro.csf66',
  CUSTOM_FIELD_67 = 'pro.csf67',
  CUSTOM_FIELD_68 = 'pro.csf68',
  CUSTOM_FIELD_69 = 'pro.csf69',

  CUSTOM_FIELD_70 = 'pro.csf70',
  CUSTOM_FIELD_71 = 'pro.csf71',
  CUSTOM_FIELD_72 = 'pro.csf72',
  CUSTOM_FIELD_73 = 'pro.csf73',
  CUSTOM_FIELD_74 = 'pro.csf74',
  CUSTOM_FIELD_75 = 'pro.csf75',
  CUSTOM_FIELD_76 = 'pro.csf76',
  CUSTOM_FIELD_77 = 'pro.csf77',
  CUSTOM_FIELD_78 = 'pro.csf78',
  CUSTOM_FIELD_79 = 'pro.csf79',

  CUSTOM_FIELD_80 = 'pro.csf80',
  CUSTOM_FIELD_81 = 'pro.csf81',
  CUSTOM_FIELD_82 = 'pro.csf82',
  CUSTOM_FIELD_83 = 'pro.csf83',
  CUSTOM_FIELD_84 = 'pro.csf84',
  CUSTOM_FIELD_85 = 'pro.csf85',
  CUSTOM_FIELD_86 = 'pro.csf86',
  CUSTOM_FIELD_87 = 'pro.csf87',
  CUSTOM_FIELD_88 = 'pro.csf88',
  CUSTOM_FIELD_89 = 'pro.csf89',

  CUSTOM_FIELD_90 = 'pro.csf90',
  CUSTOM_FIELD_91 = 'pro.csf91',
  CUSTOM_FIELD_92 = 'pro.csf92',
  CUSTOM_FIELD_93 = 'pro.csf93',
  CUSTOM_FIELD_94 = 'pro.csf94',
  CUSTOM_FIELD_95 = 'pro.csf95',
  CUSTOM_FIELD_96 = 'pro.csf96',
  CUSTOM_FIELD_97 = 'pro.csf97',
  CUSTOM_FIELD_98 = 'pro.csf98',
  CUSTOM_FIELD_99 = 'pro.csf99',

  CUSTOM_FIELD_100 = 'pro.csf100',
  CUSTOM_FIELD_101 = 'pro.csf101',
  CUSTOM_FIELD_102 = 'pro.csf102',
  CUSTOM_FIELD_103 = 'pro.csf103',
  CUSTOM_FIELD_104 = 'pro.csf104',
  CUSTOM_FIELD_105 = 'pro.csf105',
  CUSTOM_FIELD_106 = 'pro.csf106',
  CUSTOM_FIELD_107 = 'pro.csf107',
  CUSTOM_FIELD_108 = 'pro.csf108',
  CUSTOM_FIELD_109 = 'pro.csf109',

  CUSTOM_FIELD_110 = 'pro.csf110',
  CUSTOM_FIELD_111 = 'pro.csf111',
  CUSTOM_FIELD_112 = 'pro.csf112',
  CUSTOM_FIELD_113 = 'pro.csf113',
  CUSTOM_FIELD_114 = 'pro.csf114',
  CUSTOM_FIELD_115 = 'pro.csf115',
  CUSTOM_FIELD_116 = 'pro.csf116',
  CUSTOM_FIELD_117 = 'pro.csf117',
  CUSTOM_FIELD_118 = 'pro.csf118',
  CUSTOM_FIELD_119 = 'pro.csf119',

  CUSTOM_FIELD_120 = 'pro.csf120',
}
