import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async loginWithGoogle(credential) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/google', {
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
    }
  },
  persist: true
})
