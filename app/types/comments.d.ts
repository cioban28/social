/**
 * @description Common used types/interfaces for 'User' (profile)
 */

declare namespace Comments {
  interface ServerComment {
    id: number;
    state: number;
    authorType: number;
    parentId: number;
    commentText: string;
    createdTimestamp: Date;
    toxicity: number;
    spamValue: number;
    topComment: boolean;
    reportSpamCount: number;
    likeCount: number;
    replyCount: number;
    cookieId: string;
    userId: string;
    name: string;
    pictureUrl: string;
    host: string;
    uri: string;
    title: string;
    articleAvatar: string;
    commentCount?: number;
  }

  interface Comment {
    id: number;
    articleAvatar: string;
    title: string;
    comments: number;
    host: string;
    uri: string;
    createdTimestamp: Date;
    commentText: string;
    timeago: string;
  }
}
