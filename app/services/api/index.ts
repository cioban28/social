import { makeRequest, generateHashForServer } from 'utils';
import { sortingTypes } from 'stores/Home';

/**
 * Mock data in development mode
 */
if (process.env.NODE_ENV === 'development') {
  // require('./mocks');
}

/**
 * @name loginAPI
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 */
export const loginAPI = (email: string, password: string) =>
  makeRequest('POST', `/api/v1/Auth`, false, 'application/json', {
    email,
    password,
  });

/**
 * @name signupAPI
 * Resgister user
 * @param {string} email
 * @param {string} name
 * @param {string} password
 * @param {'0'| '1' | '2'| '3' | '4' | '5' | '6' | ''} ageRange
 * @param {string} pictureUrl
 */
export const signupAPI = (
  email: string,
  name: string,
  password: string,
  ageRange: '0' | '1' | '2' | '3' | '4' | '5' | '6' | ''
) =>
  makeRequest('POST', `/api/v1/Auth/signupUser`, false, 'application/json', {
    email,
    name,
    password,
    ageRange,
    pictureUrl: '',
  });

export const changePasswordWithToken = (email: string, oldPassword: string, newPassword: string) =>
  makeRequest('POST', `/api/v1/Auth/changePassword`, true, 'application/json', {
    email,
    oldPassword,
    newPassword,
  });

/**
 * @name getPublicProfile
 * Get user public profile details for profile
 * @param {string} userId - user API key we want to get detaisl for
 */
export const getPublicProfile = (userId: string) =>
  makeRequest('GET', '/api/v1/Users/userPublicProfile', false, undefined, {
    userId,
  });

/**
 * @name getCommentFeedByUserByStatus
 * Get user comments list by status
 * @param {string} status - status of comments to get (rejected, approved, pending)
 * @param {string} apiKey - user's token to get details
 * @param {string} from - from count i.e. 0 - load from start
 * @param {string} to - to count i.e. 5 - load {from} to 5 items
 * @returns fetch promise
 */
export const getCommentFeedByUserByStatus = (
  status: '0' | '1' | '2' = '0',
  userId: string | number,
  start: number = 0
): Promise<any> =>
  makeRequest('GET', `/api/v1/Comments/getCommentFeedByUser`, true, undefined, {
    userId,
    state: status,
    start,
    pageSize: 10,
  });

/**
 * @name forgotPasswordAPI
 * If success will send email to use with link to reset password
 * @param {string} email - user email
 */
export const forgotPasswordAPI = (email: string) =>
  makeRequest('POST', '/api/v1/Auth/recoverPassword', false, 'application/json', {
    from: 'user',
    s: generateHashForServer(email).toString(),
    r: generateHashForServer(`${email}forgotPassword`).toString(),
    email,
  });

/**
 * @name recoverPasswordAPI
 * API used to recover using password by verificationKey received in email using `forgotPasswordAPI`
 * @param {string} email
 * @param {string} newPassword
 * @param {string} verificationKey
 */
export const recoverPasswordAPI = (email: string, newPassword: string, verificationKey: string) =>
  makeRequest('POST', '/api/v1/Auth/resetPasswordbyKey', false, 'application/json', {
    email,
    oldPassword: '',
    newPassword,
    passwordResetKey: verificationKey,
  });

/**
 * @name uploadUserAvatar
 * @param {FormData} formData
 * @returns {Promise<AxiosResponse<any>>}
 */
export const uploadUserAvatar = (formData: FormData) =>
  makeRequest('POST', '/api/v1/Users/uploadUserImage', true, 'multipart/form-data', formData);

/**
 * @name getUserDetailsAPI
 * API to get user profile
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserDetailsAPI = () => makeRequest('GET', '/api/v1/Users/userProfile', true, 'application/json');

/**
 * @name getUserRecommends
 * API to get recommends by user/profile
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserRecommends = (id: string | number) =>
  makeRequest('GET', '/api/v1/Users/recommends', false, 'application/json', {
    id,
  });

/**
 * @name getPublishersByKey
 * API to get publishers by search value
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPublishersByKey = (searchKeyword: string, pageSize: number = 10) => {
  const fromCount = 0;
  const toCount = fromCount + pageSize;
  return makeRequest('GET', '/api/v1/Publishers/searchPublisherByKeyword', false, 'application/json', {
    searchKeyword,
    fromCount,
    toCount,
  });
};

/**
 * @name getUsersByKey
 * API to get publishers by search value
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUsersByKey = (searchKeyword: string, pageSize: number = 10) => {
  const fromCount = 0;
  const toCount = fromCount + pageSize;
  return makeRequest('GET', '/api/v1/Users/searchUsersByKeyword', false, 'application/json', {
    searchKeyword,
    fromCount,
    toCount,
  });
};

/**
 * @name getArticlesByKey
 * API to get publishers by search value
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getArticlesByKey = (searchKeyword: string, pageSize: number = 10) => {
  const fromCount = 0;
  const toCount = fromCount + pageSize;
  return makeRequest('GET', '/api/v1/Articles/searchArticlesByKeyword', false, 'application/json', {
    searchKeyword,
    fromCount,
    toCount,
  });
};

/**
 * @name getCommentsByKey
 * API to get comments by search value
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getCommentsByKey = (searchKeyword: string, pageSize: number = 10) => {
  const fromCount = 0;
  const toCount = fromCount + pageSize;
  return makeRequest('GET', '/api/v1/Comments/searchCommentsByKeyword', false, 'application/json', {
    searchKeyword,
    fromCount,
    toCount,
  });
};

/**
 * @name removeCommentByUser
 * Remove comment by user
 * @param commentId
 */
