import React, { useContext } from 'react'
import { AdminContext } from '../context/adminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setAToken(null)
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <img 
            src={assets.admin_logo} 
            alt="Admin Logo" 
            className="h-8 w-auto"
          />
          <span className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded-full">
            {aToken ? 'Admin' : 'Doctor'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-full transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar