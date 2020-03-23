/**
 * Comments by profile
 */
import { observable, action, decorate } from 'mobx';
import { getCommentFeedByUserByStatus, removeCommentByUser } from 'services/api';
import Comment from './models/Comment';
import PublicProfile from './PublicProfile';

export class CommentsStore {
  loading: boolean = false;
  errorLoading: boolean | string = false;
  loadMoreAvailable: boolean = true;
  status: '0' | '1' | '2' = '0';
  items = observable<Comment>([]);
  latestComments: Comment[] = [];
  latestCommentsLoading: boolean = false;

  /**
   * @name getLatestComments
   * Get latest comments for side widget
   * @returns {Promise<void>}
   */
  public getLatestComments = () => {
    this.latestComments = [];
    this.latestCommentsLoading = true;

    const userId = PublicProfile.id;

    if (!userId) {
      this.errorLoading = 'wrong_id';
      this.loading = false;
      return;
    }

    getCommentFeedByUserByStatus('0', userId)
      .then((response) => {
        if (response.success) {
          this.latestComments = this.formatCommentsResponse(response.data);
        } else {
          throw new Error('Wrong response');
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          // tslint:disable-next-line
          console.log('getLatestComments error:', err);
        }
        this.latestComments = [];
      })
      .finally(() => (this.latestCommentsLoading = false));
  };

  /**
   * Get user comments
   * @param {boolean} loadMore - determines if we want to load more comments or load from 0
   */
  public getComments = async (loadMore: boolean = false) => {
    this.loading = true;
    this.errorLoading = false;
    if (!loadMore) {
      this.items = observable<Comment>([]);
    }

    /** First check if user id exists in PublicProfile store */
    const userId = PublicProfile.id;

    if (!userId) {
      this.errorLoading = 'wrong_id';
      this.loading = false;
      return;
    }

    getCommentFeedByUserByStatus(this.status, userId, loadMore ? this.items.length : 0)
      .then((response) => {
        if (response.success) {
          this.loadMoreAvailable = response.data.items.length >= 5;
          this.items = !loadMore
            ? this.formatCommentsResponse(response.data)
            : /** Add to comments to existing one. We can't use 'push' (read MobX docs) */
              this.items.slice().concat(this.formatCommentsResponse(response.data));
        } else {
          throw new Error('Wrong response');
        }
      })
      .catch((err) => {
        this.errorLoading = err.message;
      })
      .finally(() => (this.loading = false));
  };

  /**
   * Change comments status and get updated comments by it's status
   */
  public changeStatus = (status: '0' | '1' | '2' = '0') => {
    this.status = status;
    this.getComments();
  };

  /**
   * Clear state if user navigated to another route, we need this to prevent showing of same data for another user page
   */
  public clearState = () => {
    this.status = '0';
    this.items = observable<Comment>([]);
    this.latestComments = [];
    this.loading = false;
    this.latestCommentsLoading = false;
    this.errorLoading = false;
  };

  /**
   * @name removeComment
   * Remove comment item from array
   * @param {object} comment
   */
  public removeComment = (comment: Comment) => {
    if (!comment) {
      return;
    }

    comment.loading = true;
    setTimeout(() => this.items.remove(comment), 5000);

    return removeCommentByUser(comment.data.id)
      .then((data: any) => {
        if (data.success) {
          this.items.remove(comment);
          return true;
        }
        return false;
      })
      .catch((err) => {
        if (process.env.NODE_ENV) {
          // tslint:disable-next-line
          console.log('removeCommentByUser API error: ', err.message);
        }
        return false;
      });
  };

  /**
   * Format comments from response
   * @param {object} response
   */
  private formatCommentsResponse = (response) => {
    if (!response.articles || !response.items) {
      return [];
    }

    return response.items.map((commentItem) => {
      if (response.articles[commentItem.articleId]) {
        commentItem.commentCount = response.articles[commentItem.articleId].commentCount;
      } else {
        commentItem.commentCount = 1;
      }

      return new Comment(commentItem);
    });
  };
}

decorate(CommentsStore, {
  loading: observable,
  errorLoading: observable,
  status: observable,
  items: observable,
  latestComments: observable,
  latestCommentsLoading: observable,
  getComments: action,
  getLatestComments: action,
  changeStatus: action,
  clearState: action,
  removeComment: action,
});

export default new CommentsStore();
