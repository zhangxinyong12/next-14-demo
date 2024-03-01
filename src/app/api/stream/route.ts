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

const str = `
你好啊，我是一个字符串，我是一，今天春节了，天气很好，放烟花，放烟花。放鞭炮。
`

export async function GET() {
  const list = str.split("")
  const readableStream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < list.length; i++) {
        await sleep(Math.random() * 1000)
        // TODO 有什么区别嘛？
        controller.enqueue(encoder.encode(list[i])) // 添加到流中 Uint8Array
      }
      controller.enqueue("结束了")

      controller.close()
    },
  })

  return new Response(readableStream)
}
