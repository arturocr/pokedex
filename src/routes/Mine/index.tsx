import { useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import PokemonsList from "../../components/PokemonsList";
import type {
  GetPokemonsByIdsQuery,
  GetPokemonsByIdsQueryVariables,
  Pokemon_V2_Pokemon,
} from "../../generated/graphql";
import { GET_POKEMONS_BY_IDS } from "../../graphql/queries";
import { useTitle } from "../../hooks/useTitle";
import { useAppStore } from "../../store";

const Mine = () => {
  useTitle("Mine");
  const { pokemons } = useAppStore((state) => ({
    pokemons: state.pokemons,
  }));

  const { data, loading, called } = useQuery<
    GetPokemonsByIdsQuery,
    GetPokemonsByIdsQueryVariables
  >(GET_POKEMONS_BY_IDS, {
    variables: {
      ids: pokemons,
      limit: 2000,
    },
  });

  return (
    <Layout>
      <Container>
        <Box textAlign="center">
          <Typography my={3} variant="h4">
            My Pokémons
          </Typography>
        </Box>
        {loading ? (
          <Stack alignItems="center" height="90vh" justifyContent="center">
            <CircularProgress size={50} />
          </Stack>
        ) : data?.pokemon_v2_pokemon.length === 0 && called ? (
          <Typography textAlign="center" variant="h6">
            You don't have any Pokémon yet, go catch 'em all!
          </Typography>
        ) : (
          <PokemonsList
            fromMine
            pokemons={(data?.pokemon_v2_pokemon || []) as Pokemon_V2_Pokemon[]}
          />
        )}
      </Container>
    </Layout>
  );
};

export default Mine;
