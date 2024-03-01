import { sql } from "@vercel/postgres"

export default async function User() {
  const { rows } = await sql`SELECT * from CARTS`

  console.log(rows)

  return (
    <div>
      <div>
        当前用户列表
        <ul>
          {rows.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
