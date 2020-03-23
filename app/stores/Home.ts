/**
 * Store for 'Home' page where users can see articles and publishers
 */

import { action, decorate, observable } from 'mobx';
import Tag from 'stores/models/Tag';
import Article from 'stores/models/Article';

import { getPublishersAPI, getArticlesAPI } from 'services/api';
/* import mock data */
import { homePageMockData, getMockData } from 'common/mockData';

export type sortingTypes = 'most-commented' | 'most-recommended' | 'latest-comments';

export interface Publisher {
  name: string;
  comments: number;
}

export class HomePageArticles {
  loading: boolean = false;
  error: boolean | string = false;
  articles: Article[] = [];
  loadingArticles: boolean = false;
  sorting: sortingTypes = 'most-commented';
  publishers: Publisher[] = [];
  loadingPublishers: boolean = false;
  trendingTags: Tag[] = [];

  getTrendingTags = async () => {
    this.loading = true;
    return (
      getMockData(homePageMockData.trendingTags)
        // return getTagsApi(this.apiPrams.from, this.apiPrams.to)
        .then((response: any) => {
          if (response.success) {
            this.trendingTags = this.trendingTags.slice().concat(response.data);
          }
        })
        .finally(() => (this.loading = false))
    );
  };

  getArticles = async (sorting?: sortingTypes) => {
    this.loadingArticles = true;
    // return getMockData(homePageMockData.articles)
    return getArticlesAPI(sorting)
      .then((response: any) => {
        if (response.success) {
          this.articles = response.data.map((article) => new Article(article));
        }
      })
      .finally(() => (this.loadingArticles = false));
  };

  getPublishers = async () => {
    this.loadingPublishers = true;
    // return getMockData(homePageMockData.publishers)
    return getPublishersAPI(0, 0, 5)
      .then((response: any) => {
        if (response.success) {
          this.publishers = this.publishers.slice().concat(response.data);
        }
      })
      .finally(() => (this.loadingPublishers = false));
  };

  changeSorting = (sorting: sortingTypes) => {
    this.loadingArticles = true;
    this.sorting = sorting;
    this.articles = [];
    return this.getArticles(sorting);
  };

  reset = () => {
    this.loading = false;
    this.error = null;
    this.articles = [];
    this.sorting = 'most-commented';
    this.publishers = [];
    this.trendingTags = [];
  };
}

decorate(HomePageArticles, {
  loading: observable,
  error: observable,
  trendingTags: observable,
  articles: observable,
  loadingArticles: observable,
  publishers: observable,
  loadingPublishers: observable,
  sorting: observable,

  getTrendingTags: action,
  getPublishers: action,
  getArticles: action,
  changeSorting: action,
  reset: action,
});

export default new HomePageArticles();
