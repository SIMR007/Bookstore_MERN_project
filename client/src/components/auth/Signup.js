import React, { Fragment, useState } from "react";
import useApiExistingUserData from "../../customhooks/GetData";
import  useApiCreateNewUserData  from "../../customhooks/PostData";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastError } from "../toast/Toast";
import classes from "./Auth.module.css"
import commonimagepath from "../commonimagepath/Commonimagepath";


const Signup = () => {
  const apiUrl = `http://localhost:6001/users`
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { existingUserData, loading: existingDataLoading, error: existingDataError } = useApiExistingUserData(apiUrl);
  const { createUserData, loading: creatingUserDataLoading, error: creatingUserDataError } = useApiCreateNewUserData(); // Use the custom hook for creating user data
 
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:6001/users/auth", {       //  express.js route path   which generate token
        //  express.js route path   which generate token
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Set the desired origin here
        }
      });

      if (!response.ok) {
        throw new Error("token generation is failed");
      }
      const data = await response.json();
      const token = data.token;
      console.log(data);
      // Check if the token is present
      if (token) {
        // Store the token in localStorage
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        navigate("auth/signups");
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
    }
  };




  async function CreateUserData(event) {
    event.preventDefault();
    try {
      const userData = {
       email: email,
       password: password,
     };
    const dataArray   =  existingUserData.data               // Getting existing user data               
    const foundUser = dataArray.find((user) => user.email === userData.email);       // checking user is alredy existed in the data or not 
     
    if (foundUser) {
      console.log("User found:", foundUser.email);
      // toast.success("User found successfully ", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      
//       toast.error(`${foundUser.email} already Exist!`, {
//         position: "top-right",
// autoClose: 5000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light"
//         });

<ToastError message={`user already Exist!`}> </ToastError>


      // navigate("/auth/login")
    } 
    else {
      const data = await createUserData(userData);
      if (data) {
        console.log("User created successfully");
        // if user is created , then token will be created
        handleSignUp();
      }
      console.log("--------", data);
    }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }
  }

const responseSuccessGoogle = (response)=> {
  console.log(response);
}

const responseErrorGoogle = (response)=> {

}


const SignupWithGoogle = ()=>{
  window.open("http://localhost:6001/auth/google/callback","_self")
}



  return (
    <Fragment>
      {(existingDataLoading || creatingUserDataLoading) && <p>Loading...</p>}
      {(existingDataError || creatingUserDataError) && <p>Error: {existingDataError || creatingUserDataError}</p>}
      
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

    <div className='Signup_main  md:h-screen flex items-center bg-cream-50'>
      <div className={`${classes.Signup} mx-auto  bg-cream-200 w-full md:py-16 md:px-24 px-6 py-6 `}>
        <h2 className={`${classes.Create_h2} text-center font-medium  text-#333333 mb-2`}>Create an account</h2>
        <p className='font-base text-#333333 text-center'>Already have an ccount? <Link to={"/auth/login"} className="underline text-dark font-medium">Log in </Link> </p>
        <form className=" md:mt-7 mt-7" action="#" method="POST">
        <div className='md:mb-10 mb-7'>
            <label htmlFor="email" className="block text-base font-normal leading-6 text-brown-50 mb-2">What should we call you?</label>
            <div className="mt-2">
              <input id="name" name="name" type="email" placeholder='Enter your profile name' autoComplete="name" className={`md:h-14 h-14 ${classes.inputStyle} p-2 block w-full  rounded-md  py-1.5  bg-transparent  placeholder:text-brown-50`} />
            </div>
          </div>
          <div className='md:mb-10 mb-7'>
            <label htmlFor="email" className="block text-base font-normal leading-6 text-brown-50 mb-2">What’s your email?</label>
            <div className="mt-2">
              <input id="email" name="email" type="email"  onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address' autoComplete="email" className={`md:h-14 h-14 ${classes.inputStyle} p-2 block w-full  rounded-md  py-1.5  bg-transparent  placeholder:text-brown-50`} />
            </div>
          </div>

          <div className='md:mb-10 mb-7'>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block font-normal leading-6 text-brown-50 text-base mb-2">Create a password</label>
            </div>
            <div className="">
              <input id="password" name="password" type="password"   onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' autoComplete="current-password" required className={`input-style md:h-14 h-14 p-2 block w-full bg-transparent ${classes.inputStyle}  rounded-md py-1.5    placeholder:text-brown-50 `} />
              <a href="#" className="font-normal text-brown-50">Use 8 or more characters with a mix of letters, numbers & symbols</a>
            </div>
          </div>

          <div>
            <p className='mb-4'>By creating an account, you agree to the <span className='underline '>Terms of use</span> and  <span className='underline'>Privacy Policy</span>. </p>
            <button type="submit" onClick={CreateUserData} className="Gradient_button text-white font-medium  rounded-full">Create an account</button>
          </div>
        <div className='md:mt-7 mt-7'>
          <p className='text-2xl text-brown-50 mb-4'>OR Continue with</p>
          <div className='md:grid-cols-3 grid items-center flex-wrap gap-4'>
            <div className='login_continue  py-2 md:px-10 px-6 flex justify-center  items-center gap-2 rounded-full bg-cream-220 border border-cream-250'>
            <img src={commonimagepath("Social_media_Facebook_logo.svg")} alt="Social_media_Google_logo"  />

              <p className={`${classes.login_continue_p} text-#333333`}>Facebook</p>
            </div>
            <div onClick={SignupWithGoogle} className='login_continue  py-2 md:px-10 px-6 flex items-center justify-center gap-2 rounded-full bg-cream-220 border border-cream-250'>
            <img src={commonimagepath("Social_media_Google_logo.svg")} alt="Social_media_Google_logo"  />
              <p className={`${classes.login_continue_p} text-#333333`}>Google</p>
            
            </div>
            <div className='login_continue  py-2 md:px-10 px-6 flex items-center justify-center gap-2 rounded-full bg-cream-220 border border-cream-250'>
            <img src={commonimagepath("Social_media_Apple_logo.svg")} alt="Social_media_Apple_logo"  />
              <p className={`${classes.login_continue_p} text-#333333`}>Apple</p>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>




















                  </Fragment>
  );
};

export default Signup;
