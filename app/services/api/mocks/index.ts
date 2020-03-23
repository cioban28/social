import MockAdapter from './MockAdapter';

const usersMock = [
  { name: 'Ross Ugryniuk', points: 4300, avatar: null, comments: 3411 },
  { name: 'Someone Else', points: 4251, avatar: null, comments: 3012 },
  { name: 'Bishop', points: 3854, avatar: null, comments: 2756 },
  { name: 'Larry Bi', points: 3754, avatar: null, comments: 2871 },
  { name: 'Mister H', points: 3631, avatar: null, comments: 2123 },
  { name: 'Dobby Begins', points: 3541, avatar: null, comments: 1823 },
  { name: 'Larra Croft', points: 2513, avatar: null, comments: 1745 },
  { name: 'John Smith', points: 1765, avatar: null, comments: 1543 },
  { name: 'Вася Пупкін', points: 1451, avatar: null, comments: 900 },
  { name: 'Reporter Here', points: 963, avatar: null, comments: 711 },
];

const publishersMock = [
  { name: 'nbc-2.com', comments: 70 },
  { name: 'express.com', comments: 80 },
  { name: 'name.com', comments: 80 },
  { name: 'blog.vuukle.com', comments: 80 },
  { name: 'vuukle.com', comments: 80 },
  { name: 'lfg.co', comments: 10 },
  { name: 'test.vuukle.com', comments: 8 },
  { name: 'news.vuukle.com', comments: 5 },
  { name: 'novy.tv', comments: 2 },
  { name: 'hello.com', comments: 12 },
];

/***
 * GET comments by user mock
 */
MockAdapter.onGet(`${process.env.API_URL}/api/v1/Comments/getCommentFeedByUser`).reply(
  () =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve([
            200,
            {
              success: true,
              data: [
                {
                  id: 123,
                  articleAvatar: null,
                  commentCount: 123,
                  title: 'Lorem Ipsum',
                  host: 'vuukle.com',
                  uri: '/',
                  createdTimestamp: 1525253933,
                  commentText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
                },
                {
                  id: 124,
                  articleAvatar: null,
                  commentCount: 13,
                  title: 'Lorem Ipsum',
                  host: 'vuukle.com',
                  uri: '/',
                  createdTimestamp: 1525253733,
                  commentText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
                },
                {
                  id: 125,
                  articleAvatar: null,
                  commentCount: 41,
                  title: 'Lorem Ipsum',
                  host: 'vuukle.com',
                  uri: '/',
                  createdTimestamp: 1525253833,
                  commentText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
                },
                {
                  id: 126,
                  articleAvatar: null,
                  commentCount: 72,
                  title: 'Lorem Ipsum',
                  host: 'blog.vuukle.com',
                  uri: '/',
                  createdTimestamp: 1525253900,
                  commentText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
                },
                {
                  id: 127,
                  articleAvatar: null,
                  commentCount: 72,
                  title: 'Lorem Ipsum',
                  host: 'blog.vuukle.com',
                  uri: '/',
                  createdTimestamp: 1525253901,
                  commentText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
                },
              ],
            },
          ]),
        2000
      );
    })
);

/**
 * GET top users by points
 */
MockAdapter.onGet(`${process.env.API_URL}/api/v1/Points/top`).reply(
  () =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve([
            200,
            {
              success: true,
              data: usersMock,
            },
          ]),
        2000
      );
    })
);

/**
 * GET top users by points
 */
MockAdapter.onGet(`${process.env.API_URL}/api/v1/Comments/top`).reply(
  () =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve([
            200,
            {
              success: true,
              data: usersMock,
            },
          ]),
        2000
      );
    })
);

/**
 * Mock user recommends
 */
MockAdapter.onGet(`${process.env.API_URL}/api/v1/Users/recommends`).reply(200, {
  success: true,
  data: [
    {
      id: 1,
      title: 'What is Lorem Ipsum?',
      url: '#',
      comments: 11,
      avatar: null,
    },
    {
      id: 2,
      title: `The lazy man's guide to sport`,
      url: '#',
      comments: 37,
      avatar: null,
    },
    {
      id: 3,
      title: 'Snowboard iphone apps',
      url: '#',
      comments: 213,
      avatar: null,
    },
    {
      id: 4,
      title: '7 amazing car hacks',
      url: '#',
      comments: 13,
      avatar: null,
    },
    {
      id: 5,
      title: 'What is Lorem Ipsum????',
      url: '#',
      comments: 79,
      avatar: null,
    },
  ],
});

/**
 * Mock users search
 */
MockAdapter.onGet(`${process.env.API_URL}/api/v1/users/search`).reply(200, {
  success: true,
  data: usersMock,
});

/**
 * Mock publishers search
 */
MockAdapter.onGet(`${process.env.API_URL}/api/v1/publishers/search`).reply(200, {
  success: true,
  data: publishersMock,
});
