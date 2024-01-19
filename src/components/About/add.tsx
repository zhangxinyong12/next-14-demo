import { useStore } from "@/store"

const Add = () => {
  const { increase } = useStore()
  return (
    <div>
      <h1>Add</h1>
      <button
        onClick={increase}
        className="border bg-gray-300 px-10 py-2 hover:bg-gray-500 rounded"
      >
        +
      </button>
    </div>
  )
}
export default Add
