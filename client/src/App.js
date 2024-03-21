import React from "react";
import Home from "./pages/Home/Home";
import {
  Routes,
  Route,
  BrowserRouter,
  
} from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/dashboard/Dashboard";
import Error from "./components/error/Error"
import Navbar from "./components/navbar/Navbar";


export default function App() {


  return (
    <>
    {/* <BrowserRouter> */}
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/auth/login' element={<Login/>}/>
    <Route path='/auth/signup' element={<Signup/>}/>

        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        
        <Route path='*' element={<Error />} />
    {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
    {/* <Route path='/books/create' element={<CreateBook/>}/>
    <Route path='/books/details/:id' element={<ShowBook/>}/>
    <Route path='bssooks/edit/:id' element={<EditBook/>}/>
  <Route path='books/delete/:id' element={<DeleteBook/>}/> */}
  </Routes>
  {/* </BrowserRouter> */}
  <ToastContainer />
  </>
  )
}