import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState('');
  const [errorOrders, setErrorOrders] = useState('');
  const [success, setSuccess] = useState('');
  const [myOrderList,setMyOrderList] = useState([])
  const [orders,setOrders] = useState([])

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    props.setCartItems([])
    props.history.push('/')
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('userInfo'))
    axios.put(`/api/users/${user._id}`,{name,email,password},{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res)
      localStorage.setItem('userInfo',JSON.stringify(res.data))
      alert('your information updated')
    })
  }

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    listMyOrders()
  }, [])

  const listMyOrders = () => {
      axios.get("/api/orders/mine", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    }).then(res => {
      console.log(res)
        setOrders(res.data)
      });
  }



  return <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>User Profile</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
          </label>
              <input defaultValue={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
          </label>
              <input defaultValue={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input  type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary">Update</button>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <div>Loading...</div> :
          errorOrders ? <div>{errorOrders} </div> :
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link to={"/order/" + order._id}>DETAILS</Link>
                  </td>
                </tr>)}
              </tbody>
            </table>
      }
    </div>
  </div>
}

export default ProfileScreen;
