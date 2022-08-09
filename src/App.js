import React from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import AssetsTable from "./components/AssetsTable";
import UserTable from "./components/UserTable";
import Logs from "./components/Logs";
import Login from "./components/HomeScreen";
import { Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";

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
  return (
    
    <div>
      <Routes>

      
<Route path="/" element={<Login/>} exact />
<Route path="/Dashboard" element={<Dashboard/>} />
<Route path="/assets" element={<AssetsTable/>} />
<Route path="/users" element={<UserTable/>} />
<Route path="/logs" element={<Logs/>} />

</Routes>
    </div>

 
  );
}

export default App;
