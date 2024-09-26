import Navbar from '../components/Navbar'
import ExpensePie from '../components/ExpensePie'
import Footer from '../components/Footer'

const Analytics = () => {
  return (
    <div>
      <Navbar/>
      <h1 className='text-xl text-center m-2 text-[#6c757d]'>Graphical analytics of your expenses and incomes (category-wise)</h1>
      <div className="flex flex-wrap gap-10 p-10 m-10 justify-evenly">
        <div> <ExpensePie page="expense"/><span className='flex justify-center text-2xl text-[#6c757d]'> Expenses</span> </div>
        <div> <ExpensePie page='income'/><span className='flex justify-center text-2xl text-[#6c757d]'>Incomes</span></div>
      </div>
      <Footer/>
    </div>
  )
}

export default Analytics
