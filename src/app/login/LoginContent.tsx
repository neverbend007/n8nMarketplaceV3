'use client'
import React from 'react'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const LoginContentInner = () => {
  const { user, signInWithGithub, signInWithGoogle } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="card max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
          Sign in to N8N Marketplace
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => signInWithGithub()}
            className="w-full flex items-center justify-center btn-primary text-lg px-8 py-3"
            tabIndex={0}
            aria-label="Sign in with GitHub"
          >
            Sign in with GitHub
          </button>
          <button
            onClick={() => signInWithGoogle()}
            className="w-full flex items-center justify-center btn-secondary text-lg px-8 py-3"
            tabIndex={0}
            aria-label="Sign in with Google"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LoginContent() {
  return (
    <AuthProvider>
      <LoginContentInner />
    </AuthProvider>
  )
} 