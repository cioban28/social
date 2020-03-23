import { observable, action, decorate } from 'mobx';
import UserStore from './User';
import Cookies from 'js-cookie';
import { forgotPasswordAPI, recoverPasswordAPI, signupAPI, loginAPI } from 'services/api';

interface AuthDetails {
  name: string;
  email: string;
  password: string;
  ageRange: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '';
  pictureUrl: string | '';
}

export class AuthStore {
  /** Determinates if API is in progress and we are waiting for data */
  inProgress: boolean = false;
  /** Error happened */
  error?: string = undefined;

  /** Auth/Register Form data */
  values: AuthDetails = {
    name: '',
    email: '',
    password: '',
    ageRange: '',
    pictureUrl: '',
  };

  /** Handlers for form data changes */
  setName = (userName: string) => (this.values.name = userName);
  setEmail = (email: string) => (this.values.email = email);
  setPassword = (password: string) => (this.values.password = password);
  setAgeRange = (ageRange: '0' | '1' | '2' | '3' | '4' | '5' | '6') => (this.values.ageRange = ageRange);

  /** Reset auth store data */
  reset = () => {
    this.error = undefined;
    this.values.name = '';
    this.values.email = '';
    this.values.password = '';
    this.values.ageRange = '';
    this.values.pictureUrl = '';
  };

  /** Login user using API */
  login = async (): Promise<{}> => {
    this.inProgress = true;
    this.error = undefined;

    return loginAPI(this.values.email, this.values.password)
      .then((response: any) => {
        if (!response.isPasswordEntered) {
          throw new Error(`We couldn't log you in. Please check your details.`);
        }

        if (response.isPasswordEntered && response.token) {
          Cookies.set(process.env.SESSION_COOKIE_NAME, response.token);
        }

        return response;
      })
      .then(UserStore.getUserDetails)
      .catch((error: any) => {
        if (error.message) {
          this.error = error.message;
        } else {
          this.error = `We couln't log you in. Please try again a bit later or contact with support.`;
        }
        return {};
      })
      .finally(action(() => (this.inProgress = false)));
  };

  /** SignUp user using API */
  signup = async (): Promise<{}> => {
    this.inProgress = true;
    this.error = undefined;

    return signupAPI(this.values.email, this.values.name, this.values.password, this.values.ageRange)
      .then((response: any) => {
        if (response.success && response.data) {
          Cookies.set(process.env.SESSION_COOKIE_NAME, response.data.authTicket.token);
          return response.data.user;
        }
        if (response.errors && response.errors.indexOf('User already exists') !== -1) {
          throw new Error('User already exists');
        } else {
          throw new Error();
        }
      })
      .then(UserStore.saveUser)
      .catch((error: any) => {
        if (error.message && error.message === 'User already exists') {
          this.error = 'This email is already in use.';
        } else {
          this.error = `Account wasn't created. Please try again or contact with support.`;
        }

        if (process.env.NODE_ENV === 'development') {
          // tslint:disable-next-line
          console.log('signup API error:', error);
        }
      })
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  };

  forgotPass = async (): Promise<{}> => {
    const { email } = this.values;
    this.inProgress = true;
    this.error = undefined;
    return forgotPasswordAPI(email)
      .then((res) => res)
      .catch(action((error: string) => (this.error = error)))
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  };

  recoverPassword = async (verificationKey: string): Promise<{}> => {
    const { email, password } = this.values;
    this.inProgress = true;
    this.error = undefined;
    return recoverPasswordAPI(email, password, verificationKey)
      .then((res) => res)
      .catch(action((error: string) => (this.error = error)))
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  };

  /** Log out user: remove token, clear userStore and clear form data (this.values) */
  logout = () => {
    Cookies.remove(process.env.SESSION_COOKIE_NAME);
    UserStore.forgetUser();
    this.reset();
  };
}

decorate(AuthStore, {
  inProgress: observable,
  error: observable,
  values: observable,
  setName: action,
  setPassword: action,
  setEmail: action,
  setAgeRange: action,
  reset: action,
  login: action,
  logout: action,
});

export default new AuthStore();
