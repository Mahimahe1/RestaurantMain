import { useEffect, useState } from "react";
import axios from "axios";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Piechart({ selectedDay, filterType }) {

  // 🔥 FIX: If parent does NOT send filterType → set default = "day"
  const finalFilter = filterType || "day";

  const [dataObj, setDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedDay) return;

    setLoading(true);

    const apiURL = `http://127.0.0.1:8000/api/orders-by-${finalFilter}/${selectedDay}/`;

    console.log("API URL Called:", apiURL);

    axios
      .get(apiURL)
      .then((res) => {
        console.log("API Response:", res.data);
        setDataObj(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setDataObj(null);
        setLoading(false);
      });
  }, [selectedDay, finalFilter]); // 🔥 FIXED DEPENDENCY


  if (!selectedDay)
    return (
      <p className="text-center text-xl font-semibold mt-10">
        👉 Select a {finalFilter} to show item-wise sales pie chart
      </p>
    );

  if (loading)
    return <p className="text-center text-lg font-semibold mt-5">Loading...</p>;

  if (!dataObj)
    return (
      <p className="text-center text-xl font-semibold mt-5">
        No data found for this {finalFilter}.
      </p>
    );

  const pieData = dataObj.pie_chart || [];
  const itemsList = pieData;

  if (pieData.length === 0)
    return (
      <p className="text-center text-xl font-semibold mt-5">
        No item sales found for this {finalFilter}.
      </p>
    );

  const labels = pieData.map((p) => p.name);
  const values = pieData.map((p) => p.quantity);

  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const explodeOffsets = values.map((_, i) => (i === maxIndex ? 30 : 0));

  const data = {
    labels,
    datasets: [
      {
        label: "Items Sold",
        data: values,
        offset: explodeOffsets,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-8 mt-14">
      <h1 className="text-3xl text-center font-bold mb-8">
        📅 Item Sales – {finalFilter.toUpperCase()} : {selectedDay}
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
        <Pie data={data} options={{ responsive: true }} />
      </div>

      <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">📦 Quantity Per Item</h2>

        <ul className="space-y-2">
          {itemsList.map((item, index) => (
            <li key={index} className="flex justify-between p-3 rounded-lg bg-gray-100">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">📊 Summary</h2>

        <p className="text-lg font-semibold">
          Total Quantity Sold:{" "}
          <span className="text-blue-600">{dataObj.total_quantity}</span>
        </p>

        <p className="text-lg font-semibold">
          Total Sales:{" "}
          <span className="text-green-600">₹{dataObj.total_sales}</span>
        </p>
      </div>
    </div>
  );
}

export default Piechart;
