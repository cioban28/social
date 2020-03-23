/**
 * Store for 'Explore' page where users can find publishers
 */
import { action, decorate, observable } from 'mobx';
import { getPublishersAPI } from 'services/api';

export interface Publisher {
  name: string;
  comments: number;
}

export type sortingTypes = 'popular' | 'trending' | 'newest';

// const publishers = [
//   { name: 'nbc-2.com', comments: 70 },
//   { name: 'express.com', comments: 80 },
//   { name: 'name.com', comments: 80 },
//   { name: 'blog.vuukle.com', comments: 80 },
//   { name: 'vuukle.com', comments: 80 },
//   { name: 'lfg.co', comments: 10 },
// ];

// const mockGetPublishers = () =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         success: true,
//         data: publishers,
//       });
//       // tslint:disable-next-line
//     }, 2000);
//   });

export class ExplorePublishers {
  loading: boolean = false;
  error: boolean | string = false;
  publishers: Publisher[] = [];
  sorting: sortingTypes = 'popular';

  getPublishers = async (sorting: number = 0) => {
    this.loading = true;
    // return mockGetPublishers()
    return getPublishersAPI(sorting, 0, 10)
      .then((response: any) => {
        if (response.success) {
          this.publishers = this.publishers.slice().concat(response.data);
        }
      })
      .finally(() => (this.loading = false));
  };

  changeSorting = (sorting: sortingTypes) => {
    const sortingOptions = {
      popular: 0,
      trending: 1,
      newest: 2,
    };
    this.sorting = sorting;
    this.publishers = [];
    return this.getPublishers(sortingOptions[sorting]);
  };
}

decorate(ExplorePublishers, {
  loading: observable,
  error: observable,
  publishers: observable,
  sorting: observable,

  getPublishers: action,
  changeSorting: action,
});

export default new ExplorePublishers();
