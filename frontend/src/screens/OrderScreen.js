import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PaypalButton from '../components/PaypalButton';

function OrderScreen(props) {

  const [loadingPay,setLoadingPay] = useState(false)
  const [loading,setLoading] = useState(true)
  const [successPay,setSuccessPay] = useState(false)
  const [error,setError] = useState('')
  const [order,setOrder] = useState({})


  useEffect(() => {
    if (successPay) {
       props.history.push("/profile");
    } else {

    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {


  }

  useEffect(()=>{
     getOrder()
  },[])


  const getOrder = () => {
    axios.get("/api/orders/" + props.match.params.id, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      setOrder(res.data)
      setLoading(false)
      console.log(res.data)
    }).catch(er =>{
      setLoading(false)
      setError('error happend!')
    });
  }

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order?.shipping?.address}, {order?.shipping?.city},
              {order?.shipping?.postalCode}, {order?.shipping?.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
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
                order?.orderItems?.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
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
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;
