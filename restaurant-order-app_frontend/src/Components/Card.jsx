export default function Card({ item, addToCart }) {
  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      <img src={item.image} alt={item.name} className="w-32 h-32 object-cover"/>
      <h2 className="text-lg font-bold mt-2">{item.name}</h2>
      <p className="text-sm">{item.description}</p>
      <p className="font-semibold mt-1">₹{item.price}</p>
      <button onClick={() => addToCart(item)} className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700">
        Add to Cart
      </button>
    </div>
  );
}
