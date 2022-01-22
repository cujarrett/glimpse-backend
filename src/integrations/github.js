import fetch from "node-fetch"

export const getContributionYears = async (username) => {
  const contributionYearsRegularExpression = /year-link-\d{4}/g
  const url = `https://github.com/${username}`
  const response = await fetch(url)
  const data = await response.text()
  const matches = data.match(contributionYearsRegularExpression)
  if (!matches) {
    return []
  }
  const contributionYears = matches.map((year) => year.replace("year-link-", ""))

  return contributionYears
}

export const getRawContributionData = async (username, contributionYears) => {
  const output = []
  for (const year of contributionYears) {
    // eslint-disable-next-line max-len
    const url = `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`
    const response = await fetch(url)
    const data = await response.text()
    // eslint-disable-next-line max-len
    const contributionRegularExpressionPattern = (year) => `(data-count="\\d*".*data-date="${year}-\\d{2}-\\d{2}")`
    // eslint-disable-next-line max-len
    const contributionRegularExpression = new RegExp(contributionRegularExpressionPattern(year), "g")
    const matches = data.match(contributionRegularExpression)
    const contributions = matches.map((match) => {
      return {
        count: +match.match(/data-count="(\d*)"/)[1],
        date: match.match(/data-date="(\d{4}-\d{2}-\d{2})"/)[1]
      }
    })
    output.push(...contributions)
  }

  return output
}
