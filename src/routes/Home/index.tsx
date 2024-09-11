import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid2,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import humanizeString from "humanize-string";
import { Fragment, type SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import type {
  GetAllPokemonsNamesQuery,
  GetPokemonsQuery,
  GetPokemonsQueryVariables,
  Pokemon_V2_Pokemon,
} from "../../generated/graphql";
import { GET_ALL_POKEMON_NAMES, GET_POKEMONS } from "../../graphql/queries";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
  }>({
    limit: 12,
    offset: 0,
  });
  const [pokemons, setPokemons] = useState<Pokemon_V2_Pokemon[]>([]);
  const navigate = useNavigate();

  const { loading: loadingAllPokemons } = useQuery<GetAllPokemonsNamesQuery>(
    GET_ALL_POKEMON_NAMES,
    {
      onCompleted: (data) => {
        setOptions(
          data.pokemon_v2_pokemon.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
          })),
        );
      },
    },
  );

  const { loading: loadingPokemons } = useQuery<
    GetPokemonsQuery,
    GetPokemonsQueryVariables
  >(GET_POKEMONS, {
    variables: {
      ...pagination,
    },
    onCompleted: (data) => {
      setPokemons(data.pokemon_v2_pokemon as Pokemon_V2_Pokemon[]);
    },
  });

  const handlePokemonSelection = (
    _: SyntheticEvent,
    value: { id: number; name: string } | null,
  ) => {
    if (value?.id) {
      navigate(`/pokemon/${value.id}`);
    }
  };

  return (
    <Layout>
      <Box m={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Autocomplete
            sx={{
              width: 300,
              "& .MuiAutocomplete-input": {
                textTransform: "capitalize",
              },
            }}
            slotProps={{
              popper: { style: { textTransform: "capitalize" } },
            }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={handlePokemonSelection}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => humanizeString(option.name)}
            options={options}
            loading={loadingAllPokemons}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loadingAllPokemons ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Grid2 container spacing={4} m={4} pb={10}>
        {loadingPokemons ? (
          <>
            {Array.from({ length: pagination.limit }).map((_) => (
              <Grid2
                key={undefined}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              >
                <Skeleton variant="rectangular" height={390} />
              </Grid2>
            ))}
          </>
        ) : (
          <>
            {pokemons.map((pokemon) => (
              <Grid2
                key={pokemon.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              >
                <Card elevation={3}>
                  <CardActionArea
                    component={Link}
                    to={`/pokemon/${pokemon.id}`}
                  >
                    <CardMedia
                      component="img"
                      image={
                        pokemon.pokemon_v2_pokemonsprites[0].sprites.other[
                          "official-artwork"
                        ].front_default
                      }
                      alt={humanizeString(pokemon.name)}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        textTransform="capitalize"
                      >
                        {humanizeString(pokemon.name)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
            ))}
          </>
        )}
      </Grid2>
      <Stack
        bgcolor={"#FFFFFFCC"}
        boxShadow={5}
        direction="row"
        gap={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
        p={2}
      >
        <Button
          variant="contained"
          color="secondary"
          disabled={pagination.offset === 0}
          size="large"
          onClick={() => {
            setPagination({
              ...pagination,
              offset: pagination.offset - pagination.limit,
            });
          }}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {
            setPagination({
              ...pagination,
              offset: pagination.offset + pagination.limit,
            });
          }}
        >
          Next
        </Button>
      </Stack>
    </Layout>
  );
};

export default Home;
