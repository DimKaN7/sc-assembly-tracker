import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export const performRequest = async <T>(
  url: string,
  options: NitroFetchOptions<NitroFetchRequest> = { method: 'GET' },
) => {
  const { $api } = useNuxtApp()
  return await $api<T>(url, options)
}
