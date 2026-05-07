export default defineNuxtPlugin(() => {
  const { baseUrl } = useRuntimeConfig().public
  const headers = useRequestHeaders(['cookie'])

  const api = $fetch.create({
    baseURL: baseUrl,
    headers,
    credentials: 'include',
    retry: false,
    ignoreResponseError: true,
  })

  return {
    provide: {
      api,
    },
  }
})
