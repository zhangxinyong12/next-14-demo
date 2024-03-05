import About from "@/components/About"
import HomeForm from "@/components/HomeForm"
import StreamList from "@/components/StreamList"
import Cat from "@/components/Cat"
import { initDB } from "../../lib/dataBase"

export default async function Home() {
  await initDB()

  return (
    <main>
      {/* <HomeForm></HomeForm> */}
      <StreamList></StreamList>
      <h2>Zustand 状态管理</h2>
      <div>
        <About />
        <About />
      </div>

      <div>
        <h3>cat CRUD</h3>
        <Cat></Cat>
      </div>
    </main>
  )
}
