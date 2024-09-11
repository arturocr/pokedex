import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import humanizeString from "humanize-string";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ChevronLeft } from "@mui/icons-material";
import Layout from "../../components/Layout";
import type {
  GetPokemonByIdQuery,
  GetPokemonByIdQueryVariables,
  Pokemon_V2_Pokemon,
} from "../../generated/graphql";
import { GET_POKEMON_BY_ID } from "../../graphql/queries";
import { useTitle } from "../../hooks/useTitle";
import { useAppStore } from "../../store";

const Pokemon = () => {
  const { catchIt, pokemons, releaseIt } = useAppStore((state) => ({
    catchIt: state.catchIt,
    pokemons: state.pokemons,
    releaseIt: state.releaseIt,
  }));
  const [pokemon, setPokemon] = useState<Pokemon_V2_Pokemon>();
  useTitle(`Pokémon${pokemon ? ` - ${humanizeString(pokemon.name)}` : ""}`);
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

  const actionHandler = () => {
    if (pokemons.includes(pokemon?.id ?? 0)) {
      releaseIt(pokemon?.id ?? 0);
    } else {
      catchIt(pokemon?.id ?? 0);
    }
  };

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
      <Container
        sx={{
          width: "auto",
        }}
      >
        <Button
          component={Link}
          to="/"
          color="secondary"
          variant="contained"
          sx={{ mt: 4 }}
        >
          <ChevronLeft /> Go to list
        </Button>
        {pokemon ? (
          <Card elevation={3} sx={{ m: 4 }}>
            <CardContent>
              <Grid2
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <CardMedia
                    component="img"
                    image={
                      pokemon?.pokemon_v2_pokemonsprites[0].sprites.other[
                        "official-artwork"
                      ].front_default
                    }
                    alt={humanizeString(pokemon?.name)}
                  />
                </Grid2>
                <Grid2
                  container
                  direction="column"
                  gap={2}
                  size={{ xs: 12, sm: 8 }}
                >
                  <Typography textTransform="capitalize" variant="h4">
                    {humanizeString(`${pokemon.name}`)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Height:</strong> {(pokemon.height ?? 0) / 10} m
                  </Typography>
                  <Typography variant="body1">
                    <strong>Weight:</strong> {(pokemon.weight ?? 0) / 10} kg
                  </Typography>
                  <Typography variant="body1">
                    <strong>Abilities:</strong>{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {pokemon.pokemon_v2_pokemonabilities
                        .map((ability) =>
                          humanizeString(`${ability.pokemon_v2_ability?.name}`),
                        )
                        .join(", ")}
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Types:</strong>{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {pokemon.pokemon_v2_pokemontypes
                        .map((type) =>
                          humanizeString(`${type.pokemon_v2_type?.name}`),
                        )
                        .join(", ")}
                    </span>
                  </Typography>
                  <Box>
                    <Button variant="contained" onClick={actionHandler}>
                      {pokemons.includes(pokemon.id)
                        ? "Release it!"
                        : "Catch it!"}
                    </Button>
                  </Box>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        ) : null}
      </Container>
    </Layout>
  );
};

export default Pokemon;
