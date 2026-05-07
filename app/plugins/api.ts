export default defineNuxtPlugin(() => {
  const { baseUrl } = useRuntimeConfig().public
  const headers = useRequestHeaders(['cookie'])

  const api = $fetch.create({
    baseURL: baseUrl,
    headers,
    credentials: 'include',
    retry: false,
    ignoreResponseError: true,
    onResponse: async ({ response }) => {
      if (response.status === 401 || response.status === 403) {
        // TODO возврат на логинку
      } else if (!response.ok) {
        // TODO алерты
        response._data = undefined
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
