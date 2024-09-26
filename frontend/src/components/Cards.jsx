import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { handleError } from '../utils';

const Cards = () => {

  const {setIncomeInfo, income, setIncome, setExpenseInfo, expense, setExpense, setBudgetInfo, budget, setBudget} = useContext(AuthContext)
  const user_id = localStorage.getItem('user_id')

  const location = useLocation()
  const currentPage  = location.pathname

  const dataArray = currentPage.includes('/income') ? income :
  currentPage.includes('/expense') ? expense :
  currentPage.includes('/budget') ? budget : []
  
  const token = localStorage.getItem("token");

  const fetchProduct = async() =>{
    try{
      const req = await fetch(`http://localhost:3000${currentPage}/all/`+user_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if(req.status == '403'){
        alert("Token expired. Please logging again")
      }
      if (!req.ok) {
        throw new Error(`Error -> ${req.status}`);
      }
      
      const product = await req.json();
      if(currentPage.includes('/income')){
        const sortedData = product.result.sort((a, b) => new Date(a.date) - new Date(b.date));
        setIncome(sortedData)
      }
      else if(currentPage.includes('/expense')){
        setExpense(product.result)
      }
      else if(currentPage.includes('/budget')){
        setBudget(product.result)
      }
    }catch(err){
      handleError(err)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])
  

  const handleDelete = async(id) => {
    try{
      const res = await fetch(`http://localhost:3000${currentPage}/${id}`, {
        method : "DELETE",
        headers:{
          Authorization : `Bearer ${token}`,
        },
      })
      if(!res.ok){
        throw new Error(`Failed to delete -> ${res.status}`)
      }
      if(currentPage.includes('/income')){
        setIncome(income.filter(item => item.id !== id))
      }
      else if(currentPage.includes('/expense')){
        setExpense(expense.filter(item => item.id !== id))
      }
      else if(currentPage.includes('/budget')){
        setBudget(budget.filter(item => item.id !== id))
      }
    }catch(err){
      handleError("Error while deleting ->",err)
    }
  }

  const handleEdit = async(item) => {
    const updatedItem = {
      amount : item.amount,
      source : item.source,
      date : item.date,
      desc : item.desc
    }
    try{
      const res = await fetch(`http://localhost:3000${currentPage}/${item._id}`, {
        method : "PUT",
        headers:{
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(updatedItem)
      })
      if(!res.ok){
        throw new Error(`Failed to edit: ${res.status}`)
      }
      if(currentPage.includes('/income')){
        setIncomeInfo(updatedItem)
        setIncome((prevIncome) => prevIncome.map(incomeItem => 
          incomeItem._id === item._id ? { ...incomeItem, ...updatedItem } : incomeItem)
      )}
      else if(currentPage.includes('/expense')){
        setExpenseInfo(updatedItem)
        setExpense(expense.map(expenseItem => 
          expenseItem._id === item._id ? { ...expenseItem, ...updatedItem } : expenseItem)
        )}
      else if(currentPage.includes('/budget')){
        setBudgetInfo(updatedItem)
        setBudget(budget.map(budgetItem => 
          budgetItem._id === item._id ? { ...budgetItem, ...updatedItem} : budgetItem)
        )}
        handleDelete(item.id)
    }catch(err){
      handleError(err)
    }
  }

  const word = currentPage.includes("/income")
  ? "income"
  : currentPage.includes("/expense")
  ? "expense"
  : currentPage.includes("/budget")
  ? "budget"
  : {};

  const isIncomeOrExpensePage = location.pathname === '/income' || location.pathname === '/expense';
  const isBudgetPage = location.pathname === '/budget'

  return (
    <div className="flex gap-5 flex-wrap">
      {Array.isArray(dataArray) && dataArray.length > 0 ? (
        dataArray.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-r text-[#6c757d] from-gray-200 to-blue-300 m-8 p-4 rounded-3xl w-80 text-xl h-56 overflow-auto"
          >
            <div>
              Amount: <span className="text-[#007bff]">{item.amount}</span>{" "}
            </div>
            <div>
              Category: <span className="text-[#007bff]">{item.source}</span>
            </div>
            <div>
              {isIncomeOrExpensePage ? (
                <div>Date: <span className="text-[#007bff]">{item.date.split("T")[0]}</span></div>
              ) : isBudgetPage ? (
                <div>Period: <span className="text-[#007bff]">{item.time}</span></div>
              ) : (
                null 
              )}
            </div>
            <div>
              Description: <span className="text-[#007bff]">{item.desc}</span>
            </div>
            <button
              onClick={() => handleEdit(item)}
              className="bg-gray-700 px-5 py-1 rounded-full text-gray-300 m-1 mt-6"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-gray-700 px-5 py-1 rounded-full text-gray-300 m-1 mt-6"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className='text-red-500 text-2xl m-auto'>No {word}!!</p>
      )}
    </div>
  );
}

export default Cards
