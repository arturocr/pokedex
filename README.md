# Pokedex

A simple project that emulates a Pokedex.


## Tech Stack

- [Vite](https://vitejs.dev/) build tool that aims to provide a faster and leaner development experience for modern web projects.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh during development time. Fast. React.
- [Biome](https://biomejs.dev/): A fast formatter and linter (replacing both ESLint and Prettier) written in rust.
- [Typescript](https://www.typescriptlang.org/) is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Material UI](https://mui.com/material-ui) a component library for React based on Material Design.
- [React Router](https://reactrouter.com/en/main) for router handling.
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) super simple state management for React.
- [Apollo Client](https://www.apollographql.com/docs/react/get-started/) a GraphQL client to interact with PokeAPI.
- [PokéAPI GraphQL](https://pokeapi.co/docs/graphql) a free Pokémon API with support for GraphQL and that acts as the backend.
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen) a tool that helps infering types from the API, so everything is correctly typed.

### Commands

- `dev`, `build`, `preview` as provided by Vite
- `codegen`: to automatically generate API types
- `format`: formats the project using Biome's formatter
- `lint`: lints the project using Biome's linter
- `upg`: helps upgrading dependencies

## Usage

1. Clone to your machine:
  `git clone git@github.com:arturocr/pokedex.git`
2. Install dependencies through `pnpm install`.
3. Copy `.env.template` as `.env` and update it with the GraphQL API url
4. You are good to go. Start the project with `pnpm dev` and you will see the application home screen.
