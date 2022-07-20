import React from 'react'

import logo from "../../../assets/logo.jpg";
import Search from '../../Product/Search'
import {Nav,Bars,NavMenu,NavBtn,NavLink,NavBtnLink} from './NavElements'



function Header() {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={logo} alt='logo' style={{maxWidth:"100px"}} />
        </NavLink>
         <Search></Search>
        <Bars />
        <NavMenu>
          <NavLink to='/products' activeStyle>
            Products
          </NavLink>
          <NavLink to='/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default Header