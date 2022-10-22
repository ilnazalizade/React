import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';


const Header = (props) => {
  const [userInfo, setUserInfo] = useState(false);
  const [countCart, setCountCart] = useState(0);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      setUserInfo(user);
    }else{
      setUserInfo(false)
    }
  },[props.location.pathname]);


   useEffect(()=>{
       let qty = 0;
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
        cartItems.forEach(item => {
         qty += item.qty
       })
     setCountCart(qty)
   },[props.cartItems])


  return(
    <header className="header">
      <div className="brand">
        <button onClick={() => props.setOpen(true)}>&#9776;</button>
        <Link to="/">BooBaady</Link>
      </div>
      <div className="header-links">
        <Link className="cart-count" to="/cart">
          <span>{countCart}</span>
          Cart
        </Link>
        {userInfo ? (
          <Link to="/profile">{userInfo.name}</Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <a href="#">Admin</a>
            <ul className="dropdown-content admin-dropdown">
              <li>
                <Link to="/orders">Orders</Link>
                <Link to="/add-product">Products</Link>
                <Link to="/add-category">Category</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
export default withRouter(Header);
