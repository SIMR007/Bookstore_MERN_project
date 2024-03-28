import React, {  useRef } from "react";
import useApiExistingUserData from "../../customhooks/GetData";
// import  useApiCreateNewUserData  from "../customhooks/PostData";
import { useNavigate } from "react-router-dom";
import classes from "./Auth.module.css"
import {  ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import commonImagePath from "../commonimagepath/Commonimagepath";

function Login() {

  const apiUrl = `http://localhost:6001/users`

  const { existingUserData, loading: existingDataLoading, error: existingDataError } = useApiExistingUserData(apiUrl);
  // const { createUserData, loading: creatingUserDataLoading, error: creatingUserDataError } = useApiCreateNewUserData(); // Use the custom hook for creating user data

  const navigate = useNavigate();
  const userNameorEmail = useRef();
  const password = useRef()


  const loginHandler = async(event) => {
    event.preventDefault();

    const enteredUserNameorEmail = userNameorEmail.current.value;
    const enteredPassword = password.current.value;

    const loginFormData = {
      email: enteredUserNameorEmail,
      password: enteredPassword,
    };

    userNameorEmail.current.value = "";
    password.current.value = "";

    // props.onFormLogin(loginFormData);


    const dataArray   =  existingUserData.data               // Getting existing user data  

    const authenticatedUser = dataArray.find((user) =>     // checking user is valid in the data or not 
        user.email === loginFormData.email &&
        user.password === loginFormData.password
        );

if (authenticatedUser) {
  
  handleSignUp()

  // toast.success("User LoggedIn successfully ", {
  //   position: toast.POSITION.TOP_CENTER,
  // });
} else {
  // User is not authenticated; you can show an error message or perform other actions
            console.log("Invalid username and password")
            alert("Invalid username and password")
            return
  // toast.error("Wrong username or password !", {
  //   position: toast.POSITION.TOP_LEFT,
  // });
}
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:6001/users/auth", {       //  express.js route path   which generate token
        //  express.js route path   which generate token
        method: "POST",
        // body:JSON.stringify(userNameorEmail),
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
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
    }
  };

     
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: "624564496334-d5limfgeqi1u549ttd1q5u0bvdrlaftd.apps.googleusercontent.com",
  //       scope: 'email',
  //     });
  //   }
    
  //   gapi.load('client:auth2', start);
  // }, []);

  const loginwithgoogle = ()=>{
    
    window.open("http://localhost:6001/auth/google/callback","_self")
}

  const loginwithfacebook = ()=>{
    
    window.open("http://localhost:6001/auth/facebook/callback","_self")
}



    return (
      <>
        {(existingDataLoading ) && <p>Loading...</p>}
      {(existingDataError ) && <p>Error: {existingDataError}</p>}

        <div className='Sign_in_main bg-cream-50 md:h-screen flex items-center'>
            <div className={`${classes.Sign_in} gap-y-12 bg-cream-200 mx-auto  md:p-12 p-6 grid md:grid-cols-2`}>
                <div className='Sign_in_form '>
                    <div className="flex  flex-col justify-center  md:pe-12 md:border-e border-cream-50">
                        <div className="sm:mx-auto sm:w-full ">
                            <h2 className=" text-center font-bold text-brown">Welcome back</h2>
                            <p className={`${classes.Sub_P} text-center text-brown-50`}>We’re so excited to see you again!</p>
                        </div>

                        <div className="mt-10  sm:mx-auto sm:w-full ">
                            <form className="space-y-6" onSubmit={loginHandler}>
                                <div>
                                    <label htmlFor="email" className="block text-base font-normal leading-6 text-brown-50 mb-2">Email or phone number</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email"  ref={userNameorEmail} autoComplete="email" className={`md:h-14 h-10 ${classes.inputStyle} p-2 block w-full  rounded-md  py-1.5  bg-transparent  placeholder:text-gray-400`} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block font-normal leading-6 text-brown-50 text-base mb-2">Password</label>
                                    </div>
                                    <div className="">
                                        <input id="password" name="password" type="password"  ref={password} autoComplete="current-password" required className={`input-style md:h-14 h-10 p-2 block w-full bg-transparent ${classes.inputStyle}  rounded-md py-1.5    placeholder:text-gray-400 `}/>
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="Gradient_button  font-medium text-white rounded-full" onClick={loginHandler}>Log in</button>
                                </div>
                            </form>

                            <p className="mt-10  text-center text-sm text-gray-500">
                                Not a member?
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                            </p>

                            <div onClick={loginwithgoogle} className='login_continue mb-3  py-2 md:px-10 px-6 flex items-center justify-center gap-2 rounded-full bg-cream-220 border border-cream-250'>
            <img src={commonImagePath("Social_media_Google_logo.svg")} alt="Social_media_Google_logo"  />
              <p className={`${classes.login_continue_p} text-#333333`}>Continue with Google</p>
            
            </div>
                            <div onClick={()=>{}} className='login_continue  py-2 md:px-10 px-6 flex items-center justify-center gap-2 rounded-full bg-cream-220 border border-cream-250'>
            <img src={commonImagePath("Social_media_Facebook_logo.svg")} alt="Social_media_Facebook_logo"  />
              <p className={`${classes.login_continue_p} text-#333333`}>Continue with Facebook</p>
            
            </div>
                        </div>
                    </div>  
                </div>
                <div className='Sign_in_scan flex flex-col items-center justify-center text-center'>
                    <img src={commonImagePath("QR_Code.svg")} alt='' className='mx-auto  ' />
                    <h2 className="mt-10 text-center font-bold text-brown">Log in with QR code</h2>
                    <p className={`${classes.Sub_P} text-center text-brown-50`}>We’re so excited to see you again!</p>
                </div>
            </div>
            <ToastContainer />
        </div>
      </>
    )
}

export default Login
