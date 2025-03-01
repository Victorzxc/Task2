import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList/Index';
import BoardCard from './components/BoardCard/Index';
import Header from "./components/Header/Index";
import AuthPage from './components/AuthPage/AuthPage';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


function AppRouter() {
  const [isLog, setIsLog] = useState(false);
  useEffect(() => {
    setIsLog(localStorage.getItem('priton') ? true : false)
  }, [])
  return (
    <>
      <Header />
      <Routes>
        <Route path='/'
          element={
            isLog ? <Navigate to={"/board"} replace /> : <AuthPage />
          }
        />
        <Route
          path="/board" element={<BoardList />} />
        <Route
          path="/board/:boardId" element={<BoardCard />} />
      </Routes>
    </>
  );
}

export default AppRouter;