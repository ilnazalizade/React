import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';
// import { detailsProduct, saveProductReview } from '../actions/productActions';
// import Rating from '../components/Rating';
// import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [productSaveSuccess, setProductSaveSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [product , setProduct] = useState({reviews:[],image:''});
  const [countInStock , setCountInStock] = useState(0);

  //get userinfo
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
    }
    return () => {
      //
    };
  }, [productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    setComment('')
    axios.post(`/api/products/${props.match.params.id}/reviews`,{
          name: userInfo.name,
          rating: rating,
          comment: comment,
    },{
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res)
      getProduct()
    }).catch(er => {
      console.log(er)
    })

  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  useEffect(()=>{
    getProduct()
  },[])


  const getProduct = () => {
    axios.get(`/api/products/${props.match.params.id}`).then(res => {
      console.log(res)
      setProduct(res.data)
      checkStock(res.data)
    }).catch(er => {
      console.log(er)
    })
  }


  const checkStock = (product) => {
     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
     let item = cartItems.find(item => {
       if(item.product === product._id) return item
     })

     let count = product.countInStock - ( item ? item.qty : 0)
      setCountInStock(count)
  }

  const checkout = () => {
     props.history.push('/cart')
  }


  return (
    <div>
      <div className="back-to-result">
        {/* <Link to="/">Back to result</Link> */}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img  src={process.env.PUBLIC_URL +  product.image.replace('/frontend\\public','')} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    {/*<Rating*/}
                    {/*  value={product.rating}*/}
                    {/*  text={product.numReviews + ' reviews'}*/}
                    {/*/>*/}
                  </a>
                </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Price: {product.price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  {countInStock > 0 ?
                    <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    >
                      {[...Array(countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select> : 0
                  }
                </li>
                <li>
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                      disabled={countInStock <= 0 && true}
                    >
                      Add to Cart
                      </button>
                    <button
                      style={{marginTop:16}}
                      onClick={checkout}
                      className="button primary"
                    >
                       checkout
                    </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {!product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
