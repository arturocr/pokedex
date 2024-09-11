import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import humanizeString from "humanize-string";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import type {
  GetPokemonByIdQuery,
  GetPokemonByIdQueryVariables,
  Pokemon_V2_Pokemon,
} from "../../generated/graphql";
import { GET_POKEMON_BY_ID } from "../../graphql/queries";
import { useTitle } from "../../hooks/useTitle";

const Pokemon = () => {
  useTitle("Pokémon");
  const [pokemon, setPokemon] = useState<Pokemon_V2_Pokemon>();
  const { id } = useParams<{ id: string }>();
  const { loading, called, error } = useQuery<
    GetPokemonByIdQuery,
    GetPokemonByIdQueryVariables
  >(GET_POKEMON_BY_ID, {
    variables: {
      id: Number.parseInt(id ?? "0", 10),
    },
    onCompleted: (data) => {
      setPokemon(data.pokemon_v2_pokemon[0] as Pokemon_V2_Pokemon);
    },
  });

  if (loading) {
    return (
      <Layout>
        <Stack alignItems="center" height="90vh" justifyContent="center">
          <CircularProgress size={50} />
        </Stack>
      </Layout>
    );
  }

  if (called && !pokemon) {
    return (
      <Layout>
        <Stack alignItems="center" height="90vh" justifyContent="center">
          <Typography color="error" variant="h4">
            Sorry, Pokémon not found
          </Typography>
        </Stack>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Stack alignItems="center" height="90vh" justifyContent="center">
          <Typography color="error" variant="h4">
            Error: {error.message}
          </Typography>
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box m={4}>
        <Typography textTransform="capitalize" variant="h4">
          {humanizeString(pokemon?.name ?? "")}
        </Typography>
        <pre>{JSON.stringify(pokemon, null, 2)}</pre>
      </Box>
    </Layout>
  );
};

export default Pokemon;
