import { sql } from "@vercel/postgres"

export default async function User() {
  const { rows } = await sql`SELECT * from User `

  console.log(rows)

  return (
    <div>
      <div>
        当前用户列表
        <ul>
          {rows.map((user, index) => (
            <li key={user.id + index}>{user.user + "_" + index}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
