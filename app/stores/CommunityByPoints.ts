import { observable, action, decorate } from 'mobx';
import { getTopUsersByPoints } from 'services/api';

export class CommunityByPoints {
  loading: boolean = true;
  error: string | boolean = false;
  items = [];

  getUsers = async () => {
    this.loading = true;
    this.error = false;

    getTopUsersByPoints()
      .then((response: any) => {
        if (response.success) {
          this.items = response.data;
        } else {
          throw new Error('API response error');
        }
      })
      .catch((err) => {
        this.error = true;
        if (process.env.NODE_ENV === 'development') {
          // tslint:disable-next-line
          console.log('getTopUsersByPoints API Error:', err.message);
        }
      })
      .finally(() => (this.loading = false));
  };

  clearState = () => {
    this.loading = false;
    this.error = false;
    this.items = [];
  };
}

decorate(CommunityByPoints, {
  loading: observable,
  error: observable,
  items: observable,
  getUsers: action,
  clearState: action,
});

export default new CommunityByPoints();
