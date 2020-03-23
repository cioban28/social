import { observable, decorate } from 'mobx';
import { timeago } from 'utils';

export class Comment {
  loading: boolean = false;
  error: string = null;
  type: 'comment' | 'reply';
  data: Comments.Comment;

  constructor(commentItem: Comments.ServerComment) {
    this.data = {
      id: commentItem.id,
      articleAvatar: commentItem.articleAvatar,
      comments: commentItem.commentCount,
      title: commentItem.title,
      host: commentItem.host,
      uri: commentItem.uri,
      createdTimestamp: commentItem.createdTimestamp,
      timeago: timeago(commentItem.createdTimestamp, true),
      commentText: commentItem.commentText,
    };

    this.type = commentItem.parentId ? 'reply' : 'comment';
  }
}

decorate(Comment, {
  loading: observable,
  error: observable,
  data: observable,
  type: observable,
});

export default Comment;
