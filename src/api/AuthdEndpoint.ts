import type { RestGenerics } from '@rest-hooks/rest';
import { RestEndpoint } from '@rest-hooks/rest';
import { getUser } from '../authConfig';

export default class AuthdEndpoint<
  O extends RestGenerics = { path: '' }
> extends RestEndpoint<O> {
  getHeaders(headers: HeadersInit) {
    const newHeaders: HeadersInit & { Authorization?: string } = {
      ...headers
    };

    const accessToken = getUser()?.access_token;

    if (accessToken) newHeaders.Authorization = `Bearer ${accessToken}`;

    return newHeaders;
  }
}
