import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const ToastError = ( p ) => {
  console.log(p.message);

  // Call toast.error outside the JSX return statement
  toast.error(p.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  // Return null or any other content (e.g., an empty div)
  return (
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
  )
};










// import { toast, ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";


// export function Example() {
//   const notify = () => {
//     toast("Default Notification !");

//     toast.success("Success Notification !", {
//       position: "top-center"
//     });

//     toast.error("Error Notification !", {
//       position: "top-left"
//     });

//     toast.warn("Warning Notification !", {
//       position: "bottom-left"
//     });

//     toast.info("Info Notification !", {
//       position: "bottom-center"
//     });

//     toast("Custom Style Notification with css class!", {
//       position: "bottom-right",
//       className: 'foo-bar'
//     });
//   };

//    return (
//       <>
//         <button onClick={notify}>Notify</button>;
//         <ToastContainer />
//       </>
//     );
// }