import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from './store/store';
import { useEffect } from "react";
import { getToken } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(getToken())
  },[])
  return (
    <>
      <div>
        <Outlet />
        <ToastContainer autoClose={2000} theme="dark"/>
      </div>
    </>
  );
}

export default App;
