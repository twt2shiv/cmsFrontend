import { api } from "@/utils";
export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface SignupData {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }
  
  export const loginApi = async (credentials: LoginCredentials) => {
    const {data} = await api.post('/api/v1/user/login', credentials)
    console.log(data)
    return {data}
    
  };
  
  export const signupApi = async (data: SignupData) => {
    const response = await api.post('/api/v1/user/signup', data);
    return response.data;
  };
  
 
  