import { Injectable, Scope } from '@nestjs/common';
import { GqlDataSource } from 'src/graphql/gql-data-source.class';

@Injectable({ scope: Scope.REQUEST })
export class PokemonAPI extends GqlDataSource {
  baseURL = 'https://pokeapi.co';

  async getPokemon() {
    const { results } = await this.get('/api/v2/pokemon');

    return results;
  }
}
