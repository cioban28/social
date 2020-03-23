import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const makeRequest = (
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  url: string,
  requireAuth: boolean = false,
  contentType: string | undefined,
  data: Object = {}
): Promise<AxiosResponse<any>> => {
  const req = {
    method,
    url: `${process.env.API_URL}${url}`,
    headers: Object.assign(
      { 'Content-Type': contentType },
      requireAuth ? { Authorization: `Bearer ${Cookies.get(process.env.SESSION_COOKIE_NAME || 'token')}` } : {}
    ),
  };

  Object.assign(req, method === 'GET' ? { params: data } : { data });

  return axios(req).then((resp) => resp.data);
};

export default {
  makeRequest,
};
