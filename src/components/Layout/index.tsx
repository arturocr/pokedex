import { AppBar, Toolbar, Tooltip, useTheme } from "@mui/material";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { HomeRounded } from "@mui/icons-material";
import Pokeball from "../Icons/Pokeball";
import PokemonLogo from "../Icons/PokemonLogo";

const Layout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Home">
            <Link to="/">
              <HomeRounded
                fontSize="large"
                sx={{ color: theme.palette.common.white }}
              />
            </Link>
          </Tooltip>
          <Link to="/">
            <PokemonLogo />
          </Link>
          <Tooltip title="My Pokémon">
            <Link to="/mine" color={theme.palette.common.white}>
              <Pokeball />
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
    </>
  );
};

export default Layout;
