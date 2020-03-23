/**
 * Community store by comments
 */
import { observable, action, decorate, reaction } from 'mobx';
import { getTopUsersByComments } from 'services/api';

interface PublisherItem {
  value: string;
  label: string;
}

interface TopCommenter {
  name: string;
  points: number;
  avatar: string;
  comments: number;
}

type sortingType = 'week' | 'month';

export class CommunityByComments {
  loading: boolean = false;
  publishersLoading: boolean = true;
  selectedPublisher: string = null;
  timePeriod: sortingType = 'week';
  publishers: PublisherItem[] = [];
  users: TopCommenter[] = [];
  error: string | boolean = null;

  apiPrams: {
    from: number;
    to: number;
  };

  constructor() {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 7);

    this.apiPrams = {
      from: 0, // startDate.getTime() / 1000,
      to: Math.round(today.getTime() / 1000),
    };

    /** Subscribe to period changes to call API with new params */
    reaction(
      () => this.timePeriod,
      (timePeriod: sortingType) => {
        startDate.setDate(today.getDate() - (timePeriod === 'week' ? 7 : 30));
        this.apiPrams = {
          from: 0, // startDate.getTime() / 1000,
          to: Math.round(today.getTime() / 1000),
        };
        this.getUsers();
      }
    );
  }

  getPublishers = async () => {
    this.publishersLoading = true;

    return new Promise((resolve) => {
      setTimeout(() => {
        const publishers = ['nbc-2.com', 'dpmain12.com', 'smtheles.com', 'dasda.com', 'dasda.co.in'];
        this.publishersLoading = false;
        this.publishers = publishers.map((publisher) => ({ value: publisher, label: publisher }));

        return resolve(publishers);
        // tslint:disable-next-line
      }, 2000);
    });
  };

  getUsers = async () => {
    this.loading = true;
    this.error = null;
    this.users = [];

    return getTopUsersByComments(this.apiPrams.from, this.apiPrams.to)
      .then((response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.users = response.data;
          return;
        }
        throw new Error('getTopUsersByComments API response error');
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          // tslint:disable-next-line
          console.error('getTopUsersByPoints API Error:', err.message);
        }
        this.error = err;
      })
      .finally(() => (this.loading = false));
  };

  changePeriod = (period: 'week' | 'month') => {
    this.timePeriod = period;
    if (this.selectedPublisher) {
      this.getUsers();
    }
  };

  changePublisher = (newValue: string) => {
    this.selectedPublisher = newValue;
    this.getUsers();
  };

  clearState = () => {
    this.loading = false;
    this.publishersLoading = false;
    this.selectedPublisher = null;
    this.timePeriod = 'week';
    this.publishers = [];
    this.users = [];
    this.error = null;
  };
}

decorate(CommunityByComments, {
  loading: observable,
  publishersLoading: observable,
  selectedPublisher: observable,
  timePeriod: observable,
  publishers: observable,
  users: observable,
  getPublishers: action,
  getUsers: action,
  changePeriod: action,
  changePublisher: action,
  clearState: action,
});

export default new CommunityByComments();
