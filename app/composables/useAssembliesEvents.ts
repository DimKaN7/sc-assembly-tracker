export default () => {
  const { assembliesEventsUrl } = useRuntimeConfig().public

  const { onContributionMessage, onDeletedContributionMessage, onUpdatedContributionMessage } =
    useAssembliesUpdates()

  const callbacks: Map<string, (data: unknown | undefined) => void> = new Map([
    [
      'material_contributed',
      (data) =>
        onContributionMessage(data as DataWithContribution<NewContributionResponse> | undefined),
    ],
    [
      'contribution_deleted',
      (data) => onDeletedContributionMessage(data as DeletedContributionResponse | undefined),
    ],
    [
      'contribution_updated',
      (data) => onUpdatedContributionMessage(data as UpdatedContributionResponse | undefined),
    ],
  ])

  useEvents(assembliesEventsUrl, callbacks)
}
