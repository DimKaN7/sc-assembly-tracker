export const useUserStore = defineStore('user', () => {
  const user = ref<UserResponse>()

  const getUser = async (): Promise<void> => {
    const response = await performRequest<UserResponse>('/users/me')
    if (response) {
      user.value = response
    }
  }

  const logout = async (): Promise<void> => {
    await navigateTo('/login')
    user.value = undefined
    useAssembliesStore().clear()
    await performSimpleRequest('/auth/logout')
  }

  return {
    user,
    getUser,
    logout,
  }
})
