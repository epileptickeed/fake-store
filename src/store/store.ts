import { create } from "zustand";

type CounterStore = {
  count: number;
  setCount: (value: number) => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  setCount: (value) => {
    set((state) => ({ count: (state.count = value) }));
  },
}));
