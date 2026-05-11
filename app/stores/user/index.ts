export const useUserStore = defineStore('user', () => {
  const username = ref<string>('')

  const getUserName = async (): Promise<void> => {
    const response = await performRequest<string>('/users/me')
    if (response) {
      username.value = response
    }
  }

  const logout = async (): Promise<void> => {
    username.value = ''
    useAssembliesStore().clear()
    await performSimpleRequest('/auth/logout')
    await navigateTo('/login')
  }

  return {
    username,
    getUserName,
    logout,
  }
})
