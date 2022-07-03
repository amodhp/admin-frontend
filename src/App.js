import React from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import AssetsTable from "./components/AssetsTable";
import UserTable from "./components/UserTable";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Login from "./components/HomeScreen";

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
    <Router>

      
        <Route path="/" component={Login} exact />
        <Route path="/assets" component={AssetsTable} />
        <Route path="/users" component={UserTable} />

    </Router>

 
  );
}

export default App;
