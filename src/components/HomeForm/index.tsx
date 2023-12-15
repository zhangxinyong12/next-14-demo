"use client"

const actionUrl = "/api/upload"

const HomeForm = () => {
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData()
    formData.append("file", "111")
    formData.append("user_id", "user_id")
    console.log("formData", formData)
    await fetch(actionUrl, {
      method: "POST",
      body: formData,
      // cache: "no-cache",
    })

    return

    // // 获取文件file
    // const fileInput = document.querySelector("#file") as HTMLInputElement
    // const file = fileInput?.files?.[0]
    // const user_id = (document.querySelector("#user_id") as HTMLInputElement)
    //   .value
    // if (!file || !user_id) {
    //   return false
    // }
    // const formData = new FormData()
    // formData.append("file", file)
    // formData.append("user_id", user_id)
    // fetch(actionUrl, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log("err", err)
    //   })
  }

  return (
    <main>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={submit}>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              上传文件
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="user_id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              姓名ID
            </label>
            <input
              type="text"
              name="user_id"
              id="user_id"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default HomeForm
