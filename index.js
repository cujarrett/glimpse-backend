import createApi from "lambda-api"
import { github } from "./src/routes/github.js"

const api = createApi()
api.register(github)

export const handler = async (event, context) => {
  return await api.run(event, context)
}
