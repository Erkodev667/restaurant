import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={'navbar'}>
      <Link to="/" className="navbar-logo">Asmara</Link>
      <div className={'buttons'}>
        <Link to='/' className={'nav-link'}>Главная</Link>
        <Link to='/about' className={'nav-link'}>О нас</Link>
        <Link to='/basket' className={'nav-link nav-link-basket'}>Корзина</Link>
        <Link to='/signIn' className={'nav-link'}>Войти</Link>
      </div>
    </nav>
  )
}

export default Navbar;