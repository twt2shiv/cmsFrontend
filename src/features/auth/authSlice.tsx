// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApi, signupApi, LoginCredentials, SignupData } from './authApi';
import { toast } from 'react-toastify';
import { api } from '@/utils';

interface AuthState {
  isAuthenticated: boolean;
  isVerified:boolean;
  user: { fullName: string; username: string; email: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading :boolean;
  signup:boolean;
  token:string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null,
  isVerified: false,
  isLoading:false,
  signup:false,
  token : null
};

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials) => {
    return await loginApi(credentials);
  }
);

export const signupUserAsync = createAsyncThunk(
  'auth/signupUser',
  async (user: SignupData) => {
    return await signupApi(user);
  }
);

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async () => {
    const data = await api.get('/api/v1/user/verify-user');    
    return {data}
  }
);
export const loggOutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    const data = await api.get('/api/v1/user/logout')
    return data
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
    getToken:(state)=>{
      state.token = localStorage.getItem("token")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      
      })
      .addCase(loginUserAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.isVerified = true
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("token", action.payload.data.data.accessToken);
       state.token = localStorage.getItem("token")
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      
      })
      .addCase(signupUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUserAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
        toast.success("signup successfully")
        state.signup = true
        
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to signup';
      })
      .addCase(verifyUser.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true
      })
      .addCase(verifyUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.isVerified = true;
        state.user = action.payload;
        state.error = null;
        state.isLoading = false
        console.log("verify user",action.payload)
      })
      .addCase(verifyUser.rejected, (state) => {
        state.status = 'failed';
        state.isVerified = false;
        state.user = null;
        state.isLoading = false
      })
      .addCase(loggOutUser.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true
      })
      .addCase(loggOutUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.isVerified = false;
        state.error = null;
        state.isLoading = false
        console.log("logout user",action.payload)
        toast.success("logout successfull")
      })
      .addCase(loggOutUser.rejected, (state) => {
        state.status = 'failed';
        state.isVerified = false;
        state.user = null;
        state.isLoading = false
      });
  },
});

export const { logout,getToken } = authSlice.actions;
export default authSlice.reducer;
