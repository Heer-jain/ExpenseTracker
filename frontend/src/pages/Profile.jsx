import { useContext, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'
import Footer from '../components/Footer'

const Profile = () => {

  const {loggedInUser, setLoggedInUser, userEmail, setUserEmail} = useContext(AuthContext)
  const user_id = localStorage.getItem('user_id');
  const [userPassword, setUserPassword] = useState(localStorage.getItem('userPassword') || '');
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/profile/' + user_id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username: loggedInUser,
          email: userEmail,
          password: userPassword
        })
      });
      
      const data = await response.json();
  
      if (response.ok) {
        handleSuccess("Profile Updated Successfully");
        setLoggedInUser(data.profile.username);
        setUserEmail(data.profile.email);
        setUserPassword(data.profile.password);
        localStorage.setItem('loggedInUser', data.profile.username);
        localStorage.setItem('userEmail', data.profile.email);
        navigate('/home');
      } else {
        handleError(data.error || "Profile not updated");
      }
    } catch (error) {
      handleError(error.error || "Server error. Please try again.");
    }
  };
  

  const handleDelete = async(e) => {
    e.preventDefault()
    const userConfirm = confirm("Do you want to delete your account")

    if(userConfirm){
        try{
        const response = await fetch(`http://localhost:3000/auth/user/${user_id}`, {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        handleSuccess(data.message)
        localStorage.clear()
        navigate('/login')
      }catch(err){
        handleError(err)
      }
    }
  }

  return (
    <div>
      <Navbar/>
    <form>
  <div className="flex items-center justify-center mt-20 text-[#007bff]">
    <div className="w-full max-w-md p-8 space-y-8 bg-gradient-to-r  from-gray-100 to-blue-200  shadow-md rounded-lg">
      <h2 className="text-4xl font-bold text-center">Profile</h2>
        <div>
          <label htmlFor="username" className="block font-medium text-text">Username</label>
          <input onChange={(e) => setLoggedInUser(e.target.value)} type="text" id="username" name="username" value={loggedInUser} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-text">Email</label>
          <input onChange={(e) => setUserEmail(e.target.value)} type="email" id="email" name="email" value={userEmail} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="password" className="block  font-medium text-text">Password</label>
          <input onChange={(e) => setUserPassword(e.target.value)} type="password" id="password" name="password" value={userPassword} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <div className="flex justify-evenly">
          <button onClick={() => {navigate('/home')}} className="px-4 py-2 font-medium  bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary text-[#f8f9fa] bg-[#007bff]">Back</button>
          <button onClick={handleUpdate} className="px-4 py-2 font-medium  bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary text-[#f8f9fa] bg-[#007bff]">Update</button>
          <button onClick={handleDelete} className="px-4 py-2 font-medium  bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary text-[#f8f9fa] bg-[#007bff] ">Delete account</button>
        </div>
    </div>
  </div>

    </form>
    <Footer/>
    <ToastContainer/>
  </div>
  )
}

export default Profile
