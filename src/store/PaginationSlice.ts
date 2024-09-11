import type { StateCreator } from "zustand";
import type { AppStore, PaginationStore } from "./store.types";

export const createPaginationSlice: StateCreator<
  AppStore,
  [],
  [],
  PaginationStore
> = (set) => ({
  limit: 12,
  offset: 0,
  setLimit: (limit) => set({ limit }),
  setOffset: (offset) => set({ offset }),
});
