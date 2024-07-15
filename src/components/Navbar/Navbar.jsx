import React from 'react'
import logo from '../../assets/logo.png'
import '../Navbar/Navbar.css'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <img src={logo} alt="navbar" className='navlogo' />
        <ul className="nav-menu">
            <li>About Us</li>
        </ul>
        <div className="nav-connect">Upload File</div>
    </div>
  )
}
export default Navbar