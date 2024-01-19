"use client"
import { useStore } from "@/store"
import Add from "./add"
import Delete from "./delete"

const About = () => {
  const count = useStore((state) => state.count)

  return (
    <div className="p-4">
      <div>当前count:{count}</div>
      <div className="flex gap-1 flex-wrap mb-1 ">
        <Add />
        <Delete />
      </div>
    </div>
  )
}

export default About
