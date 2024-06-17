import { RootState } from '@/store/store';
import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  children: ReactNode;
  authentication?: boolean;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ children}) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
 useEffect(()=>{
  if (!token) {
    navigate("/login");
  }else{
    navigate("/")
  }
 },[token])
  return <>{children}</>
};

export default ProtectedRoute;
