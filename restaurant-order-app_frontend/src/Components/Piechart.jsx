import { useEffect, useState } from "react";
import axios from "axios";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

// Register everything
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Piechart() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Allorders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // ----------- CALCULATE TOTAL QUANTITIES -----------
  const totals = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const name = item.category?.name;
      const qty = item.quantity;

      if (!totals[name]) totals[name] = 0;
      totals[name] += qty;
    });
  });

  const labels = Object.keys(totals);
  const values = Object.values(totals);

  // ----------- FIND THE LARGEST ITEM -----------
  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const maxItemName = labels[maxIndex];

  // highlight biggest slice
  const explodeOffsets = values.map((v, i) => (i === maxIndex ? 30 : 0));

  // ----------- PIE CHART DATA -----------
  const data = {
    labels,
    datasets: [
      {
        label: "Total Quantity Sold",
        data: values,
        offset: explodeOffsets,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(99, 102, 241, 0.8)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  // ----------- OPTIONS -----------
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Total Items Sold (Top Item Highlighted)",
        font: { size: 20, weight: "bold" },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 16,
        },
        formatter: (value) => value,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-4xl text-center font-bold mb-10">
        🍕 Item Sales Pie Chart
      </h1>

      {/* PIE CHART */}
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
        <Pie data={data} options={options} />
      </div>

      {/* ITEM + QUANTITY LIST */}
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          📦 Total Quantity Per Item
        </h2>

        <ul className="space-y-3">
          {labels.map((item, index) => (
            <li 
              key={item}
              className={`flex justify-between text-lg p-3 rounded-lg ${
                item === maxItemName 
                  ? "bg-green-100 font-bold text-green-700" 
                  : "bg-gray-100"
              }`}
            >
              <span>{item}</span>
              <span>{values[index]}</span>
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default Piechart;
