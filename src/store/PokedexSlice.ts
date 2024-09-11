import type { StateCreator } from "zustand";
import type { AppStore, PokedexStore } from "./store.types";

export const createPokedexSlice: StateCreator<
  AppStore,
  [],
  [],
  PokedexStore
> = (set) => ({
  pokemons: [],
  catchIt: (id) => set((state) => ({ pokemons: [...state.pokemons, id] })),
  releaseIt: (id) =>
    set((state) => ({ pokemons: state.pokemons.filter((p) => p !== id) })),
});
