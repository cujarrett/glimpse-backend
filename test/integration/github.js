const test = require("tape-async")
// eslint-disable-next-line max-len
const { getContributionYears, getRawContributionData } = require("../../src/integrations/github.js")

test("Integration - GitHub", async (assert) => {
  assert.plan(5)
  let contributionYears = await getContributionYears("cujarrett")
  // eslint-disable-next-line max-len
  assert.equal(contributionYears[contributionYears.length - 1], "2015", "getContributionYears returns first year of contributions for author verified")
  contributionYears = await getContributionYears("jjshfvjsdvjksjncvjsbncjkslHV")
  // eslint-disable-next-line max-len
  assert.equal(contributionYears.length, 0, "getContributionYears returns first year of contributions for author verified")
  const contributions = await getRawContributionData("cujarrett", [2015])
  // eslint-disable-next-line max-len
  assert.equal(contributions.length, 365, "getRawContributionData returns a full year of results verified")
  // eslint-disable-next-line max-len
  assert.equal(contributions[0].count, 0, "getRawContributionData returns expected contributions for a given day verified")
  // eslint-disable-next-line max-len
  assert.equal(contributions[343].count, 1, "getRawContributionData returns expected contributions for a given day verified")
})
