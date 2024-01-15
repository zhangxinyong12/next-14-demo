"use client"
import { use, useEffect, useState } from "react"

const StreamList = () => {
  const [content, setContent] = useState<string[]>([])

  async function fetchData() {
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
      let result: string[] = []

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = new TextDecoder().decode(value)
        console.log("chunk", chunk)
        result.push(chunk)
        // TODO
        setContent(() => {
          return [...content, ...result]
        })
      }
    } catch (error) {
      console.error("Error fetching stream:", error)
      setContent(["Error fetching stream"])
    }
  }

  useEffect(() => {
    console.log("content", content)
  }, [content])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-4">
      <h2>测试http 返回流</h2>
      <div>
        {content.map((item, index) => {
          return (
            <div key={index} className="mb-1">
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StreamList
