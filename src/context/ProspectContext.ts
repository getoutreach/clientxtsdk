import { ProspectContextKeys } from '../store/keys/ProspectContextKeys';
// eslint-disable-next-line no-unused-vars
import { ContextParam } from './ContextParam';
import { CustomContext } from './CustomContext'

export class ProspectContext extends CustomContext {
    /**
     * The date and time the prospect is available to contact again.
     *
     * @type {Date}
     * @memberof OpportunityContext
     */
    availableAt: Date;

    /**
     * The name of the company the prospect works at. If associated with an account,
     * this is the name of the account. (e.g. Acme International).
     *
     * @type {string}
     * @memberof ProspectContext
     */
    company: string;

    /**
     * The locality of prospect’s company.
     *
     * @type {string}
     * @memberof ProspectContext
     */
    companyLocality: string;

    /**
     * A list of email addresses associated with the prospect.
     *
     * @type {string[]}
     * @memberof ProspectContext
     */
    emails: string[]

    /**
     * Unique prospect identifier.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    id?: string;

    /**
     * Tags associated with the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    tags: string;

    /**
     * The prospect’s current timezone, preferably in the IANA format (e.g. "America/LosAngeles").
     */
    timezone: string;

    /**
     * The title of the prospect.
     */
    title: string;

    /**
     * Attempts to initialize the opportunity context with a given parameter.
     *
     * @memberof OpportunityContext
     */
    public initFrom = (param: ContextParam): boolean => {
      switch (param.key) {
        case ProspectContextKeys.AVAILABLE_AT:
          this.availableAt = new Date(param.value);
          break;
        case ProspectContextKeys.COMPANY:
          this.company = param.value;
          break;
        case ProspectContextKeys.COMPANY_LOCALITY:
          this.companyLocality = param.value;
          break;
        case ProspectContextKeys.ID:
          this.id = param.value;
          break;
        case ProspectContextKeys.TAGS:
          this.tags = param.value;
          break;
        case ProspectContextKeys.TIMEZONE:
          this.timezone = param.value;
          break;
        case ProspectContextKeys.TITLE:
          this.title = param.value;
          break;

        case ProspectContextKeys.CUSTOM_FIELD_1:
          this.customField1 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_2:
          this.customField2 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_3:
          this.customField3 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_4:
          this.customField4 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_5:
          this.customField5 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_6:
          this.customField6 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_7:
          this.customField7 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_8:
          this.customField8 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_9:
          this.customField9 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_10:
          this.customField10 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_11:
          this.customField11 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_12:
          this.customField12 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_13:
          this.customField13 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_14:
          this.customField14 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_15:
          this.customField15 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_16:
          this.customField16 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_17:
          this.customField17 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_18:
          this.customField18 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_19:
          this.customField19 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_20:
          this.customField20 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_21:
          this.customField21 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_22:
          this.customField22 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_23:
          this.customField23 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_24:
          this.customField24 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_25:
          this.customField25 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_26:
          this.customField26 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_27:
          this.customField27 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_28:
          this.customField28 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_29:
          this.customField29 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_30:
          this.customField30 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_31:
          this.customField31 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_32:
          this.customField32 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_33:
          this.customField33 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_34:
          this.customField34 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_35:
          this.customField35 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_36:
          this.customField36 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_37:
          this.customField37 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_38:
          this.customField38 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_39:
          this.customField39 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_40:
          this.customField40 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_41:
          this.customField41 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_42:
          this.customField42 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_43:
          this.customField43 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_44:
          this.customField44 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_45:
          this.customField45 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_46:
          this.customField46 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_47:
          this.customField47 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_48:
          this.customField48 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_49:
          this.customField49 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_50:
          this.customField50 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_51:
          this.customField51 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_52:
          this.customField52 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_53:
          this.customField53 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_54:
          this.customField54 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_55:
          this.customField55 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_56:
          this.customField56 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_57:
          this.customField57 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_58:
          this.customField58 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_59:
          this.customField59 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_60:
          this.customField60 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_61:
          this.customField61 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_62:
          this.customField62 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_63:
          this.customField63 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_64:
          this.customField64 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_65:
          this.customField65 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_66:
          this.customField66 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_67:
          this.customField67 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_68:
          this.customField68 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_69:
          this.customField69 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_70:
          this.customField70 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_71:
          this.customField71 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_72:
          this.customField72 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_73:
          this.customField73 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_74:
          this.customField74 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_75:
          this.customField75 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_76:
          this.customField76 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_77:
          this.customField77 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_78:
          this.customField78 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_79:
          this.customField79 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_80:
          this.customField80 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_81:
          this.customField81 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_82:
          this.customField82 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_83:
          this.customField83 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_84:
          this.customField84 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_85:
          this.customField85 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_86:
          this.customField86 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_87:
          this.customField87 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_88:
          this.customField88 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_89:
          this.customField89 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_90:
          this.customField90 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_91:
          this.customField91 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_92:
          this.customField92 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_93:
          this.customField93 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_94:
          this.customField94 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_95:
          this.customField95 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_96:
          this.customField96 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_97:
          this.customField97 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_98:
          this.customField98 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_99:
          this.customField99 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_100:
          this.customField100 = param.value;
          break;

        case ProspectContextKeys.CUSTOM_FIELD_101:
          this.customField101 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_102:
          this.customField102 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_103:
          this.customField103 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_104:
          this.customField104 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_105:
          this.customField105 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_106:
          this.customField106 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_107:
          this.customField107 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_108:
          this.customField108 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_109:
          this.customField109 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_110:
          this.customField110 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_111:
          this.customField111 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_112:
          this.customField112 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_113:
          this.customField113 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_114:
          this.customField114 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_115:
          this.customField115 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_116:
          this.customField116 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_117:
          this.customField117 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_118:
          this.customField118 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_119:
          this.customField119 = param.value;
          break;
        case ProspectContextKeys.CUSTOM_FIELD_120:
          this.customField120 = param.value;
          break;

        default:
          return false;
      }

      return true;
    }
}
