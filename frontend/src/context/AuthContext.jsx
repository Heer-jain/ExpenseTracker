import { createContext, useState } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from "uuid"
import { handleError } from '../utils';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser') || '')
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '')
  const user_id = localStorage.getItem('user_id')


  const [incomeInfo, setIncomeInfo] = useState({
    amount: "",
    source: "",
    date: "",
    desc: "",
    id: uuidv4(),
    user_id: localStorage.getItem('user_id'),
  });
  const [income, setIncome] = useState([])

  const [expenseInfo, setExpenseInfo] = useState({
    amount: "",
    source: "",
    date: "",
    desc: "",
    id: uuidv4(),
    user_id: localStorage.getItem('user_id'),
  });
  const [expense, setExpense] = useState([])

  const [budgetInfo, setBudgetInfo] = useState({
    amount: "",
    source: "",
    time: "",
    desc: "",
    id: uuidv4(),
    user_id: localStorage.getItem('user_id'),
  });
  const [budget, setBudget] = useState([])


  const login = async (email, password) => {
    const res = await axios.post('http://localhost:3000/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalBudget, setTotalBudget] = useState(0)

  const findTotal = async() => {
      const token = localStorage.getItem("token");

      try{
        let newTotalIncome = 0;
        let newTotalExpense = 0;
        let newTotalBudget = 0;
        const req1 = await fetch("http://localhost:3000/income/all/"+user_id, {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
        if(!req1.ok){
          throw new Error(`Error ->  ${req1.status}`)
        }
        const incomes = await req1.json()
        if (incomes.result && Array.isArray(incomes.result) && incomes.result.length > 0) {
          newTotalIncome = incomes.result.reduce((sum, item) => sum + (item.amount || 0), 0)
        } 
        const req2 = await fetch("http://localhost:3000/expense/all/"+user_id, {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json" 
          }
        })
        if(!req2.ok){
          throw new Error(`Error ->  ${req2.status}`)
        }
        const expenses = await req2.json()
        if (expenses.result && Array.isArray(expenses.result) && expenses.result.length > 0) {
          newTotalExpense = expenses.result.reduce((sum, item) => sum + (item.amount || 0), 0);
        }
        const req3 = await fetch("http://localhost:3000/budget/all/"+user_id, {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json" 
          }
        })
        if(!req3.ok){
          throw new Error(`Error ->  ${req3.status}`)
        }
        const budgets = await req3.json()
        if (budgets.result && Array.isArray(budgets.result) && budgets.result.length > 0) {
          newTotalBudget = budgets.result.reduce((sum, item) => sum + (item.amount || 0), 0);
        }
        if (totalIncome !== newTotalIncome) setTotalIncome(newTotalIncome)
        if (totalBudget !== newTotalBudget) setTotalBudget(newTotalBudget)
        if (totalExpense !== newTotalExpense) setTotalExpense(newTotalExpense)
      }catch(err){
        handleError(err)
      }
    }

    const [recentIncome, setRecentIncome] = useState(null)
    const [recentExpense, setRecentExpense] = useState(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, incomeInfo, setIncomeInfo, income, setIncome, expenseInfo, setExpenseInfo, expense, setExpense, budgetInfo, setBudgetInfo, budget, setBudget, totalBudget, totalExpense, totalIncome, findTotal, recentIncome, setRecentIncome, recentExpense, setRecentExpense, setLoggedInUser, loggedInUser, setUserEmail, userEmail, user_id}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
