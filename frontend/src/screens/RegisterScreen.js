import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState(false);


  const submitHandler = (e) => {
    e.preventDefault();
    setError({  })
    if(handleValidation()){
        axios.post("/api/users/register", { name, email, password }).then(res => {
          console.log(res);
          props.history.push('/signin');
        }).catch(er => {
          console.log(er)
          let error = {}
          error.server = "error  happened!"
          setError(error)
        })
    }

  }

  const handleValidation = () => {
    let error = {}
    let isValid = true

    if(name.length < 2){
       error.name = 'name  must at least 2 character'
       isValid = false;
    }
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
       error.email = 'email pattern not valid';
       isValid = false;
    }
    if(password.length < 6){
       error.password = 'password filed must at least 6 character'
       isValid = false;
    }

    if(password !== rePassword){
       error.rePassword = 'password must equal by repeat password'
       isValid = false;
    }

    setError(error)

    return isValid

  }

  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {error.server && <div>{error.server}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input className={error.name && 'input-error'} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
          {error.name  && <p className="text-error">{error.name}</p>}
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
          {error.password &&  <p className="text-error">{error.password}</p>}
        </li>
        <li>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input className={error.rePassword && 'input-error'} type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
          {error.rePassword && <p className="text-error">{error.rePassword}</p>}
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Already have an account?
          <Link to={"/signin"} className="button secondary text-center" >login your boobaady account</Link>

        </li>

      </ul>
    </form>
  </div>
}
export default RegisterScreen;
