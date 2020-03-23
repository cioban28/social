import { observable, decorate } from 'mobx';

export class Publisher {
  loading: boolean = false;
  error?: string = null;
  data: Publisher.Publisher;

  constructor(publisher: Publisher.ServerPublisher, host: string) {
    this.data = {
      host: host,
      postsNumber: publisher.posts,
      recommnedsReceived: publisher.recommends,
      commentsOnArticles: publisher.comments,
    };
  }
}

decorate(Publisher, {
  loading: observable,
  error: observable,
  data: observable,
});

export default Publisher;
