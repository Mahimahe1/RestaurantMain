import React, { useEffect, useState } from "react";
import axios from "axios";

import Orders from "./Orders";

export default function OrdersPage() {
let token = localStorage.getItem("token");
const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Order/",{
      headers:{'Authorization':`Token ${token}`
      }
    })
      .then((res) => {setOrders(res.data);
        console.log(res.data)
      })
      .catch(err => console.error(err));
  }, []);
  return <Orders orders={orders} />;
}
