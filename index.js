const api = require("lambda-api")()
const { github } = require("./src/routes/github.js")

api.register(github)

exports.handler = async (event, context) => {
  return api.run(event, context)
}
