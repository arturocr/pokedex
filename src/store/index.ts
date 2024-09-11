import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPaginationSlice } from "./PaginationSlice";
import { createPokedexSlice } from "./PokedexSlice";
import type { AppStore } from "./store.types";

export const useAppStore = create<AppStore>()(
  persist(
    (...params) => ({
      ...createPokedexSlice(...params),
      ...createPaginationSlice(...params),
    }),
    {
      name: "app-store",
    },
  ),
);
