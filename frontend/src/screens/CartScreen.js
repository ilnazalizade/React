import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CartScreen(props) {
  let {setCartItems,cartItems} = props;
  // let {setCartItems,cartItems} = props;

  // const [cartItems,setCartItems] = useState([])


  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;



  const removeFromCartHandler = (productId) => {
     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
       cartItems = cartItems.filter(item => item.product !== productId);
       setCartItems(cartItems)
       localStorage.setItem('cartItems',JSON.stringify(cartItems))
  }
  useEffect(() => {
    if (productId) {
        getProduct()
    }else{
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
      setCartItems(cartItems)
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  const getProduct = () => {
    axios.get(`/api/products/${props.match.params.id}`).then(res => {
      let qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
      let find = false
      let data = res.data
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []


      if(cartItems.length > 0){
        cartItems = cartItems.map(item => {
           if(item.product === data._id){
             find = true
             qty = item.qty + qty;
             // if(item.countInStock > item.qty)
             //   qty = item.qty + qty;
             // else {
             //   qty = item.qty;
             // }
             return {...item,qty}
           }else{
             return item
           }
         })

        console.log('hesi',cartItems)
      }

      let cart = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }

      if(!find){
        cartItems = cartItems.concat(cart)
      }

      setCartItems(cartItems)

      localStorage.setItem('cartItems',JSON.stringify(cartItems))

    }).catch(er => {
      console.log(er)
    })
  }


  const changeQty = (qty,id) => {
     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
     let newCartItems = cartItems.map(item => {
      if(item.product === id){
        return {...item,qty:parseInt(qty)}
      }else{
        return item
      }
    })
    localStorage.setItem('cartItems',JSON.stringify(newCartItems))
    setCartItems(newCartItems)
  }

  return <div className="cart">
    <div className="cart-list">
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
                    Qty:
                  <select value={item.qty} onChange={(e) => changeQty(e.target.value,item.product)}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
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
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
}

export default CartScreen;
