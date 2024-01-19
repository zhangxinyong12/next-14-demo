# zustand
## 安装
```bash
yarn add zustand
```

## 简单使用

```tsx
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

```
``` tsx
function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```



## 切片
在zustand中，StateCreator类型接受四个泛型参数，分别是：
1. State：表示状态对象的类型。
2. Actions：表示操作状态的方法的类型。
3. Listeners：表示监听状态变化的方法的类型。
4. Slice：表示切片（slice）的类型。
``` tsx
import { create, StateCreator } from "zustand"

interface BearSlice {
  bears: number
  addBear: () => void
  eatFish: () => void
}

interface FishSlice {
  fishes: number
  addFish: () => void
}

interface SharedSlice {
  addBoth: () => void
  getBoth: () => void
}


const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})

const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const createSharedSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  addBoth: () => {
    // you can reuse previous methods
    get().addBear()
    get().addFish()
    // or do them from scratch
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
  },
  getBoth: () => get().bears + get().fishes,
})

const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
  ...createSharedSlice(...a),
}))
```