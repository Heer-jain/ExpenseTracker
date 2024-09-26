import React, {useEffect, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { handleError } from '../utils'

const Recent = ({recent}) => {

    const {setRecentExpense, setRecentIncome} = useContext(AuthContext)
    const user_id = localStorage.getItem('user_id')

    const fetchRecent = async() => {
        const token = localStorage.getItem("token")

        try {
            const recEx = await fetch("http://localhost:3000/income/recent/"+user_id, {
                method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
            if(!recEx.ok){
                throw new Error(recEx.status)
            }
            const incomeData = await recEx.json()
            if (incomeData.result && incomeData.result.length > 0) {
                setRecentIncome(incomeData.result);
              }
        }catch(err){
            handleError(err)
        }

        try {
            const recEx = await fetch("http://localhost:3000/expense/recent/"+user_id, {
                method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
            if(!recEx.ok){
                throw new Error(recEx.status)
            }
            const expenseData = await recEx.json()
            if (expenseData.result && expenseData.result.length > 0) {
                setRecentExpense(expenseData.result);
              }
        }catch(err){
            handleError(err)
        }
    }

    useEffect(() => {
      fetchRecent()
    }, [])

  return (
    <div>
      {Array.isArray(recent) && recent.length > 0 ? (
        recent.map((item, index) => (<React.Fragment key={item.id}>
            <div className='text-lg'>
                <div>Amount : Rs. {item.amount}</div>
                <div>Category: {item.source}</div>
            </div>
            {index < recent.length -1 && (
                <div className='h-[1px] bg-slate-500 my-3'></div>
            )}
        </React.Fragment>
        ))
      ) : (
        <p className='text-red-500 text-2xl m-auto'></p>
      )}
    </div>
  )
}

export default Recent
