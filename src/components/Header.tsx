import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-purple-primary/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-primary to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">N8N</span>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-purple-400 text-transparent bg-clip-text">Marketplace</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="nav-link hover:text-purple-200 transition-colors duration-200">
              Marketplace
            </Link>
            <Link href="/about" className="nav-link hover:text-purple-200 transition-colors duration-200">
              About
            </Link>
            <Link href="/contact" className="nav-link hover:text-purple-200 transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-secondary text-sm">
              Log In
            </Link>
            <Link href="/signup" className="btn-primary text-sm">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-purple-primary/20">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 