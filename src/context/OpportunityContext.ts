import { OpportunityContextKeys } from '../store/keys/OpportunityContextKeys';
// eslint-disable-next-line no-unused-vars
import { ContextParam } from './ContextParam';
import { CustomContext } from './CustomContext'

export class OpportunityContext extends CustomContext {
    /**
     * The amount the opportunity is worth.
     *
     * @type {number}
     * @memberof OpportunityContext
     */
    amount: number;

    /**
     * A description of the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    description?: string;

    /**
     * The date the opportunity was created in the external system.
     *
     * @type {Date}
     * @memberof OpportunityContext
     */
    externalCreatedAt: Date;

    /**
     * Unique opportunity identifier.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    id?: string;

    /**
     * `The next step to take for the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    name?: string;

    /**
     * The next step to take for the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    nextStep?: string;

    /**
     * The type of opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    opportunityType?: string;

    /**
     * The chances of the opportunity succeeding, represented as a percentage.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    probability: string;

    /**
     * Tags associated with the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    tags: string;

    /**
     * Attempts to initialize the opportunity context with a given parameter.
     *
     * @memberof OpportunityContext
     */
    public initFrom = (param: ContextParam): boolean => {
      switch (param.key) {
        case OpportunityContextKeys.DESCRIPTION:
          this.description = param.value;
          break;
        case OpportunityContextKeys.EXTERNAL_CREATED_AT:
          this.externalCreatedAt = new Date(param.value);
          break;
        case OpportunityContextKeys.ID:
          this.id = param.value;
          break;
        case OpportunityContextKeys.NAME:
          this.name = param.value;
          break;
        case OpportunityContextKeys.NEXT_STEP:
          this.nextStep = param.value;
          break;
        case OpportunityContextKeys.PROBABILITY:
          this.probability = param.value;
          break;
        case OpportunityContextKeys.TAGS:
          this.tags = param.value;
          break;
        case OpportunityContextKeys.TYPE:
          this.opportunityType = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_1:
          this.customField1 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_2:
          this.customField2 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_3:
          this.customField3 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_4:
          this.customField4 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_5:
          this.customField5 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_6:
          this.customField6 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_7:
          this.customField7 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_8:
          this.customField8 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_9:
          this.customField9 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_10:
          this.customField10 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_11:
          this.customField11 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_12:
          this.customField12 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_13:
          this.customField13 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_14:
          this.customField14 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_15:
          this.customField15 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_16:
          this.customField16 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_17:
          this.customField17 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_18:
          this.customField18 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_19:
          this.customField19 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_20:
          this.customField20 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_21:
          this.customField21 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_22:
          this.customField22 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_23:
          this.customField23 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_24:
          this.customField24 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_25:
          this.customField25 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_26:
          this.customField26 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_27:
          this.customField27 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_28:
          this.customField28 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_29:
          this.customField29 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_30:
          this.customField30 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_31:
          this.customField31 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_32:
          this.customField32 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_33:
          this.customField33 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_34:
          this.customField34 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_35:
          this.customField35 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_36:
          this.customField36 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_37:
          this.customField37 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_38:
          this.customField38 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_39:
          this.customField39 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_40:
          this.customField40 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_41:
          this.customField41 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_42:
          this.customField42 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_43:
          this.customField43 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_44:
          this.customField44 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_45:
          this.customField45 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_46:
          this.customField46 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_47:
          this.customField47 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_48:
          this.customField48 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_49:
          this.customField49 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_50:
          this.customField50 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_51:
          this.customField51 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_52:
          this.customField52 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_53:
          this.customField53 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_54:
          this.customField54 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_55:
          this.customField55 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_56:
          this.customField56 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_57:
          this.customField57 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_58:
          this.customField58 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_59:
          this.customField59 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_60:
          this.customField60 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_61:
          this.customField61 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_62:
          this.customField62 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_63:
          this.customField63 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_64:
          this.customField64 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_65:
          this.customField65 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_66:
          this.customField66 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_67:
          this.customField67 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_68:
          this.customField68 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_69:
          this.customField69 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_70:
          this.customField70 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_71:
          this.customField71 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_72:
          this.customField72 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_73:
          this.customField73 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_74:
          this.customField74 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_75:
          this.customField75 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_76:
          this.customField76 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_77:
          this.customField77 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_78:
          this.customField78 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_79:
          this.customField79 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_80:
          this.customField80 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_81:
          this.customField81 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_82:
          this.customField82 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_83:
          this.customField83 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_84:
          this.customField84 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_85:
          this.customField85 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_86:
          this.customField86 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_87:
          this.customField87 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_88:
          this.customField88 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_89:
          this.customField89 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_90:
          this.customField90 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_91:
          this.customField91 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_92:
          this.customField92 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_93:
          this.customField93 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_94:
          this.customField94 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_95:
          this.customField95 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_96:
          this.customField96 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_97:
          this.customField97 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_98:
          this.customField98 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_99:
          this.customField99 = param.value;
          break;
        case OpportunityContextKeys.CUSTOM_FIELD_100:
          this.customField100 = param.value;
          break;
        default:
          return false;
      }

      return true;
    }
}
