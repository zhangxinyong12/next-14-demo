import { useStore } from "@/store"

const Delete = () => {
  const decrease = useStore((state) => state.decrease)
  return (
    <div>
      <h1>Delete</h1>
      <button
        onClick={decrease}
        className="border bg-gray-300 px-10 py-2 hover:bg-gray-500"
      >
        -
      </button>
    </div>
  )
}
export default Delete
