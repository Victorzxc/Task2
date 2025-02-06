import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList/Index';
import BoardCard from './components/BoardCard/Index';
import Header from "./components/Header/Index";

function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/board/:boardId" element={<BoardCard />} />
      </Routes>
    </>
  );
}

export default AppRouter;