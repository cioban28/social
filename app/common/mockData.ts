const homePageMockData = {
  articles: [
    {
      id: Math.floor(Math.random() * 10000),
      title: 'lorem ipsum is simply dummy text of the printing and typesetting industry',
      uri: 'www.article-url.com',
      host: 'domain.com',
      imageUrl: 'https://placeimg.com/640/480/any?t=1527624406112',
      publisher: 'domain.com',
      ts: new Date().getTime() / 1000 - 1000 * 60 * 60 * 2,
      recommends: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 100),
      commentsCount: Math.floor(Math.random() * 100),
      emotes: Math.floor(Math.random() * 50),
    },
    {
      id: Math.floor(Math.random() * 10000),
      title: 'lorem ipsum is simply dummy text of the printing and typesetting industry',
      uri: 'www.article-url.com',
      host: 'domain.com',
      imageUrl: 'https://placeimg.com/640/480/any?t=1527624406112',
      publisher: 'domain.com',
      ts: new Date().getTime() / 1000 - 1000 * 60 * 60 * 2,
      recommends: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 100),
      commentsCount: Math.floor(Math.random() * 100),
      emotes: Math.floor(Math.random() * 50),
    },
    {
      id: Math.floor(Math.random() * 10000),
      title: 'lorem ipsum is simply dummy text of the printing and typesetting industry',
      uri: 'www.article-url.com',
      host: 'domain.com',
      imageUrl: 'https://placeimg.com/640/480/any?t=1527624406112',
      publisher: 'domain.com',
      ts: new Date().getTime() / 1000 - 1000 * 60 * 60 * 2,
      recommends: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 100),
      commentsCount: Math.floor(Math.random() * 100),
      emotes: Math.floor(Math.random() * 50),
    },
  ],
  trendingTags: [
    { name: 'politics', comments: 245 },
    { name: 'snowboarding', comments: 163 },
    { name: 'football', comments: 123 },
    { name: 'basketball', comments: 99 },
    { name: 'games', comments: 43 },
    { name: 'yosemite', comments: 25 },
  ],
  publishers: [
    { name: 'nbc-2.com', comments: 70 },
    { name: 'express.com', comments: 80 },
    { name: 'name.com', comments: 80 },
    { name: 'blog.vuukle.com', comments: 80 },
    { name: 'vuukle.com', comments: 80 },
  ],
};

const publisherMockData = {
  publisher: {
    host: 'publisher2.com',
    postsNumber: 997,
    recommnedsReceived: 2500,
    commentsOnArticles: 299,
    coverImage: 'https://placeimg.com/282/100/any?t=1527624406112',
  },
  users: [
    {
      id: 1,
      name: 'Kate Smith',
      avatar: '',
      points: 123,
      commentsAmount: 12,
    },
    {
      id: 1,
      name: 'Kate Smith',
      avatar: '',
      points: 123,
      commentsAmount: 12,
    },
    {
      id: 1,
      name: 'Kate Smith',
      avatar: '',
      points: 123,
      commentsAmount: 12,
    },
    {
      id: 1,
      name: 'Kate Smith',
      avatar: '',
      points: 123,
      commentsAmount: 12,
    },
    {
      id: 1,
      name: 'Kate Smith',
      avatar: '',
      points: 123,
      commentsAmount: 12,
    },
  ],
};

const getMockData = (dataToReturn, delay: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: dataToReturn,
      });
      // tslint:disable-next-line
    }, delay);
  });

export { homePageMockData, getMockData, publisherMockData };
