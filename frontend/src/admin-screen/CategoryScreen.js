import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoriesScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);





  useEffect(()=>{
    getCategories()
  },[])

  const openModal = (product) => {
    setModalVisible(true);
  };


  const getCategories = () => {
      axios.get('/api/category').then(res => {
        console.log(res)
        setCategories(res.data)
      })
  }



 const submitHandler = (e) => {
   e.preventDefault();
   axios.post('/api/category/add',{ name },{
     headers: {
       Authorization: 'Bearer ' + localStorage.getItem('token')
     }
   }).then(res => {
     console.log(res)
     setModalVisible(false)
     getCategories()
     // listProducts()
   }).catch(er => {
     console.log(er)
   })
 }

  const deleteHandler = (id) => {
       axios.delete(`/api/category/${id}`,{
         headers: {
           Authorization: 'Bearer ' + localStorage.getItem('token')
         }
       }).then(res => {
         getCategories()
       })
    }

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Category</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Category
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Add Category</h2>
              </li>
              <li>
                {/*{loadingSave && <div>Loading...</div>}*/}
                {/*{errorSave && <div>{errorSave}</div>}*/}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                  Add
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>
                <button
                  className="button"
                  onClick={() => deleteHandler(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoriesScreen;
