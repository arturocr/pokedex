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
  query GetPokemons($limit: Int = 12, $offset: Int = 0) {
    pokemon_v2_pokemon(
      limit: $limit,
      offset: $offset
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        id
        pokemon_v2_type {
          name
        }
      }
    }
  }
`);

export const GET_POKEMONS_BY_IDS = gql(`
  query GetPokemonsByIds($limit: Int = 12, $offset: Int = 0, $ids: [Int!]!) {
    pokemon_v2_pokemon(
      limit: $limit,
      offset: $offset,
      where: {id: {_in: $ids}}
    ) {
      id
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          id
          name
        }
      }
      pokemon_v2_pokemontypes {
        id
        pokemon_v2_type {
          name
        }
      }
    }
  }
`);
