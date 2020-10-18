import { UserContextKeys } from '../store/keys/UserContextKeys';
// eslint-disable-next-line no-unused-vars
import { ContextParam } from './ContextParam';

export class UserContext {
    /**
     * Unique user identifier
     *
     * @type {string}
     * @memberof UserContext
     */
    id?: string;

    /**
     * The email address of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    email?: string;

    /**
     * The first name of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    firstName?: string;

    /**
     * The last name of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    lastName?: string;

    /**
     * The user's job title (e.g. "Staff Accountant").
     *
     * @type {string}
     * @memberof UserContext
     */
    title?: string;

    /**
     * A reader friendly unique identifier of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    username?: string;

    customField1?: string;
    customField2?: string;
    customField3?: string;
    customField4?: string;
    customField5?: string;

    /**
     * Attempts to initialize the opportunity context with a given parameter.
     *
     * @memberof OpportunityContext
     */
    public initFrom = (param: ContextParam): boolean => {
      switch (param.key) {
        case UserContextKeys.EMAIL:
          this.email = param.value;
          break;
        case UserContextKeys.FIRST_NAME:
          this.firstName = param.value;
          break;
        case UserContextKeys.ID:
          this.id = param.value;
          break;
        case UserContextKeys.LAST_NAME:
          this.lastName = param.value;
          break;
        case UserContextKeys.TITLE:
          this.title = param.value;
          break;
        case UserContextKeys.USERNAME:
          this.username = param.value;
          break;
        case UserContextKeys.CUSTOM_FIELD_1:
          this.customField1 = param.value;
          break;
        case UserContextKeys.CUSTOM_FIELD_2:
          this.customField2 = param.value;
          break;
        case UserContextKeys.CUSTOM_FIELD_3:
          this.customField3 = param.value;
          break;
        case UserContextKeys.CUSTOM_FIELD_4:
          this.customField4 = param.value;
          break;
        case UserContextKeys.CUSTOM_FIELD_5:
          this.customField5 = param.value;
          break;
        default:
          return false;
      }

      return true;
    }
}
