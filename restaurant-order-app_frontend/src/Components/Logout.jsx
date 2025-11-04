import { useEffect } from "react";
import axios from "axios";
function Logout(){
    useEffect(()=>{
        const token = localStorage.getItem("token");

        axios.post("http://127.0.0.1:8000/api/logout/", {}, {
        headers: { Authorization: `Token ${token}` }
        })
        .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        alert("Logged out successfully!");
        })
        .catch(err => console.log(err));
    },[])
}

export default Logout;