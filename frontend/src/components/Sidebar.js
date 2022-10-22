import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = (props) => {
  const {open,setOpen} = props;
  const [categories,setCategories] = useState([])
  useEffect(()=>{
    if(open) {
      getCategories();
    }
  },[open])
  const getCategories = () => {
    axios.get('/api/category').then(res => {
      console.log(res)
      setCategories(res.data)
    })
  }

  return(
  <aside className={`sidebar ${open ? 'open' : 'close'}`}>
    <h3 style={{color:'white'}}>Shopping Categories</h3>
    <button className="sidebar-close-button" onClick={() => setOpen(false)}>
      x
    </button>
    <ul className="categories">
      {categories.map((category)=>(
        <li key={category._id}>
          <Link to={`/category/${category.name}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  </aside>
)

}

export default Sidebar;
