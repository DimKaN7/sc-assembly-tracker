import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export const performRequest = async <T>(
  url: string,
  options: NitroFetchOptions<NitroFetchRequest> = { method: 'GET' },
) => {
  const { $api } = useNuxtApp()
  return await $api<T>(url, options)
}

export const performSimpleRequest = async (
  url: string,
  options: NitroFetchOptions<NitroFetchRequest> = { method: 'GET' },
) => {
  const { $api } = useNuxtApp()
  await $api(url, options)
}
