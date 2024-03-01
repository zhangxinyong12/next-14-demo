"use client"

import { useEffect, useState } from "react"

export default function Cat() {
  const [list, setList] = useState<any[]>([])

  function getList() {
    fetch("/api/pets")
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res)
        setList(res)
      })
  }

  useEffect(() => {
    getList()
  }, [])

  function add() {
    const formData = new FormData()
    formData.append("name", "cat" + (list.length + 1))
    formData.append("owner", "cat" + (list.length + 1))
    fetch("/api/pets", {
      method: "POST",
      body: formData,
    }).then(() => {
      getList()
    })
  }

  function del(id: string) {
    fetch(`/api/pets?id=${id}`, {
      method: "DELETE",
    }).then(() => {
      getList()
    })
  }

  // 清空
  function clear() {
    fetch(`/api/pets`, {
      method: "DELETE",
    }).then(() => {
      getList()
    })
  }

  return (
    <div>
      <div>
        <div className="flex mb-2 items-center ">
          <h2 className="text-base">cat CRUD</h2>
          <button
            className="px-3 py-2 bg-gray-400 border rounded-sm"
            onClick={add}
          >
            添加
          </button>
          {/* 清空 */}
          <button
            className="px-3 py-2 bg-gray-400 border rounded-sm"
            onClick={clear}
          >
            清空
          </button>
        </div>
        <ul>
          {list.map((item, index) => {
            return (
              <li className="mb-1 border-r px-4 py-2 " key={item.id}>
                <div className="flex ">
                  <div className="mr-2">
                    <span className="font-bold">name: </span>
                    {item.name}
                  </div>
                  <div>
                    <span className="font-bold">owner:</span>
                    {item.owner}
                  </div>
                  <button
                    className="px-3 py-1 bg-gray-400 border"
                    onClick={() => {}}
                  >
                    编辑
                  </button>
                  <button
                    className="px-3 py-1  ml-2 bg-gray-100 border"
                    onClick={() => {
                      del(item.id)
                    }}
                  >
                    删除
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
