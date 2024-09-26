import Logo from './Logo';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className='flex justify-between items-center py-2 px-4 text-xl bg-[#f8f9fa] text-[#007bff] sticky top-0'>
      <div className='flex gap-2'>
        <Logo />
        <div className='text-4xl'>Expense Master</div>
      </div>

      {/* Hamburger Icon for Mobile View */}
      <div
        className={`md:hidden cursor-pointer p-2 rounded ${isMenuOpen ? 'bg-[#007bff] text-white' : 'bg-transparent text-[#007bff]'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>

      {/* Menu Items */}
      <ul className={`flex-col md:flex-row flex md:flex gap-8 absolute md:static mt-2 p-4 md:p-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex' : 'hidden md:flex'} top-full`}>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'>
          <NavLink to="/home" className={({ isActive }) => (isActive ? "text-[#6c757d]" : "text-[#007bff]")}>Home</NavLink>
        </li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'>
          <NavLink to="/income" className={({ isActive }) => (isActive ? "text-[#6c757d]" : "text-[#007bff]")}>Income</NavLink>
        </li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'>
          <NavLink to="/expense" className={({ isActive }) => (isActive ? "text-[#6c757d]" : "text-[#007bff]")}>Expense</NavLink>
        </li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'>
          <NavLink to="/budget" className={({ isActive }) => (isActive ? "text-[#6c757d]" : "text-[#007bff]")}>Budget</NavLink>
        </li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? "text-[#6c757d]" : "text-[#007bff]")}>Analytics</NavLink>
        </li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-[#6c757d]" : "text-[#007bff]")}>Profile</NavLink>
        </li>
        <li onClick={handleLogout} className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'>Logout</li>
      </ul>

      {/* Close Menu on Click Outside (Optional) */}
      {isMenuOpen && <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />}
    </div>
  );
};

export default Navbar;
