
import { Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList/Index';
import BoardCard from './components/BoardCard/Index';
import Header from "./components/Header/Index";
import AuthPage from './components/AuthPage/AuthPage';
import { Navigate } from 'react-router-dom';
import { HOME_PATH, BOARD_LIST_PATH, BOARD_DETAIL_PATH } from './constants/routes';


function AppRouter() {
    const isLog = localStorage.getItem('priton');
  return (
    <>
      <Header />
      <Routes>
        <Route path={HOME_PATH}
          element={
            isLog ? <Navigate to={BOARD_LIST_PATH} replace /> : <AuthPage />
          }
        />
        <Route
          path={BOARD_LIST_PATH} element={<BoardList />} />
        <Route
          path={BOARD_DETAIL_PATH} element={<BoardCard />} />
      </Routes>
    </>
  );
}

export default AppRouter;