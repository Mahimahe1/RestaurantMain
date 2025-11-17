import axios from "axios";
import { useState, useEffect } from "react";
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
  const [selectedDay, setSelectedDay] = useState(null);
  const [mode, setMode] = useState("day"); // ➤ day | week | month
  const token = localStorage.getItem("token");

  useEffect(() => {
    let url = "";

    if (mode === "day") url = "http://127.0.0.1:8000/api/dayprofits/";
    if (mode === "week") url = "http://127.0.0.1:8000/api/weekprofits/";
    if (mode === "month") url = "http://127.0.0.1:8000/api/monthprofits/";

    axios
      .get(url, { headers: { Authorization: `Token ${token}` } })
      .then((resp) => {
        const formatted = resp.data.map((item) => ({
          label:
            mode === "day"
              ? item.day
              : mode === "week"
              ? `Week ${item.week}`
              : item.month,
          total: item.total_sum,
          profit: item.total_sum * 0.2,
        }));
        setData(formatted);
      });
  }, [mode]);

  const onBarClick = (barData) => {
    if (mode === "day" && barData?.activeLabel) {
      setSelectedDay(barData.activeLabel);
    }
  };

  return (
    <div style={{ width: "90%", height: 500, margin: 30, marginLeft: 60 }}>

      {/* MODE SELECTOR BUTTONS */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${mode === "day" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("day")}
        >
          Daily
        </button>

        <button
          className={`px-4 py-2 rounded ${mode === "week" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("week")}
        >
          Weekly
        </button>

        <button
          className={`px-4 py-2 rounded ${mode === "month" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("month")}
        >
          Monthly
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-8 text-indigo-700">
        📊 {mode.toUpperCase()} Profit Summary
      </h2>

      <ResponsiveContainer>
        <BarChart
          data={data}
          onClick={mode === "day" ? onBarClick : null}
          barCategoryGap="15%"
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
            tick={{ fill: "#4F46E5", fontWeight: "bold", fontSize: 13 }}
            interval={0}
            tickMargin={10}
          />

          <YAxis />

          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          <Legend />

          <Bar dataKey="total" fill="#65251cc0" name="Total Sales" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#297f37ff" name="Profit (20%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {mode === "day" && <Piechart selectedDay={selectedDay} />}
    </div>
  );
}

export default Profits;
