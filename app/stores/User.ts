import { observable, action, decorate } from 'mobx';
import Cookies from 'js-cookie';
import { getUserDetailsAPI } from 'services/api';
import get from 'lodash/get';

/**
 * @description Common used types/interfaces for 'User' (profile)
 */
export interface User {
  name: string;
  id: string | number;
  email: string;
  points: number;
  pictureUrl: string | null;
  isPasswordEntered?: boolean;
}

export class UserStore {
  /** Determinates if user details are loading */
  loading: boolean = false;
  /** User details we receive from server */
  details: User | null = null;

  constructor() {
    /** Authenticate user automatically is token exists */
    const token = Cookies.get(process.env.SESSION_COOKIE_NAME);
    if (token) {
      this.getUserDetails().catch(() => Cookies.remove(process.env.SESSION_COOKIE_NAME));
    }
  }

  /**
   * Get user details from the server
   */
  public getUserDetails = async (): Promise<{}> => {
    this.loading = true;
    return getUserDetailsAPI()
      .then((response) => {
        const { name, email, pictureUrl, apiKey, points } = get(response, 'data.user', {});

        this.details = {
          name,
          email,
          points,
          pictureUrl,
          id: apiKey,
        };

        return response;
      })
      .finally(action(() => (this.loading = false)));
  };

  public saveUser = (data) => {
    this.details = {
      name: data.name,
      email: data.email,
      points: data.points,
      pictureUrl: data.pictureUrl,
      id: data.id,
    };
    return data;
  };

  /**
   * Clear user details
   */
  public forgetUser = () => (this.details = null);

  /**
   * Update user profile
   */
  public update = (name: string, pictureUrl: string) => {
    this.details.name = name;
    this.details.pictureUrl = pictureUrl;
  };
}

decorate(UserStore, {
  loading: observable,
  details: observable,
  getUserDetails: action,
  forgetUser: action,
  saveUser: action,
  update: action,
});

export default new UserStore();
