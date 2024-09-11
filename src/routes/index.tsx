import type { RouteObject } from "react-router-dom";
import Home from "./Home";
import Pokemon from "./Pokemon";
import Mine from "./Mine";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pokemon/:id",
    element: <Pokemon />,
  },
  {
    path: "/mine",
    element: <Mine />,
  },
];

export default routes;
