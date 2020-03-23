/**
 * Profile recommends
 */
import { observable, action, decorate } from 'mobx';
import { getUserRecommends } from 'services/api';
import PublicProfile from './PublicProfile';

export interface Article {
  id: number;
  title: string;
  url: string;
  comments: number;
  avatar: string;
}

export class ProfileRecommends {
  loading: boolean = false;
  errorLoading: boolean | string = false;
  recommends: Article[] = [];

  /**
   * @name getRecommends
   * Get recommends from server and push to this.recommends
   * @returns {Promise<void>}
   */
  public getRecommends = async () => {
    this.loading = true;
    this.errorLoading = false;

    let userId = PublicProfile.id;

    getUserRecommends(userId)
      .then((response) => {
        if (response.data) {
          this.recommends = this.recommends.slice().concat(response.data);
        }
      })
      .catch((err) => {
        this.errorLoading = err.message;
        this.recommends = [];
      })
      .finally(() => (this.loading = false));
  };

  /**
   * @name cleanRecommends
   * Used to left only 5 latest recommends if user change only tab for currently opened profile
   */
  public cleanRecommends = () => {
    if (this.recommends.length > 5) {
      this.recommends.splice(5);
    }
  };

  /**
   * @name removeRecommends
   * Used to clear state once navigation is changed to another user
   */
  public removeRecommends = () => {
    this.recommends = [];
    this.loading = false;
    this.errorLoading = false;
  };
}

decorate(ProfileRecommends, {
  loading: observable,
  errorLoading: observable,
  recommends: observable,
  getRecommends: action,
  cleanRecommends: action,
  removeRecommends: action,
});

export default new ProfileRecommends();
