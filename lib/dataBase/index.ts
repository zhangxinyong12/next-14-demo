import { sql } from "@vercel/postgres"

async function initDB() {
  // await sql`
  //   DROP TABLE IF EXISTS Pets;
  // `

  // 检查表是否存在，如果不存在则创建表
  await sql`
    CREATE TABLE IF NOT EXISTS Pets (
      ID serial PRIMARY KEY,
      Name varchar(255),
      Owner varchar(255)
    );
  `

  console.log("init db success")
}

export { initDB }
