// import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  // const navigate = useNavigate();

// //  const getUser = async () => {
// //    try {
// //        const response = await fetch("http://localhost:6001/login/success", { withCredentials: true });

//  //       console.log("response",response)
//   //  } catch (error) {
//  //     navigate("*")
//   //  }
// // }


// const getUser = async () => {
//   try {
//     const response = await fetch("http://localhost:6001/login/success", {
//       credentials: 'include' // Include credentials in the request
//     });
//     console.log("response", await response.json());
//   } catch (error) {
//     navigate("*");
//   }
// }



// useEffect(() => {
//   getUser()
// }, [])

  return (
    <div style={{textAlign:"center"}}>
        <h1>Dashboard</h1>
      </div>
  )
}

export default Dashboard