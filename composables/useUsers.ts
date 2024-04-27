const baseURL = 'https://crudapi.co.uk/api/v1';
const apiKey = 'IGi4PXK'; // Replace 'YOUR_API_KEY' with the actual API key

export const useUsers = () => {
  const fetcher = useFetch();

  const getAllUsers = async () => {
    try {
      const response = await fetcher(`${baseURL}/user`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetcher(`${baseURL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const response = await fetcher(`${baseURL}/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetcher(`${baseURL}/user`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  };

  return {
    getAllUsers,
    deleteUser,
    updateUser,
    addUser
  };
};
