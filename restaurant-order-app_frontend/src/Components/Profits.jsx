import axios from "axios";
import { useState, useEffect } from "react";
import OrdersPage from "./OrdersPage";
import Filter from "./Filter";
import AllOrders from "./AllOrders";
import Piechart from "./Piechart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";


function Profits() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dayprofits/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((resp) => {
        const formatted = resp.data.map((item) => ({
          day: item.day,
          total: item.total_sum,
          profit: item.total_sum * 0.2,
        }));
        setData(formatted);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ width: "90%", height: 500, margin: 30, marginLeft: 60 }}>
      <h2 className="text-2xl font-semibold mb-8 text-indigo-700 " >
        📊 Day-wise Profit Summary
      </h2>
    
      <ResponsiveContainer>
        <BarChart
          data={data}
          barCategoryGap="25%"  // adds spacing between groups of bars
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis with styling and gap */}
          <XAxis
            dataKey="day"
            label={{
              value: "Dates",
              position: "insideBottom",
              offset: -2, // adds slight gap between axis and label
              style: { fontWeight: "bold", fill: "#040315ff", fontSize: 15 },
            }}
            tick={{
              fill: "#4F46E5",
              fontWeight: "bold",
              fontSize: 13,
            }}
            interval={0}
            tickMargin={10} // adds space between ticks and bars
          />

          {/* Y-axis */}
          <YAxis
            label={{
              value: "Total & Profit (₹)",
              angle: -90,
              position: "insideLeft",
              style: { fontWeight: "bold", fill: "#333", fontSize: 13 },
            }}
          />

          <Tooltip
            formatter={(value) => `₹${value.toLocaleString()}`}
            cursor={{ fill: "rgba(79,70,229,0.1)" }}
          />
          <Legend />

          {/* Total Bar */}
          <Bar dataKey="total" fill="rgba(71, 9, 69, 1)" name="Total Sales" radius={[5, 5, 0, 0]} />

          {/* Profit Bar */}
          <Bar dataKey="profit" fill="rgba(29, 17, 202, 0.9)" name="Profit (20%)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <Piechart/>
    </div>
  );
}

export default Profits;
