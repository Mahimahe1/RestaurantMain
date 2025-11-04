import axios from "axios";
import { useState,useEffect } from "react";
import OrdersPage from "./OrdersPage";
import { LineChart,BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Orders from "./Orders";
import Paymentpage from "./Paymentpage";
import AddAddressForm from "./Address";
import Changeaddress from "./Changeaddress";
function Profits(){
    let [data,setdata]=useState([])
    let token=localStorage.getItem("token")
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/dayprofits/',{
            headers:{'Authorization':`Token ${token}`}
        }).then((resp)=>{
            const formatted = resp.data.map(item => ({
                day: item.day,
                profit: item.total_sum*0.2
                }));
                setdata(formatted);
        
        }).catch((err)=>{
            console.log(err)
        }) 
    },[]) 

    return(
    <div style={{ width: "100%", height: 400 }}>
      <h2 className="text-xl font-semibold mb-4">📊 Day-wise Profit Summary</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="profit" fill="#4F46E5" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <OrdersPage/>
    </div>
    );


};

export default Profits;