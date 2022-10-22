import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import './App.css';

// admin component
import ProductsScreen from './admin-screen/ProductsScreen';
import OrdersScreen from './admin-screen/OrdersScreen';
//user component
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import Header from './components/Header';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import Sidebar from './components/Sidebar';
import CategoriesScreen from './admin-screen/CategoryScreen';


function App() {
  const [open,setOpen] = useState(false)
  const [cartItems,setCartItems] = useState([])
  return (
      <div className="grid-container">
       <Header cartItems={cartItems} setOpen={setOpen}/>
       <Sidebar open={open} setOpen={setOpen}/>
        <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen}/>
            <Route path="/register" component={RegisterScreen}/>
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/cart/:id?"  render={(props) => <CartScreen cartItems={cartItems} setCartItems={setCartItems} {...props} />}  />
            <Route path="/profile"   render={(props) => <ProfileScreen cartItems={cartItems} setCartItems={setCartItems} {...props} />}  />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/category/:type" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen}/>
             {/*admin route*/}
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/add-product" component={ProductsScreen}/>
            <Route path="/add-category" component={CategoriesScreen}/>
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
  );
}

export default withRouter(App);
