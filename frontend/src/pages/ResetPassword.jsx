import { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../utils'

const ResetPassword = () => {

    const [password, setPassword] = useState("")
    const {token} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/auth/resetPassword/'+token, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password
                })
            })
            const {status, success, message, error, data} = response
            console.log(status, success, message, error, data)
            if(status === 201){
                navigate('/login')
            }
        }catch(err){
            handleError(err)
        }
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
  <div className="flex items-center justify-center min-h-screen bg-background bg-[#f8f9fa] text-[#007bff]">
    <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold text-center text-primary">Reset Password</h2>
        <div>
          <label htmlFor="password" className="block font-medium text-text">New Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <button type="submit" className="w-full px-4 py-2 font-medium  bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary text-[#f8f9fa] bg-[#007bff]">Set</button>
    </div>
  </div>

    </form>
    <ToastContainer/>
  </div>
  )
}

export default ResetPassword
