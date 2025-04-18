"use client"

import { createContext, useContext, useState, useEffect, use } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (token: string, userData: User) => void
  logout: () => void
  makeAuthenticatedRequest: (url: string, options?: RequestInit) => Promise<Response>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from localStorage if available
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      console.log('Initial user state from localStorage:', storedUser)
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      if (typeof window === 'undefined') return

      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      console.log('Checking session - Token:', token ? 'exists' : 'missing')
      console.log('Checking session - User:', storedUser)

      if (token && storedUser) {
        try {
          console.log('Validating session with backend...')
          const response = await fetch('http://localhost:3001/api/auth/validate-session', {
            headers: { 'Authorization': `Bearer ${token}` }
          })

          // Check if the response is JSON
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json()
            if (response.ok) {
              console.log('Session is valid')
              const userData = JSON.parse(storedUser)
              setUser(userData)
            } else {
              console.log('Session is invalid:', data.message || 'Unknown error')
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              setUser(null)
            }
          } else {
            // Handle non-JSON response (likely HTML error page)
            const text = await response.text()
            console.error('Server returned non-JSON response:', text.substring(0, 100))
            // Keep the user logged in if we have valid localStorage data
            const userData = JSON.parse(storedUser)
            setUser(userData)
          }
        } catch (error) {
          console.error('Session validation failed:', error)
          // Keep the user logged in if we have valid localStorage data
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } else {
        console.log('No session data found in localStorage')
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = (token: string, userData: User) => {
    console.log('Logging in user:', userData)
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      console.log('Stored token in localStorage:', token)
      localStorage.setItem('user', JSON.stringify(userData))
      console.log('Stored token and user data in localStorage',token,userData)
    }
    setUser(userData)
  }

  const logout = async () => {
    console.log('Logging out user')
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          await fetch('http://localhost:3001/api/auth/logout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          })
        } catch (error) {
          console.error('Logout failed:', error)
        }
      }
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      console.log('Removed token and user data from localStorage')
    }
    setUser(null)
  }

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    if (typeof window === 'undefined') {
      throw new Error('Cannot make authenticated request on server side')
    }
    
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Handle both fetch and axios requests
    if (options.body) {
      // If body exists, it's likely a fetch request
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    } else {
      // If no body, check if there's data which indicates an axios request
      const method = (options.method || 'GET').toUpperCase()
      return fetch(url, {
        ...options,
        method,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, makeAuthenticatedRequest }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}