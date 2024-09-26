import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError} from '../utils'

const ForgotPassword = () => {

    const [Email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/auth/forgotPassword', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: Email
                })
            })
            const {status, message, error} = response
            if(status === 201){
                alert("Check your email for reset password link")
                navigate('/login')
            }
            else{
              handleError(error || message)
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
      <h2 className="text-4xl font-bold text-center text-primary">Forgot Password</h2>
        <div>
          <label htmlFor="email" className="block font-medium text-text">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <button type="submit" className="w-full px-4 py-2 font-medium  bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary text-[#f8f9fa] bg-[#007bff]">Send</button>
    </div>
  </div>

    </form>
    <ToastContainer/>
  </div>
  )
}

export default ForgotPassword
