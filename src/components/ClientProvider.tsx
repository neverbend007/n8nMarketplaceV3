'use client'

import React, { useState, useEffect } from 'react'

interface ClientProviderProps {
  children: React.ReactNode
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Don't render anything on server or before hydration
  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

export default ClientProvider 