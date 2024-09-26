import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email:"", 
    password:""
  })

  const navigate = useNavigate()

 const  handleChange = (e) =>{
  const {name, value} = e.target;
  const copyLoginInfo = {...loginInfo}
  copyLoginInfo[name] = value;
  setLoginInfo(copyLoginInfo)
 }

 const handleLogin=async(e)=>{
  e.preventDefault()
  try {
    const url = "http://localhost:3000/auth/login"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginInfo)
    })
    const result = await response.json()
    const {success, message, jwtToken, name, email, _id, password, error} = result;
    if(success){
      handleSuccess(message)
      localStorage.setItem('token', jwtToken)
      localStorage.setItem('loggedInUser', name)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('user_id', _id)
      localStorage.setItem('userPassword', password)
      setTimeout(() => {
        navigate('/home')
      }, 1);
    }else if(error){
      const details = error?.details[0].message
      handleError(details)
    }
    else if(!success){
      handleError(message)
    }
  }catch(err){
    handleError(err)
  }
 }

  return (
    <div>
      <form onSubmit={handleLogin}>
    <div className="flex items-center justify-center min-h-screen bg-background bg-[#f8f9fa] text-[#007bff]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-4xl font-bold text-center text-primary">Login</h2>
          <div>
            <label htmlFor="email" className="block font-medium text-text">Email</label>
            <input onChange={handleChange} type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" required/>
          </div>
          <div>
            <label htmlFor="password" className="block  font-medium text-text">Password</label>
            <input onChange={handleChange} type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" required/>
          </div>
          <button type="submit" className="w-full px-4 py-2 font-medium  bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary text-[#f8f9fa] bg-[#007bff]">Login</button>
          <p className="text-sm text-center text-secondary">
          Don't have an account? <Link to="/signup" className="font-medium text-primary hover:text-primary-dark hover:underline">Signup</Link>
        </p>
        <p className="text-sm text-center text-secondary">
          Forgot Password? <Link to="/forgotPassword" className="font-medium text-primary hover:text-primary-dark hover:underline">Reset</Link>
        </p>
      </div>
    </div>

      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
