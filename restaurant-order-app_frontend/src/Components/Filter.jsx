import axios from "axios";
import { useEffect, useState } from "react";

function Filter() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    price_min: "",
    price_max: ""
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    const params = {};

    if (filters.category) params.category = filters.category;
    if (filters.price_min) params.price_min = filters.price_min;
    if (filters.price_max) params.price_max = filters.price_max;

    const res = await axios.get("http://localhost:8000/api/products", {
      params: params
    });

    setProducts(res.data);
  };

  return (
    <div>
      <select
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) =>
          setFilters({ ...filters, price_min: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) =>
          setFilters({ ...filters, price_max: e.target.value })
        }
      />

      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} – ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
