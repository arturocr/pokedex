import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import humanizeString from "humanize-string";
import { Fragment, type SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomPagination from "../../components/BottomPagination";
import Layout from "../../components/Layout";
import PokemonsList from "../../components/PokemonsList";
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
      <Container>
        <Box
          mt={4}
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
        {loadingPokemons ? (
          <Stack alignItems="center" height="90vh" justifyContent="center">
            <CircularProgress size={50} />
          </Stack>
        ) : (
          <PokemonsList pokemons={pokemons} />
        )}
      </Container>
      <BottomPagination />
    </Layout>
  );
};

export default Home;
