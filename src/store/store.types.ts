export type PaginationStore = {
  limit: number;
  offset: number;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
};

export type PokedexStore = {
  pokemons: number[];
  catchIt: (id: number) => void;
  releaseIt: (id: number) => void;
};

export type AppStore = PaginationStore & PokedexStore;
