import {useState} from "react";
 const useApiCreateNewUserData = () => {                //  POST data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const createUserData = async (userData) => {
      try {
        setLoading(true);
  
        const response = await fetch('http://localhost:6001/users', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // Set the desired origin here
          }
        });
  
        if (!response.ok) {
          throw new Error('Signup failed');
        }
  
        const data = await response.json();
        setLoading(false);
        return data;
  
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error('Error during Sign Up:', error);
      }
    };
  
    return { createUserData, loading, error };
  };
  
  export default useApiCreateNewUserData
  
  