import { Injectable } from '@nestjs/common';
import { GqlDataSource } from 'src/graphql/gql-data-source.class';
import { PokemonAPI } from 'src/pokemon/pokemon.api';

@Injectable()
export class AnimalsAPI extends GqlDataSource {
  constructor(private readonly pokemon: PokemonAPI) {
    super();
  }

  getAnimals() {
    return [
      {
        name: 'dog',
      },
      {
        name: 'cat',
      },
      {
        name: 'moose',
      },
    ];
  }

  async getAnimalsAndPokemon() {
    const pokemon = await this.pokemon.getPokemon();

    return {
      animals: this.getAnimals(),
      pokemon,
    };
  }
}
