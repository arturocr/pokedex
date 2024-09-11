import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import humanizeString from "humanize-string";
import { Link } from "react-router-dom";

import type { Pokemon_V2_Pokemon } from "../../generated/graphql";

type PokemonCardProps = {
  pokemon: Pokemon_V2_Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card elevation={3}>
      <CardActionArea component={Link} to={`/pokemon/${pokemon.id}`}>
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
  );
};

export default PokemonCard;
