import axios from 'axios';
import { api } from './api';

type SignInRequestData = {
  email: string;
  password: string;
}

type SignInResponseData = {
  token: string;
  user: {
    name: string;
    email: string;
    avatar_url: string;
  }
}

export async function signInRequest(data: SignInRequestData): Promise<SignInResponseData> {
  const response = await api.post("/access", data);
  return response.data;
}

export async function recoverUserInformation() {
  const response = await axios.get('/api/users/me');
  return { user: response.data };
}
