import type { RestGenerics } from '@rest-hooks/rest';
import { RestEndpoint } from '@rest-hooks/rest';

export default class AuthdEndpoint<
  O extends RestGenerics = { path: '' }
> extends RestEndpoint<O> {
  declare static accessToken?: string;

  getHeaders(headers: HeadersInit) {
    const newHeaders: HeadersInit & { Authorization?: string } = {
      ...headers
    };

    console.log('got token:', AuthdEndpoint.accessToken);

    if (AuthdEndpoint.accessToken)
      newHeaders.Authorization = `Bearer ${AuthdEndpoint.accessToken}`;

    return newHeaders;
  }
}
