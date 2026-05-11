export default () => {
  const { assembliesEventsGroupUrl } = useRuntimeConfig().public

  const { onContributionMessage } = useAssembliesStore()

  const userStore = useUserStore()
  const { username } = storeToRefs(userStore)

  const callbacks: SignalRCallback[] = [
    {
      name: 'NewContributionMessage',
      handle: (message) =>
        onContributionMessage(message as DataWithContriution<NewContributionResponse> | undefined),
    },
  ]

  const { init, dispose } = useSignalR(assembliesEventsGroupUrl, callbacks)

  watch(
    username,
    async (val, prev) => {
      if (val && !prev) {
        await init()
      } else if (prev && !val) {
        await dispose()
      }
    },
    {
      immediate: true,
    },
  )

  onBeforeUnmount(dispose)
}
