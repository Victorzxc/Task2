import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import BoardForm from "./BoardForm"; 
// import {deleteBoard} from "../redux/boardsSlice"; 
 
 
function BoardList() { 
//    const boards = useSelector((state) => state.boards.boards); 
//    const dispatch = useDispatch(); 
 
    const handleDeleteBoard = (id) => { 
        dispatch(deleteBoard(id)) 
    } 
    return ( 
      <div className="board-list"> 
         <BoardForm /> 
          {/* {boards.map((board) => ( 
            <div key={board.id} className="board-item"> 
               <Link to={`/board/${board.id}`}>{board.title}</Link> 
                <button onClick={() => handleDeleteBoard(board.id)} className="delete-board">X</button> 
            </div> 
          ))}  */}
      </div> 
    ); 
  } 
 
 
export default BoardList; 