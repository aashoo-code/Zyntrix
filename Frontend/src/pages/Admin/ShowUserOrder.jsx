import OrderCard from '@/components/OrderCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShowUserOrder = () => {
  const params = useParams()
  const [userOrder, setUserOrder] = useState([])
  const getUserOrders = async() => {
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/order/user-order/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if(res.data.success){
      setUserOrder(res.data.orders)
    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])
  console.log(userOrder );
  
  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-950
                via-slate-900
                to-slate-800
                backdrop-blur-xl
                p-8">
  <OrderCard userOrder={userOrder} />
</div>
  )
}

export default ShowUserOrder