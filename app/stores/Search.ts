/**
 * Store for 'Search' page which will store results for articles, publishers, users
 */
import { action, decorate, observable, reaction } from 'mobx';
import { getPublishersByKey, getUsersByKey, getArticlesByKey, getCommentsByKey } from 'services/api';
import { Article } from './models/Article';

class SearchCategory {
  loading: boolean = false;
  error: boolean = null;
  items: any[] = [];

  constructor(
    private request: (value: string) => Promise<any>,
    private pageSize: number,
    private handler: (value: any) => any = (arg) => arg
  ) {}

  /**
   * @name getResults
   * Call API to get search result
   * @param {string} searchValue
   * @param {boolean} loadMore
   */
  getResults(searchValue: string, loadMore: boolean) {
    this.loading = true;
    if (!loadMore) {
      this.items = [];
    }

    this.request(searchValue)
      .then((response) => {
        if (response.success) {
          if (loadMore) {
            this.items = this.items.slice().concat(response.data);
          } else {
            this.items = this.handler(response.data);
          }
        } else {
          throw new Error('Wrong response');
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          // tslint:disable-next-line
          console.log('Results get error:', err.message);
        }
        this.error = err.message;
      })
      .finally(() => (this.loading = false));
  }

  /**
   * @name clearState
   * Reset state to default
   */
  clearState = () => {
    this.loading = false;
    this.error = null;
    this.items = [];
  };

  /**
   * @name clearLoadedMore
   * Remove items loaded using load more
   */
  clearLoadedMore = () => {
    if (this.items.length > this.pageSize) {
      this.items.splice(this.pageSize);
    }
  };
}

decorate(SearchCategory, {
  loading: observable,
  error: observable,
  items: observable,
  getResults: action,
  clearState: action,
  clearLoadedMore: action,
});

export type tabType = 'users' | 'publishers' | 'articles' | 'comments';

export class SearchStore {
  /** Value we search for */
  searchValue: string = '';
  /** Active tab on search page */
  activeTab: tabType = 'articles';
  /** Publishers search state for tab */
  publishers = new SearchCategory(getPublishersByKey, 10);
  /** Users search state for tab */
  users = new SearchCategory(getUsersByKey, 10);
  /** Articles search state for tab */
  articles = new SearchCategory(getArticlesByKey, 10, (articles) => articles.map((item) => new Article(item)));
  /** Comments search state for tab */
  comments = new SearchCategory(getCommentsByKey, 10);

  constructor() {
    /**
     * Handles changes for searchValue which will reset state
     */
    reaction(
      () => this.searchValue,
      () => {
        /**
         * Once search value is changed reset main state, state of search categories
         * and get new results for active tab;
         */
        this.articles.clearState();
        this.publishers.clearState();
        this.users.clearState();

        if (!this.activeTab) {
          this.activeTab = 'articles';
        }

        this[this.activeTab].getResults(this.searchValue, false);
      }
    );

    /**
     * Handles changes for activeTab (tab change)
     * Here we should clear loaded items using loadMore and call API to get results if no items in list
     */
    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 'articles' && this.articles.items.length <= 0) {
          this.getArticlesResult(false);

          this.users.clearLoadedMore();
          this.publishers.clearLoadedMore();
        } else if (activeTab === 'users' && this.users.items.length <= 0) {
          this.getUsersResult(false);

          this.articles.clearLoadedMore();
          this.publishers.clearLoadedMore();
        } else if (activeTab === 'publishers' && this.publishers.items.length <= 0) {
          this.getPublishersResult(false);

          this.users.clearLoadedMore();
          this.articles.clearLoadedMore();
        } else if (activeTab === 'comments' && this.comments.items.length <= 0) {
          this.getCommentsResult(false);

          this.users.clearLoadedMore();
          this.articles.clearLoadedMore();
        }
      }
    );
  }

  getArticlesResult = (loadMore: boolean) => this.articles.getResults(this.searchValue, loadMore);
  getPublishersResult = (loadMore: boolean) => this.publishers.getResults(this.searchValue, loadMore);
  getUsersResult = (loadMore: boolean) => this.users.getResults(this.searchValue, loadMore);
  getCommentsResult = (loadMore: boolean) => this.comments.getResults(this.searchValue, loadMore);
}

decorate(SearchStore, {
  searchValue: observable,
  activeTab: observable,
  articles: observable,
  publishers: observable,
  users: observable,
  getArticlesResult: action,
  getPublishersResult: action,
  getUsersResult: action,
});

export default new SearchStore();
