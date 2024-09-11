import { gql } from "@apollo/client";

export const GET_POKEMON_TYPES = gql(`
  query GetPokemonTypes {
    pokemon_v2_type {
      name
      id
    }
  }
`);

export const GET_ALL_POKEMON_NAMES = gql(`
  query GetAllPokemonsNames {
    pokemon_v2_pokemon {
      id
      name
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

export const GET_POKEMON_BY_ID = gql(`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon(
      where: {id: {_eq: $id}}
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`);
