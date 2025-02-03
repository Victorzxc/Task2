import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList';
import BoardCard from './components/BoardCard';
import Header from "./components/Header";

function AppRouter() {
  return (
    <>
      <Header /> { }
      <Routes>
        <Route path="/" element={<BoardList />} />  { }
        <Route path="/board/:boardId" element={<BoardCard />} /> { }
      </Routes>
    </>
  );
}

export default AppRouter;