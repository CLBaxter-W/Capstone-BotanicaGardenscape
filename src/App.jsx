import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Garden from "./components/Garden";
import User from "./components/User";
// import { useState } from "react";
import Protected from "./components/Protected.jsx";
import Nav_Bar from "./components/Nav_Bar.jsx";
import Garden_fixed from "./components/Garden_fixed.jsx";

function App() {
  const [allPlants, setAllPlants] = useState([]);
  return (
    <Provider store={store}>
      <div>
        <Nav_Bar />

        <Routes>
          <Route path="/user/" element={<Protected />}>
            <Route path="/user/" element={<User />}></Route>
          </Route>
          <Route path="/garden" element={<Protected />}>
            <Route path="/garden" element={<Garden />}></Route>
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route
            path="/gf"
            element={
              <Garden_fixed allPlants={allPlants} setAllPlants={setAllPlants} />
            }
          ></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
