// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream

import { clear } from "console"

// 通过 async iterator 创建 ReadableStream
function iteratorToStream(iterator: AsyncGenerator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}

// 延迟函数
function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// encoder 用于将字符串转换为 Uint8Array
const encoder = new TextEncoder()

// 生成一个随机字符串
function randomString() {
  return Math.random().toString(36).slice(2)
}

// 生成 async iterator
async function* makeIterator() {
  await sleep(200)

  yield encoder.encode(`<p>${randomString()}</p>`)
  await sleep(500)
  yield encoder.encode(`<p>${randomString()}</p>`)
  await sleep(500)
  yield encoder.encode(`<p>${randomString()}</p>`)
  await sleep(500)
  yield encoder.encode(`<p>${randomString()}</p>`)
}

export async function POST() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)
  console.log(stream, "stream")
  // 返回 ReadableStream
  return new Response(stream)
}

export async function GET() {
  let i = 0
  let id: NodeJS.Timeout
  const readableStream = new ReadableStream({
    async start(controller) {
      controller.enqueue("H")
      controller.enqueue("e")
      controller.enqueue("l")
      controller.enqueue("l")
      controller.enqueue("o")
      try {
        id = setInterval(() => {
          controller.enqueue(randomString())
          controller.enqueue(randomString())
        }, 300)
      } catch (error) {
        console.log(error)
        id && clearInterval(id)
      }

      await sleep(1000)
      controller.enqueue(" ")
      controller.enqueue("W")
      controller.enqueue("o")
      controller.enqueue("r")
      controller.enqueue("l")
      controller.enqueue("d")
      await sleep(1000 * 5)
      controller.enqueue("结束了")

      id && clearInterval(id)
      controller.close()
    },
  })

  return new Response(readableStream)
}
