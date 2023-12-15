import { NextApiRequest, NextApiResponse } from "next"

const URL = "http://127.0.0.1:8000/user/upload/avatar/"

const upload = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req", req)
  res.status(200).json({ name: "John Doe" })
}

export default upload
