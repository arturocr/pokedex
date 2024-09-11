import { gql } from "@apollo/client";

export const GET_POKEMON_TYPES = gql(`
  query GetPokemonTypes {
    pokemon_v2_type {
      name
      id
    }
  }
`);
