import { sql } from "@vercel/postgres"
import { NextRequest } from "next/server"

// Pets CRUD
export async function GET(request: NextRequest): Promise<Response> {
  // 获取参数
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")
  const name = searchParams.get("name")

  if (id) {
    const { rows } = await sql`SELECT * from Pets WHERE id = ${id}`
    return new Response(JSON.stringify(rows))
  } else {
    const { rows } = await sql`SELECT * from Pets`
    return new Response(JSON.stringify(rows))
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const formData = await request.formData()
  const name = formData.get("name") as string
  const owner = formData.get("owner") as string
  await sql`INSERT INTO Pets (Name, Owner) VALUES (${name}, ${owner})`
  return new Response("ok")
}

export async function DELETE(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")
  if (id) {
    await sql`DELETE FROM Pets WHERE id = ${id}`
    return new Response("ok")
  } else {
    await sql`DELETE FROM Pets`
    return new Response("ok")
  }
}
