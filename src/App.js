import React from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import AssetsTable from "./components/AssetsTable";
import UserTable from "./components/UserTable";
import Logs from "./components/Logs";
import Login from "./components/HomeScreen";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Requests from "./Pages/Requests";

const fetchedProducts = [
  {
    id: "1",
    name: "First",
    thumbnail:
      "https://image.shutterstock.com/image-photo/box-260nw-421311163.jpg",
  },
  {
    id: "2",
    name: "Second",
    thumbnail:
      "https://image.shutterstock.com/image-photo/box-260nw-421311163.jpg",
  },
];
const fetchedStockEvents = [
  { id: 1, type: "add", qty: 100, product: fetchedProducts[0] },
  { id: 2, type: "remove", qty: -20, product: fetchedProducts[0] },
  { id: 3, type: "rekove", qty: -10, product: fetchedProducts[0] },

  { id: 4, type: "add", qty: 120, product: fetchedProducts[1] },
  { id: 5, type: "remove", qty: -40, product: fetchedProducts[1] },
];
function App() {
  function PrivateRoute({ children }) {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
        return <Navigate to="/"  />
    }
    return children;
}



  return (
    
    <div>
<Routes>
<Route path="/" element={<Login/>} exact />
<Route path="/Dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
<Route path="/assets" element={<PrivateRoute><AssetsTable/></PrivateRoute>} />
<Route path="/users" element={<PrivateRoute><UserTable/></PrivateRoute>} />
<Route path="/logs" element={<PrivateRoute><Logs/></PrivateRoute>} />
<Route path="/requets" element={<PrivateRoute><Requests/></PrivateRoute>} />

</Routes>
    </div>

 
  );
}

export default App;
