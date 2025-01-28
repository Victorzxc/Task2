import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardList from './components/BoardList';
import BoardCard from './components/BoardCard';
import Header from './components/Header';


function App() {
    return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<BoardList />} />
            <Route path="/board/:boardId" element={<BoardCard />} />
        </Routes>
    </Router>
    );
}

export default App;