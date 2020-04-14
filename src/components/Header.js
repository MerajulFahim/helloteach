import React from "react";
import {Link, useParams} from 'react-router-dom';
import Logo from "../assets/logo.svg";
import CartLink from '../components/Cart/CartLink';
import LoginLink from '../components/LoginLink';
import {UserContext} from '../context/user'

export default function Header() {

const {user} =React.useContext(UserContext);

  let {id}=useParams();
  return (
    <header className="header">
      <img src={Logo} alt="vintage tech logo" className="logo" />

      <nav>
        <ul>
          <div>
            <li>
              <Link to="/" id={id}>
                Home
              </Link>
              <Link to="/about" id={id}>
                About
              </Link>
              <Link to="/products" id={id}>
                Products
              </Link>
              {user.token && 
              <Link to='/checkout'>checkout</Link>}
            </li>
          </div>
          <CartLink />
          <LoginLink />
          <div></div>
        </ul>
      </nav>
    </header>
  );
}
