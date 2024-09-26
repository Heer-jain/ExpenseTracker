import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { handleError } from '../utils'

ChartJS.register(Tooltip, ArcElement, Legend)

const ExpensePie = ({page}) => {

  const user_id = localStorage.getItem('user_id')

    const [data, setData] = useState({
        labels: [],
    datasets: [
      {
        data: [], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
    })

    useEffect(() => {
      const fetchData = async() => {
        const token = localStorage.getItem("token")
        try{
            const req = await fetch(`http://localhost:3000/${page}/all/`+user_id, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (!req.ok) {
              throw new Error(`Error -> ${req.status}`);
            }
            const product = await req.json();
            const dataLabel = product.result.map(item => item.source)
            const dataValue = product.result.map(item => item.amount)
            setData({
                labels: dataLabel, 
                datasets: [
                    {
                        label: 'Rs.',
                        data: dataValue, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            })
      }catch(err){
        handleError(err)
      }}

      fetchData()
    }, [])

    
    

  return (
    <div className='h-80'>
        <Pie  data={data}/>
    </div>
  )
}

export default ExpensePie
