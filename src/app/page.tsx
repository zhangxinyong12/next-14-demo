import About from "@/components/About"
import HomeForm from "@/components/HomeForm"
import StreamList from "@/components/StreamList"
import User from "@/components/User"

export default function Home() {
  return (
    <main>
      <span>检测到变化就会自动构建的吗？？？？</span>
      {/* <HomeForm></HomeForm> */}
      <StreamList></StreamList>
      <h2>Zustand 状态管理</h2>
      <div>
        <About />
        <About />
      </div>

      <div>
        <h3>user CRUD</h3>
        <User></User>
      </div>
    </main>
  )
}
