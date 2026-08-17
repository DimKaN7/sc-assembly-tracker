export const removeContribution = (
  conributions: (ContributionResponse | MaterialContributionResponse)[],
  id: string,
): void => {
  const index = conributions.findIndex((c) => c.id === id)
  if (index !== -1) {
    conributions.splice(index, 1)
  }
}
