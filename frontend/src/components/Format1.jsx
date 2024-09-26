import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const Format1 = () => {
  const {
    incomeInfo,
    setIncomeInfo,
    income,
    setIncome,
    expenseInfo,
    setExpenseInfo,
    expense,
    setExpense,
    budgetInfo,
    setBudgetInfo,
    budget,
    setBudget,
  } = useContext(AuthContext);

  const location = useLocation();
  const currentPage = location.pathname;
  const currentData = currentPage.includes("/income")
  ? incomeInfo
  : currentPage.includes("/expense")
  ? expenseInfo
  : currentPage.includes("/budget")
  ? budgetInfo
  : {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && (!/^\d+$/.test(value) || Number(value) <= 0)) {
      handleError("Amount must be a number greater than zero.");
      return;
    }
    if (currentPage.includes("/income")) {
      setIncomeInfo({ ...incomeInfo, [name]: value });
    } else if (currentPage.includes("/expense")) {
      setExpenseInfo({ ...expenseInfo, [name]: value });
    } else if (currentPage.includes("/budget")) {
      setBudgetInfo({ ...budgetInfo, [name]: value });
    }
  };
  
  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    const {amount, source} = currentData
    if (!amount || !source || Number(amount) <= 0) {
      handleError("Incomplete or invalid information. Amount must be greater than zero.");
      return;
    }
    if (currentPage.includes("/income")) {
      const newItem = { id: uuidv4(), ...incomeInfo };
      setIncome([...income, newItem]);
      setIncomeInfo({
        amount: "",
        source: "",
        date: "",
        desc: "",
        user_id: localStorage.getItem('user_id'),
      });
      try {
        const url = `http://localhost:3000/income`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
          handleSuccess(message);
        } else{
          handleError(error || message);
        }
      } catch (err) {
        handleError(err);
      }
    } else if (currentPage.includes("/expense")) {
      const newItem = { id: uuidv4(), ...expenseInfo };
      setExpense([...expense, newItem]);
      setExpenseInfo({
        amount: "",
        source: "",
        date: "",
        desc: "",
        user_id: localStorage.getItem('user_id')
      });
      try {
        const url = `http://localhost:3000/expense`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
          handleSuccess(message);
        } else{
          handleError(error || message);
        }
      } catch (err) {
        handleError(err);
      }
    } else if (currentPage.includes("/budget")) {
      const newItem = { id: uuidv4(), ...budgetInfo };
      setBudget([...budget, newItem]);
      setBudgetInfo({
        amount: "",
        source: "",
        date: "",
        desc: "",
        user_id: localStorage.getItem('user_id')
      });
      try {
        const url = `http://localhost:3000/budget`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
          handleSuccess(message);
        } else{
          handleError(error, message);
        }
      } catch (err) {
        handleError(err);
      }
    }
  };

    const isIncomeOrExpensePage = location.pathname === '/income' || location.pathname === '/expense';
  const isBudgetPage = location.pathname === '/budget'

  return (
    <div className="flex">
      <div className="h-[90%] w-[90%] text-[#6c757d] text-2xl bg-gradient-to-r from-gray-100 to-blue-200 m-5 rounded-3xl px-10 py-5">
        <div className="flex  justify-between">
          <div className="space-y-5">
            <div>
              <label id="amount">Enter amount : </label>
              <input
                onChange={handleChange}
                type="text"
                value={currentData.amount}
                id="amount"
                name="amount"
                placeholder="Enter amount"
                className="p-1 border rounded-md focus:outline-none focus:ring focus:ring-primary"
                required
              />
            </div>
            <div>
              <label id="source">Enter category : </label>
              <input
                onChange={handleChange}
                type="text"
                value={currentData.source}
                id="source"
                name="source"
                placeholder="Enter category"
                className="p-1 border rounded-md focus:outline-none focus:ring focus:ring-primary"
                required
              />
            </div>
            <div>
              {isIncomeOrExpensePage ? (
                <div>
                <label id="date">Enter date : </label>
                <input
                  onChange={handleChange}
                  type="date"
                  value={currentData.date}
                  name="date"
                  id="date"
                  placeholder="Enter date"
                  className="p-1 text-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-primary"
                  required
                />
              </div>
              ) : isBudgetPage ? (
                <div>
              <label id="date">Enter duration : </label>
              <input
                onChange={handleChange}
                type="text"
                value={currentData.time}
                name="time"
                id="time"
                placeholder="Enter Time Duration"
                className="p-1 border rounded-md focus:outline-none focus:ring focus:ring-primary"
                required
              />
            </div>
              ) : (
                null 
              )}
            </div>
          </div>
          <div>
            <label htmlFor="" id="desc" className="mb-2 block">
              Enter description :{" "}
            </label>
            <textarea
              onChange={handleChange}
              name="desc"
              value={currentData.desc}
              id="desc"
              placeholder="Enter description"
              rows="4"
              cols="35"
              className="p-1 border rounded-md focus:outline-none focus:ring focus:ring-primary "
            ></textarea>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="bg-gray-700 w-52 rounded-full px-5 py-2 text-gray-300 mx-[35%] mt-6"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Format1;
