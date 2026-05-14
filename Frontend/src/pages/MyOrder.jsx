import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
const MyOrder = () => {
  const [userOrder, setUserOrder] = useState(null);

  const getUserOrder = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/order/myOrder`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.data.success) {
      setUserOrder(res.data.orders);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
  <>
  <OrderCard userOrder={userOrder}/>
  </>
  );
};

export default MyOrder;
