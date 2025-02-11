import axios, { AxiosError } from 'axios';

interface StoreUserPayload {
  email: string;
  userToken: string;
}

const API_BASE_URL = `/api`;

const storeUser = async (payload: StoreUserPayload): Promise<void> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/sign-up`,
      payload,
      { withCredentials: true } // Include credentials only if required
    );

    console.log('User stored successfully:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};


export const UserApi = {
  storeUser
};
