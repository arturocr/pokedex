import { useQuery } from "@apollo/client";
import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import humanizeString from "humanize-string";
import { type ReactElement, forwardRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Layout from "../../components/Layout";
import type {
  GetPokemonsByIdsQuery,
  GetPokemonsByIdsQueryVariables,
  Pokemon_V2_Pokemon,
} from "../../generated/graphql";
import { GET_POKEMONS_BY_IDS } from "../../graphql/queries";
import { useTitle } from "../../hooks/useTitle";
import { useAppStore } from "../../store";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Pokemon = () => {
  const { catchIt, pokemons, releaseIt } = useAppStore((state) => ({
    catchIt: state.catchIt,
    pokemons: state.pokemons,
    releaseIt: state.releaseIt,
  }));
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon_V2_Pokemon>();
  useTitle(`Pokémon${pokemon ? ` - ${humanizeString(pokemon.name)}` : ""}`);
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const fromMine = Boolean(searchParams.get("fromMine"));

  const { loading, called, error } = useQuery<
    GetPokemonsByIdsQuery,
    GetPokemonsByIdsQueryVariables
  >(GET_POKEMONS_BY_IDS, {
    variables: {
      ids: [Number.parseInt(id ?? "0", 10)],
    },
    onCompleted: (data) => {
      setPokemon(data.pokemon_v2_pokemon[0] as Pokemon_V2_Pokemon);
    },
  });

  const actionHandler = () => {
    if (pokemons.includes(pokemon?.id ?? 0)) {
      handleConfirmationOpen();
    } else {
      catchIt(pokemon?.id ?? 0);
    }
  };

  const handleConfirmationOpen = () => {
    setConfirmationModalOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationModalOpen(false);
  };

  const handleRelease = () => {
    releaseIt(pokemon?.id ?? 0);
    setConfirmationModalOpen(false);
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
          to={fromMine ? "/mine" : "/"}
          color="secondary"
          variant="contained"
          sx={{ mt: 2 }}
        >
          <ChevronLeft />{" "}
          {fromMine ? "Go back to my Pokémons" : "Go back to Home"}
        </Button>
        {pokemon ? (
          <Card elevation={3} sx={{ mt: 2 }}>
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
                    {pokemon.pokemon_v2_pokemontypes.map((type) => (
                      <Chip
                        key={type.id}
                        component="span"
                        color="info"
                        label={humanizeString(`${type.pokemon_v2_type?.name}`)}
                        variant="outlined"
                        sx={{ mr: 1, textTransform: "capitalize" }}
                      />
                    ))}
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
      <Dialog
        open={confirmationModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleConfirmationClose}
        aria-describedby="confirmation-dialog"
      >
        <DialogTitle>{"Do you want to release this Pokémon?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog">
            You are about to release this precious Pokémon. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleConfirmationClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleRelease}>
            Release
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Pokemon;
