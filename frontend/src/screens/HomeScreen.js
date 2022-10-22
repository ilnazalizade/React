import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const category = props.match.params.type ? props.match.params.type : '';

  //searchKeyword
  // useEffect(() => {
  //   if(searchKeyword.length >= 3) {
  //     listProducts();
  //   }
  // },[searchKeyword]);


  useEffect(() => {
      listProducts();
  },[category,sortOrder]);






  const listProducts = () => {
    setLoading(true)
    axios.get(
      `/api/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`
    ).then(res => {
      console.log(res)
      setLoading(false)
      setProducts(res.data)
    }).catch(er => {
      console.log(er)
      setLoading(false)
      setError('error happend')
    })
  }
  


  return (
    <>
      <div className="filter">
        <svg className="pre-logo-svg" height="60px" width="60px" fill="#111" viewBox="0 0 69 32">
          <path
            d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.2 5.12 2.16 7.52Q11.2 18 14 18q2.24 0 5.04-.72z"></path>
        </svg>
        <div className="search-sort-wrapper">
          <div>
            <form>
              <div className="search-wrapper">
                <input
                  name="searchKeyword"
                  placeholder="Search"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <svg onClick={listProducts}  className="pre-search-input-icon" fill="#111" height="30px" width="30px"
                     viewBox="0 0 24 24">
                  <path
                    d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"></path>
                </svg>
              </div>
            </form>
          </div>
          <div>
            Sort By{' '}
            <select name="sortOrder" onChange={e => setSortOrder(e.target.value)}>
              <option value="">Newest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </div>
        </div>
      </div>
      {category && <h2 style={{marginLeft:16}}>{category}</h2>}
      <img width="100%"  src="./nike.jpg" alt=""/>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={process.env.PUBLIC_URL +  product.image.replace('/frontend\\public','')}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">

                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;