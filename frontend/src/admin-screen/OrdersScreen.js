import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrdersScreen(props) {

  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    getListOrders()
  }, []);


  const getListOrders = () => {
      axios.get("/api/orders", {
      headers:
        { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
       setOrders(res.data)
      });
  }

  const deleteHandler = (order) => {
    axios.delete("/api/orders/" + order._id, {
      headers:
        { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      getListOrders()
    });
  }

  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>

      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;
