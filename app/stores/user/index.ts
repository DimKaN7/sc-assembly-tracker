export const useUserStore = defineStore('user', () => {
  const username = ref<string>('')

  const getUserName = async (): Promise<void> => {
    const response = await performRequest<string>('/users/me')
    if (response) {
      username.value = response
    }
  }

  const logout = async (): Promise<void> => {
    await navigateTo('/login')
    username.value = ''
    useAssembliesStore().clear()
    await performSimpleRequest('/auth/logout')
  }

  return {
    username,
    getUserName,
    logout,
  }
})
