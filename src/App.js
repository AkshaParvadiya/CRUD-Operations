import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import AddUser from "./component/AddUser";
import ListUserData from "./component/ListUserData";
import EditUser from "./component/EditUser";
import Navbar from "./component/Navbar";


const App = () =>{
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ListUserData/>}></Route>
        <Route path="/AddUser" element={<AddUser/>}></Route>
        <Route path="/EditUser/:id" element={<EditUser/>}></Route>
      </Routes>
    </Router>
  )
}
export default App;