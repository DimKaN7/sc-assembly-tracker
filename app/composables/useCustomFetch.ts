import type { UseFetchOptions } from '#app'

export default <T>(url: string, options?: UseFetchOptions<T>) =>
  useFetch(url, {
    $fetch: useNuxtApp().$api,
    ...options,
  }) as ReturnType<typeof useFetch<T, Problem>>
