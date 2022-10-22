import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
   const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    setError({})
    if(handleValidation()){
      axios.post("/api/users/signin", {  email, password }).then(res => {
        console.log(res);
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        localStorage.setItem('token',res.data.token)
        props.history.push(redirect);
      }).catch(er => {
        let error = {}
        error.server = 'user or password is incorrect'
        setError(error)
      })
    }

  }

  const handleValidation = () => {
    let isValid = true
    let error = {}
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      isValid = false
      error.email = 'Please enter valid email'
    }
    if(!password){
      isValid = false
      error.password = 'Please enter your password'
    }
    setError(error)
    return isValid;
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {error.server && <div className="text-error">{error.server}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input className={error.email && 'input-error'} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
          {error.email && <p className="text-error">{error.email}</p>}
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input className={error.password && 'input-error'} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
          {error.password && <p className="text-error">{error.password}</p>}
        </li>
        <li>
          <button type="submit" className="button primary">Signin</button>
        </li>
        <li>
          New to boobaady?
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your boobaady account</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;
