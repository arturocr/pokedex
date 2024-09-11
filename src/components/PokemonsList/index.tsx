import { Grid2 } from "@mui/material";

import type { Pokemon_V2_Pokemon } from "../../generated/graphql";
import PokemonCard from "../PokemonCard";

type PokemonsListProps = {
  fromMine?: boolean;
  pokemons: Pokemon_V2_Pokemon[];
};

const PokemonsList = ({ fromMine = false, pokemons }: PokemonsListProps) => {
  return (
    <Grid2 container spacing={4} m={2} pb={10}>
      {pokemons.map((pokemon) => (
        <Grid2 key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <PokemonCard pokemon={pokemon} fromMine={fromMine} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PokemonsList;
