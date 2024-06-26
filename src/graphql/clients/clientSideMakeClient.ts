import { from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import {
  createErrorLink,
  createSessionLink,
  httpLink,
  updateLink,
} from '../utils';

export const makeClient = () => {
  return new NextSSRApolloClient({
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),

    link: from([
      createSessionLink(),
      createErrorLink(),
      updateLink,
      ...(typeof window === 'undefined'
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ]
        : [httpLink]),
    ]),
  });
};
