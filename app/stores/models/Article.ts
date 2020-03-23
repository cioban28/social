import { observable, decorate } from 'mobx';
import { timeago, countReactions } from 'utils';

export class Article {
  loading: boolean = false;
  error: string = null;
  data: Articles.Article;

  constructor(articleItem: Articles.ServerArticle) {
    this.data = {
      title: articleItem.title,
      url: `//www.${articleItem.host}${articleItem.uri}`,
      image: decodeURIComponent(articleItem.articleAvatar),
      publisher: articleItem.host,
      timeago: timeago(articleItem.createdTimestamp, true),
      recommends: articleItem.recommendCount,
      shares: articleItem.likeCount,
      comments: articleItem.commentCount,
      reactions: countReactions(articleItem.emotes),
    };
  }
}

decorate(Article, {
  loading: observable,
  error: observable,
  data: observable,
});

export default Article;
