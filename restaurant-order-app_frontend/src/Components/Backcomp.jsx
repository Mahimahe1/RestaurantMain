import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  return (
    <button
  onClick={() => navigate(-1)}
  className="text-2xl font-bold text-gray-700 hover:text-black"
>
  &lt;
</button>

  );
}

export default MyComponent;
