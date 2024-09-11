import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import humanizeString from "humanize-string";
import { Fragment, type SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomPagination from "../../components/BottomPagination";
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";
import type {
  GetAllPokemonsNamesQuery,
  GetPokemonsQuery,
  GetPokemonsQueryVariables,
  Pokemon_V2_Pokemon,
} from "../../generated/graphql";
import { GET_ALL_POKEMON_NAMES, GET_POKEMONS } from "../../graphql/queries";
import { useAppStore } from "../../store";

const Home = () => {
  const { limit, offset } = useAppStore((state) => ({
    limit: state.limit,
    offset: state.offset,
  }));
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
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
      limit,
      offset,
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
                label="Search a Pokémon"
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
      {loadingPokemons ? (
        <Stack alignItems="center" height="90vh" justifyContent="center">
          <CircularProgress size={50} />
        </Stack>
      ) : (
        <Grid2 container spacing={4} m={4} pb={10}>
          {pokemons.map((pokemon) => (
            <Grid2
              key={pokemon.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            >
              <PokemonCard pokemon={pokemon} />
            </Grid2>
          ))}
        </Grid2>
      )}
      <BottomPagination />
    </Layout>
  );
};

export default Home;
