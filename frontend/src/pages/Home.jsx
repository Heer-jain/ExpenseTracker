import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar.jsx'
import SummaryPie from '../components/SummaryPie.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import Recent from '../components/Recent.jsx';
import avatar from '../assets/avatar.png'

const Home = () => {
  const {totalBudget, totalIncome, totalExpense, findTotal, recentIncome, recentExpense, loggedInUser, setLoggedInUser, userEmail, setUserEmail} = useContext(AuthContext)

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '')
    setUserEmail(localStorage.getItem('userEmail') || '')
    findTotal()
  }, [])

  

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col md:flex-row gap-5">
        <div className='w-64 h-20 space-y-10 bg-gradient-to-r from-gray-200 to-blue-200 m-5 rounded-3xl p-3 text-2xl text-[#6c757d] mx-auto'>
        <div className="gap-5 flex items-center">
        <img src={avatar} alt="avatar" className='cursor-pointer h-10 w-10  rounded-full focus:outline-none focus:ring focus:ring-primary'/>
          <div>
            <div>{loggedInUser || 'Guest'}</div>
            <div className="text-sm">{userEmail}</div>
          </div>
        </div>
        <div className='bg-gradient-to-r from-gray-200 to-blue-200 rounded-3xl text-center p-3'><div>Total Income</div> <div> Rs. {totalIncome}</div></div>
        <div className='bg-gradient-to-r from-gray-200 to-blue-200 rounded-3xl text-center p-3'><div>Total Expense</div> <div> Rs. {totalExpense}</div></div>
        <div className='bg-gradient-to-r from-gray-200 to-blue-200 rounded-3xl text-center p-3'><div>Remaining budget</div> <div> Rs. {totalBudget-totalExpense}</div></div>
        </div>
        <div className='w-[90%] md:w-[40%] mt-96 md:mt-5'><SummaryPie/></div>
        <div className='w-[25%] m-5 space-y-5 h-[85vh] text-[#6c757d] hidden md:block'>
          <div className='bg-gradient-to-r from-gray-100 to-blue-200 rounded-3xl h-[40vh] p-5 space-y-4'>
            <h1 className='text-2xl text-center'>Recent Income</h1>
            <Recent recent={recentIncome}/>
          </div>
          <div className='bg-gradient-to-r from-gray-100 to-blue-200 rounded-3xl h-[40vh] p-5 space-y-4'>
          <h1 className='text-2xl text-center'>Recent Expense</h1>
          <Recent recent={recentExpense}/>
          </div>
          </div>
      </div>

    <ToastContainer/>
    </div>
  );
};

export default Home;
