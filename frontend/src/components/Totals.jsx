import {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext';
import avatar from '../assets/avatar.png'

const Totals = () => {

    const {totalBudget, totalExpense, totalIncome, findTotal, loggedInUser, setLoggedInUser, userEmail, setUserEmail} = useContext(AuthContext)
      
      useEffect(() => {
        findTotal()
        setLoggedInUser(localStorage.getItem('loggedInUser'))
        setUserEmail(localStorage.getItem('userEmail'))
      }, [])
      

  return (
    <div>
        <div className="w-[90%] h-[90%] space-y-5 bg-gradient-to-r from-gray-100 to-blue-200  rounded-3xl p-8 text-2xl text-[#6c757d] hidden md:block m-5">
        <div className="gap-3 flex items-center">
          <img
            src={avatar}
            alt=""
            className="rounded-full h-12"
          />
          <div>
            <div>{loggedInUser}</div>
            <div className="text-sm">{userEmail}</div>
          </div>
        </div>
        <div>Total Income : ₨. {totalIncome}</div>
        <div>Your budget : ₨. {totalBudget}</div>
        <div>Total expence : ₨. {totalExpense}</div>
      </div>
    </div>
  )
}

export default Totals
