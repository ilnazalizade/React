import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props) {

   const cartItems = JSON.parse(localStorage.getItem('cartItems'))
   const shipping = JSON.parse(localStorage.getItem('shipping'))
   const payment = JSON.parse(localStorage.getItem('payment'))


  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = (0.15 * itemsPrice).toFixed(2);
  const totalPrice = itemsPrice + shippingPrice + parseFloat(taxPrice);



  const placeOrderHandler = () => {
    axios.post("/api/orders", {cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice}, {
      headers: {
        Authorization: ' Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      props.history.push("/order/" + res.data.data._id);
    })
  }


  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {shipping.address}, {shipping.city},
          {shipping.postalCode}, {shipping.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img
                        src={process.env.PUBLIC_URL +  item.image.replace('/frontend\\public','')}
                           alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>


      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(totalPrice)}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;