export const removeCommentByUser = (commentId: number) =>
  makeRequest('POST', '/api/v1/Comments/removeCommentByUser', true, 'application/json', {
    commentIDs: [commentId],
    state: 2,
  });

/**
 * @name topUsersByPoints
 * Get top users by points
 * @param {number} start - from which index start
 * @param {number} pageSize - how many items to load
 */
export const getTopUsersByPoints = (start: number = 0, pageSize: number = 25) =>
  makeRequest('GET', '/api/v1/Users/topUsersByPoints', false, 'application/json', {
    start,
    pageSize,
  });

/**
 * @name getTopUsersByComments
 * get top users by comments with
 * @param {number} from
 * @param {number} to -
 */
export const getTopUsersByComments = (from: number, to: number) =>
  makeRequest('GET', '/api/v1/Users/getTopUsersByComments', false, 'application/json', {
    from,
    to,
  });

/**
 * @name updateProfile
 * Update user profile details
 * @param {string} name
 * @param {string} pictureUrl
 */
export const updateprofile = (name: string, pictureUrl: string) =>
  makeRequest('PUT', '/api/v1/Users/updateprofile', true, 'application/json', {
    name,
    pictureUrl,
  });

/**
 * @name getPublishersAPI
 * getting publishers list
 * @param {number} Filter
 * @param {number} count
 */
export const getPublishersAPI = (filter: number, fromCount: number, toCount: number) =>
  makeRequest('GET', '/api/v1/Publishers/getPublisherList', true, 'application/json', {
    filter,
    fromCount,
    toCount,
  }).then((response: any) => {
    if (response.success) {
      const formatedResponse = {
        data: [],
        success: true,
      };
      response.data.map((item) =>
        formatedResponse.data.push({
          name: item.Host,
          comments: item.Actions,
        })
      );
      return formatedResponse;
    }
    return response;
  });

/**
 * @name getTagsApi
 * getting trending tags
 * @param {number} from
 * @param {number} to
 */
export const getTagsApi = (from: number, to: number) =>
  makeRequest('GET', '/api/v1/CommentsBQ/getTopTags', true, 'application/json', {
    from,
    to,
  });

// Latest articles: /api/v1/Articles/getByFilterByPeriod - returns 500 error
// Most commented today: /api/v1/CommentsBQ/getTopArticles - empty need to add something to check
// Most recommended: /api/v1/RecommendRatingsBQ/getTopArticles - empty need to add something to check
// Latest comments: We don't have one yet

export const getArticlesAPI = (sorting: sortingTypes = 'most-commented', fromCount: number = 0, host?: string) => {
  let filters;

  const from = Math.floor(new Date().getTime() / 1000) - 60 * 60 * 24;
  const to = Math.floor(new Date().getTime() / 1000);
  const toCount = fromCount + 10;
  const filtersOpts = {
    'most-commented': '0',
    'most-recommended': '1',
    'latest-comments': '2',
  };

  filters = filtersOpts[sorting];
  if (filtersOpts[sorting] === '3') {
    alert('Latest Comments API is still absent. Latest Articles will be shown'); // TODO: update API whe it is ready
    filters = '2';
  }
  return makeRequest('GET', '/api/v1/Articles/getTodaysArticles', true, 'application/json', {
    filters,
    from,
    to,
    fromCount,
    toCount,
    host,
  });
};

export const getPublisherDataApi = (host: string) =>
  makeRequest('GET', '/api/v1/Publishers/getPublisherStatsSummary', true, 'application/json', {
    host,
  });

export const getTopUsersByPublisherAPI = (host: string, from: number, to: number, fromCount: number, toCount: number) =>
  makeRequest('GET', '/api/v1/Users/getTopUsersByPublisher', true, 'application/json', {
    host,
    fromCount,
    toCount,
    from,
    to,
  });

export const addRecommendAPI = (params: any) =>
  makeRequest('GET', '/api/v1/recommend_ratings/ratings', true, 'application/json', params);

export const deleteRecommendAPI = (params: any) =>
  makeRequest('DELETE', '/api/v1/recommend_ratings/ratings', true, 'application/json', params);

export default {
  signupAPI,
  loginAPI,
  changePasswordWithToken,
  getCommentFeedByUserByStatus,
  forgotPasswordAPI,
  recoverPasswordAPI,
  getUserRecommends,
  removeCommentByUser,
  getTopUsersByComments,
  getTopUsersByPoints,
  getPublishersAPI,
  getTagsApi,
  getPublisherDataApi,
  addRecommendAPI,
  deleteRecommendAPI,
};
