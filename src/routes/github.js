const { name, version } = require("../../package.json")
const { getContributionYears, getRawContributionData } = require("../integrations/github.js")

module.exports.getFormattedContributionsByYear = (contributions) => {
  let years = []
  for (const contribution of contributions) {
    const year = contribution.date.substring(0, 4)
    if (!years.includes(year)) {
      years.push(year)
    }
  }

  const output = []
  years = years.reverse()

  // Seed years in output
  for (const year of years) {
    output.push({
      name: year,
      data: [
        { category: "January", value: 0 },
        { category: "February", value: 0 },
        { category: "March", value: 0 },
        { category: "April", value: 0 },
        { category: "May", value: 0 },
        { category: "June", value: 0 },
        { category: "July", value: 0 },
        { category: "August", value: 0 },
        { category: "September", value: 0 },
        { category: "October", value: 0 },
        { category: "November", value: 0 },
        { category: "December", value: 0 }
      ]
    })
  }

  // Add month totals to years
  for (const contribution of contributions) {
    const contributionYear = contribution.date.substring(0, 4)
    const contributionMonth = contribution.date.substring(5, 7) - 1
    const count = contribution.count

    for (const year of output) {
      const yearMatch = year.name === contributionYear
      const hasContributions = count > 0
      if (yearMatch && hasContributions) {
        year.data[contributionMonth].value += count
      }
    }
  }

  // Remove months of year pior to first ever contribution
  let noContributionsYet = true
  for (const year of output) {
    if (year.name === years[0]) {
      for (const month of year.data) {
        if (month.value === 0 && noContributionsYet) {
          month.value = null
        } else {
          noContributionsYet = false
        }
      }
    }
  }

  // Remove future months from current year
  const date = new Date()
  const currentYear = date.getFullYear().toString()
  const currentMonth = date.getMonth()

  for (const year of output) {
    if (year.name === currentYear) {
      for (let monthIndex = currentMonth + 1; monthIndex < 12; monthIndex++) {
        year.data[monthIndex].value = null
      }
      break
    }
  }

  return output
}

module.exports.github = async (api) => {
  api.get("/github", async (request, response) => {
    try {
      console.log("/github called")
      response.header("Access-Control-Allow-Origin", "*")
      const { username } = request.query
      const years = await getContributionYears(username)
      const rawContributionData = await getRawContributionData(username, years)
      const contributions = this.getFormattedContributionsByYear(rawContributionData)
      const result = {
        contributions,
        metadata: {
          name,
          version
        }
      }
      return JSON.stringify(result, null, "  ")
    } catch (error) {
      console.log(error)
    }
  })
}
