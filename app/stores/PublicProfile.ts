/**
 * Profile store. Used to store public data of user: comments, replies, recommends, name, points etc.
 * Will change with user change
 */
import { observable, action, decorate } from 'mobx';
import { getPublicProfile } from 'services/api';

export interface ProfileDetails {
  id: string | number;
  name: string;
  avatar: string;
  slug: string;
  points: number;
  commentsCount: number;
  votesCount: number;
  userId: string;
  recommendsCount: number;
}

export class PublicProfileStore {
  /** Main user details loading */
  loading: boolean = true;
  error: boolean = false;
  /** User details */
  id: string = null;
  details: ProfileDetails = null;

  public getProfileDetails = async () => {
    this.loading = true;
    this.error = false;
    return getPublicProfile(this.id)
      .then((response: any) => {
        if (response.success && response.data) {
          this.details = {
            id: this.id,
            name: response.data.name,
            avatar: response.data.pictureUrl,
            slug: response.data.name,
            points: response.data.points,
            commentsCount: response.data.comments,
            votesCount: response.data.votes,
            userId: response.data.apiKey,
            recommendsCount: response.data.recommends,
          };
        } else {
          throw new Error('Wrong response');
        }
      })
      .catch((err) => {
        this.details = null;
        this.error = err.message;
      })
      .finally(() => {
        this.loading = false;
      });
  };

  public reset = () => {
    this.loading = true;
    this.details = null;
  };
}

decorate(PublicProfileStore, {
  loading: observable,
  error: observable,
  getProfileDetails: action,
  reset: action,
});

export default new PublicProfileStore();
