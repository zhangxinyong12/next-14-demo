import { NextApiRequest, NextApiResponse } from "next"

const streamPipeline = promisify(pipeline)
import fs from "fs"
import { promisify } from "util"
import internal, { pipeline } from "stream"

const URL = "http://127.0.0.1:8000/user/upload/avatar/"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function GET(): Promise<Response> {
  return new Response("GET Draft mode is disabled")
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File
  console.log("file", file)
  // 使用fs保存文件到本地
  // 生成文件保存路径
  // const filePath = `./public/uploads/${file.name}`
  // // 创建一个可写流
  // const writableStream = fs.createWriteStream(filePath)

  // // 如果file是一个Blob对象，则需要转换为可读流
  // if (file.stream) {
  //   // 使用stream.pipeline将文件内容流式传输到文件系统
  //   await streamPipeline(file.stream() as any, writableStream)
  // }
  const name = formData.get("name")
  const email = formData.get("email")
  const data = await fetch(URL, {
    method: "POST",
    body: formData,
  }).then((res) => res.json())
  console.log("data", data)
  return Response.json({ data })
}
