import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = '/api/auth'

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  // Register
  register: async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData)
      set({ user: data.user, error: null })
      toast.success('Conta criada com sucesso!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao criar conta'
      set({ error: message })
      toast.error(message)
      throw error
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, credentials)
      set({ user: data.user, error: null })
      toast.success('Login realizado com sucesso!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao fazer login'
      set({ error: message })
      toast.error(message)
      throw error
    }
  },

  // Logout
  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`)
      set({ user: null, error: null })
      toast.success('Logout realizado com sucesso!')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  // Get current user
  getMe: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/me`)
      set({ user: data.data, loading: false })
      return data.data
    } catch (error) {
      set({ user: null, loading: false })
      return null
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const { data } = await axios.post(`${API_URL}/forgot-password`, { email })
      toast.success('Email de recuperação enviado!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao enviar email'
      toast.error(message)
      throw error
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const { data } = await axios.put(`${API_URL}/reset-password/${token}`, { password })
      set({ user: data.user, error: null })
      toast.success('Senha redefinida com sucesso!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao redefinir senha'
      toast.error(message)
      throw error
    }
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const { data } = await axios.put(`${API_URL}/update-password`, {
        currentPassword,
        newPassword
      })
      toast.success('Senha atualizada com sucesso!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao atualizar senha'
      toast.error(message)
      throw error
    }
  }
}))
