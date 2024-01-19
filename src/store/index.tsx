import { create } from "zustand"

type State = {
  count: number
  increase: (n?: number) => void
  decrease: () => void
}

export const useStore = create<State>((set) => ({
  count: 0,
  increase: (n = 1) => set((state) => ({ count: state.count + n })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}))
