const api = require("lambda-api")()
const { contributions } = require("./src/routes/contributions.js")

api.register(contributions)

exports.handler = async (event, context) => {
  return api.run(event, context)
}
