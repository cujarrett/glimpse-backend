const test = require("ava")
const { getContributionYears, getRawContributionData } = require("../../src/integrations/github.js")

test("Integration - GitHub", async (assert) => {
  let contributionYears = await getContributionYears("cujarrett")
  assert.is(contributionYears[contributionYears.length - 1], "2015")
  contributionYears = await getContributionYears("jjshfvjsdvjksjncvjsbncjkslHV")
  assert.is(contributionYears.length, 0)
  const contributions = await getRawContributionData("cujarrett", [2015])
  assert.is(contributions.length, 365)
  assert.is(contributions[0].count, 0)
  assert.is(contributions[343].count, 1)
})
