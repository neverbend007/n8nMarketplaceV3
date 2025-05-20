import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-spin-slow h-16 w-16 border-4 border-purple-600 border-t-transparent rounded-full"></div>
    </div>
  )
} 