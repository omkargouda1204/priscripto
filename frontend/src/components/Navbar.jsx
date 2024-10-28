import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true); // Adjust as per your authentication logic

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      {/* Logo */}
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />

      {/* Navigation Links */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/' className='relative py-1 group'>
          HOME
          <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to='/doctors' className='relative py-1 group'>
          ALL DOCTORS
          <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to='/about' className='relative py-1 group'>
          ABOUT
          <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to='/contact' className='relative py-1 group'>
          CONTACT
          <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      </ul>

      {/* Account Management */}
      <div className='flex items-center gap-4'>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointment')} className='hover:text-black cursor-pointer'>My Appointment</p>
                <p onClick={() => { setToken(false); navigate('/login'); }} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
        )}
        <img onClick={() => setShowMenu(!showMenu)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu" />
      </div>

      {/* Mobile Menu */}
      <div className={`${showMenu ? 'fixed w-full' : 'hidden'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
        <div className='flex items-center justify-between px-5 py-6'>
          <img className='w-36' onClick={() => setShowMenu(false)} src={assets.logo} alt="Logo" />
          <img onClick={() => setShowMenu(false)} className='w-7 cursor-pointer' src={assets.cross_icon} alt="Close" />
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 text-lg font-medium'>
          <NavLink onClick={() => setShowMenu(false)} to='/' className='relative py-1 group'>
            Home
            <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='relative py-1 group'>
            ALL DOCTORS
            <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about' className='relative py-1 group'>
            ABOUT
            <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact' className='relative py-1 group'>
            CONTACT
            <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
