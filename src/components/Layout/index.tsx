import type { PropsWithChildren } from "react";
import { AppBar, Tab, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

type LinkTabProps = {
  label: string;
  to: string;
};

const LinkTab = (props: LinkTabProps) => {
  return <Tab component={Link} {...props} />;
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <LinkTab label="Home" to="/" />
          <LinkTab label="My Pokémon" to="/mine" />
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
