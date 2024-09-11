import { gql } from "@apollo/client";

export const GET_POKEMON_TYPES = gql(`
  query GetPokemonTypes {
    pokemon_v2_type {
      name
      id
    }
  }
`);

export const GET_POKEMONS = gql(`
  query GetPokemons($limit: Int = 10, $offset: Int = 0) {
    pokemon_v2_pokemon(
      limit: $limit,
      offset: $offset
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`);
