import { HubConnectionBuilder, LogLevel, type HubConnection } from '@microsoft/signalr'

export default (
  url: string,
  callbacks: SignalRCallback[],
  groupId?: string,
  joinGroupName?: string,
  leaveGroupName?: string,
) => {
  const connection = ref<HubConnection>()

  const leaveGroup = async (): Promise<void> => {
    if (connection.value) {
      if (leaveGroupName && groupId) {
        await connection.value.invoke(leaveGroupName, groupId)
      }
      callbacks.forEach((c) => {
        connection.value!.off(c.name)
      })
      await connection.value.stop()
      connection.value = undefined
    }
  }

  const dispose = async () => {
    await leaveGroup()
    window.removeEventListener('beforeunload', leaveGroup)
  }

  const init = async () => {
    let builder = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect([0, 2000, 5000, 10000])
    if (!import.meta.dev) {
      builder = builder.configureLogging(LogLevel.None)
    }
    connection.value = builder.build()

    callbacks.forEach((c) => {
      connection.value!.on(c.name, (response: unknown | undefined) => {
        c.handle(response)
      })
    })

    try {
      await connection.value.start()
      if (joinGroupName && groupId) {
        await connection.value.invoke(joinGroupName, groupId)
      }
    } catch (ex) {
      console.log(ex)
    }
    window.addEventListener('beforeunload', leaveGroup)
  }

  return {
    init,
    dispose,
  }
}
