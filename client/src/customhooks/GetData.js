import { useState, useEffect } from 'react';

const useApiExistingUserData = (apiUrl) => {                                        //GET data
  const [existingUserData, setexistingUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchexistingUserData = async () => {
        try {
            setLoading(true)
            const existingUsers = await fetch(apiUrl);       //  getting existing users first 
            if (!existingUsers.ok) {
                throw new Error('Failed to fetch existingUserData');
              }
            const responseData = await existingUsers.json()
            setexistingUserData(responseData);

            console.log('Custom hook is running!');
        } catch (error) {
            setError(error.message);
        }finally {
            setLoading(false);
          }
    };

    fetchexistingUserData();
  }, [apiUrl]);

  return { existingUserData, loading, error };
};

export default useApiExistingUserData;



