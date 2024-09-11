import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import humanizeString from "humanize-string";
import { useState } from "react";

import Layout from "../../components/Layout";
import type {
  GetPokemonsQuery,
  GetPokemonsQueryVariables,
  Pokemon_V2_Pokemon,
} from "../../generated/graphql";
import { GET_POKEMONS } from "../../graphql/queries";

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon_V2_Pokemon[]>([]);

  const { loading: loadingPokemons } = useQuery<
    GetPokemonsQuery,
    GetPokemonsQueryVariables
  >(GET_POKEMONS, {
    variables: {
      limit: 20,
      offset: 0,
    },
    onCompleted: (data) => {
      setPokemons(data.pokemon_v2_pokemon as Pokemon_V2_Pokemon[]);
    },
  });

  if (loadingPokemons) {
    return (
      <Layout>
        <LinearProgress />
      </Layout>
    );
  }

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
          <TextField id="search-input" label="Search" variant="outlined" />
        </Box>
      </Box>
      <Grid2 container spacing={4} m={4}>
        {pokemons.map((pokemon) => (
          <Grid2 key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Card elevation={3}>
              <CardActionArea>
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
      </Grid2>
    </Layout>
  );
};

export default Home;
