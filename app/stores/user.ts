import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,
    token: null as string | null,
  }),
  actions: {
    async loginWithGoogle(credential: string) {
      const config = useRuntimeConfig()
      try {
        const response = await axios.post(`${config.public.apiUrl}/api/auth/google`, {
          token: credential
        })

          this.user = response.data.user
          this.token = response.data.token

        return { success: true }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false }
      }
    },
    logout() {
      this.user = null
      this.token = null
      navigateTo('/')
    },
    async fetchUser() {
      if (!this.token) return
      const config = useRuntimeConfig()
      try {
        const response = await axios.get(`${config.public.apiUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data.user
      } catch (error: any) {
        console.error('Fetch user error:', error)
        if (error.response?.status === 401) {
          this.logout()
        }
      }
    }
  },
  persist: true
})
