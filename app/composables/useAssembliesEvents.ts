export default () => {
  const { assembliesEventsUrl } = useRuntimeConfig().public

  const { onContributionMessage } = useAssembliesStore()

  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const callbacks: Map<string, (data: unknown | undefined) => void> = new Map([
    [
      'material_contributed',
      (data) =>
        onContributionMessage(data as DataWithContribution<NewContributionResponse> | undefined),
    ],
  ])

  let eventSource: EventSource | undefined = undefined

  watch(
    user,
    async (val, prev) => {
      if (val && !prev) {
        eventSource = new EventSource(assembliesEventsUrl, {
          withCredentials: true,
        })
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data) as SSEEvent<unknown>
          if (data) {
            const callback = callbacks.get(data.type)
            if (callback) {
              callback(data.data)
            }
          }
        }
      } else if (prev && !val && eventSource) {
        eventSource.close()
      }
    },
    {
      immediate: true,
    },
  )

  onBeforeUnmount(() => {
    if (eventSource) {
      eventSource.close()
    }
  })
}
