import { action, decorate, observable } from 'mobx';
import Tag from 'stores/models/Tag';
import Article from 'stores/models/Article';
import Publisher from 'stores/models/Publisher';

/* import mock data */
import { homePageMockData, getMockData } from 'common/mockData';
import { getPublisherDataApi, getArticlesAPI, getTopUsersByPublisherAPI } from 'services/api';

export type sortingTypes = 'most-commented' | 'most-recommended' | 'latest-comments';

export class PublisherStore {
  publisherName: string;
  loadingPublisher: boolean = false;
  loadingArcticles: boolean = false;
  loadingTags: boolean = false;
  loadingUsers: boolean = false;
  error: boolean | string = false;
  articles: Article[] = [];
  sorting: sortingTypes = 'most-commented';
  publisher: Publisher;
  users: any[] = [];
  trendingTags: Tag[] = [];

  apiPrams: {
    from: number;
    to: number;
  };

  constructor() {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 7);

    this.apiPrams = {
      from: Math.round(startDate.getTime() / 1000),
      to: Math.round(today.getTime() / 1000),
    };
  }

  getTrendingTags = async () => {
    this.loadingTags = true;
    return getMockData(homePageMockData.trendingTags, 1000)
      .then((response: any) => {
        if (response.success) {
          this.trendingTags = this.trendingTags.slice().concat(response.data);
        }
      })
      .finally(() => (this.loadingTags = false));
  };

  getArticles = async (sorting: sortingTypes) => {
    this.loadingArcticles = true;
    // return getMockData(homePageMockData.articles, 4000)
    return getArticlesAPI(sorting, 10, this.publisherName)
      .then((response: any) => {
        if (response.success) {
          this.articles = response.data.map((article) => new Article(article));
        }
      })
      .finally(() => (this.loadingArcticles = false));
  };

  getPublisher = async () => {
    this.loadingPublisher = true;
    // return getMockData(publisherMockData.publisher, 2000)
    return getPublisherDataApi(this.publisherName)
      .then((response: any) => {
        if (response.success) {
          this.publisher = new Publisher(response.data, this.publisherName);
        }
      })
      .finally(() => (this.loadingPublisher = false));
  };

  getUsers = async () => {
    this.loadingUsers = true;
    // return getMockData(publisherMockData.users, 1500)
    return getTopUsersByPublisherAPI(this.publisherName, this.apiPrams.from, this.apiPrams.to, 0, 5)
      .then((response: any) => {
        if (response.success) {
          this.users = this.users.slice().concat(response.data);
        }
      })
      .finally(() => (this.loadingUsers = false));
  };

  changeSorting = (sorting: sortingTypes) => {
    this.sorting = sorting;
    this.articles = [];
    return this.getArticles(sorting);
  };

  reset = () => {
    this.loadingArcticles = false;
    this.loadingTags = false;
    this.loadingPublisher = false;
    this.loadingUsers = false;
    this.error = null;
    this.articles = [];
    this.users = [];
    this.sorting = 'most-commented';
    this.publisher = null;
    this.publisherName = '';
    this.trendingTags = [];
  };
}

decorate(PublisherStore, {
  loadingArcticles: observable,
  loadingTags: observable,
  loadingPublisher: observable,
  loadingUsers: observable,
  error: observable,
  trendingTags: observable,
  articles: observable,
  publisher: observable,
  sorting: observable,
  users: observable,

  getTrendingTags: action,
  getPublisher: action,
  getArticles: action,
  getUsers: action,
  changeSorting: action,
  reset: action,
});

export default new PublisherStore();
