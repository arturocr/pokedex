import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid2,
  Skeleton,
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
          pokemons.map((pokemon) => (
            <Grid2
              key={pokemon.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            >
              <PokemonCard pokemon={pokemon} />
            </Grid2>
          ))
        )}
      </Grid2>
      <BottomPagination pagination={pagination} setPagination={setPagination} />
    </Layout>
  );
};

export default Home;
