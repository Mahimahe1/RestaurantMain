import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

export const getMenuItems = async () => {
  const res = await axios.get(`${BASE_URL}/menu`);
  return res.data;
};

export const placeOrder = async (order) => {
  const res = await axios.post(`${BASE_URL}/orders`, order);
  return res.data;
};