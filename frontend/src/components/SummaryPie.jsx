import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js'
import { useContext } from 'react'
import { Pie } from 'react-chartjs-2'
import { AuthContext } from '../context/AuthContext'

ChartJS.register(Tooltip, ArcElement, Legend)

const SummaryPie = () => {

    const {totalExpense, totalIncome} = useContext(AuthContext)

    const options = {
        responsive: true,
        plugins:{
            title:{
                display: true,
                text: "This graph show savings and expenses from total income",
                color: "black",
                font:{
                    size: 18
                }
            },
            legend:{
                position: 'bottom'
            }
        },
        maintainAspectRatio: false
    }

    const data = {
        labels: ["Expenses", "Savings"],
        datasets: [
            {
                label: "amount",
                data: [totalExpense, totalIncome - totalExpense],
                backgroundColor: [
                    "#6c757d",
                    "#007bff",
                ],
                hoverOffset : 4,
            }
        ]
    }

  return (
    <div className='h-80'>
        <h1 className='text-xl text-center mt-auto m-2 text-[#6c757d]'>Your expenses and savings from your total income</h1>
        <Pie options={options} data={data}/>
    </div>
  )
}

export default SummaryPie
