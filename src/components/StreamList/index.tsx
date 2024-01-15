"use client"
import { useEffect, useState } from "react"

const StreamList = () => {
  const [content, setContent] = useState<string[]>([])

  async function fetchData() {
    setContent(() => [])
    console.log("fetchData")
    try {
      const response = await fetch("/api/stream", {
        // method: "POST",
      })
      if (!response.ok && !response?.body) {
        setContent(["Error fetching stream"])
        return
      }
      const reader = response.body!.getReader()

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = new TextDecoder().decode(value)
        console.log("chunk", chunk)
        // TODO
        setContent((oldContent) => {
          return [...oldContent, chunk]
        })
      }
    } catch (error) {
      console.error("Error fetching stream:", error)
      setContent(["Error fetching stream"])
    }
  }

  const [userId, setUserId] = useState("")

  useEffect(() => {
    fetchData()
  }, [userId])

  return (
    <div className="p-4">
      <h2>测试http 返回流</h2>
      <div>
        <button className="px-3 py-2 bg-gray-400 border" onClick={fetchData}>
          开始获取数据
        </button>
      </div>
      <div className="flex gap-1 flex-wrap mb-1">
        {content.map((item, index) => {
          return (
            <div key={index} className="mb-1 border-r px-4 py-2 ">
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StreamList
