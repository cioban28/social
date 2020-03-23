declare namespace Publisher {
  interface Publisher {
    host: string;
    postsNumber: number;
    recommnedsReceived: number;
    commentsOnArticles: number;
  }
  interface ServerPublisher {
    comments: number;
    posts: number;
    recommends: number;
    emotes: number;
  }
}
