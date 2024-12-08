import { create } from "zustand";

type FitlerState = {
  filter: string;
  setFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
};

export const useFilterStore = create<FitlerState>((set) => ({
  filter: "Все",
  setFilter: (value) => {
    set((state) => ({ filter: (state.filter = value) }));
  },
  search: "",
  setSearch: (value: string) => {
    set((state) => ({ search: (state.search = value) }));
  },
  page: 1,
  setPage: (value: number) => {
    set((state) => ({ page: (state.page = value) }));
  },
}));
