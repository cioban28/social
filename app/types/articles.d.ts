declare namespace Articles {
  interface Article {
    title: string;
    url: string;
    image: string;
    publisher: string;
    timeago: string;
    recommends: number;
    shares: number;
    comments: number;
    reactions: number;
  }

  interface ServerArticle {
    title: string;
    id: number;
    commentCount: number;
    recommendCount: number;
    likeCount: number;
    host: string;
    createdTimestamp: Date;
    uri: string;
    articleAvatar: string;
    emotes: number[];
  }
}
