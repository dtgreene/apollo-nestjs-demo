import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { v4 as uuid } from 'uuid';
import { GqlContext } from './gql-context.interface';
import { CONTEXT } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

const Headers = {
  IDENT: 'x-identifier',
  JWT: 'x-user-oktajwt',
  REQUEST_ID: 'x-request-id',
};

export class GqlDataSource extends RESTDataSource {
  @Inject(CONTEXT)
  public readonly context: GqlContext;

  protected willSendRequest(_path: string, options: AugmentedRequest) {
    const requestId = this.readHeader(Headers.REQUEST_ID) ?? uuid();
    const ident = this.readHeader(Headers.IDENT) ?? 'unknown';

    // request.timeout = 55_000
    options.headers[Headers.REQUEST_ID] = requestId;
    options.headers[Headers.IDENT] = `gravemind-apollo/${ident}`;

    if (this.context.token) {
      options.headers[Headers.JWT] = this.context.token;
    }
  }

  private readHeader(key: string) {
    const { headers } = this.context.req;
    const value = headers[key];
    return Array.isArray(value) ? value[0] : value;
  }

  // override caching for now
  protected cacheOptionsFor() {
    return { ttl: 0 };
  }
}
