import React from "react";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import List from './List'
import AddListButton from './AddListButton'

function BoardCard() { 
    const { boardId } = useParams(); 
    const board = useSelector(state => state.boards.boards.find(board => board.id === boardId)); 
 
    if(!board) { 
        return <div>Board not found</div>; 
    } 
 
   return ( 
      <div className="board-card"> 
          <h2>{board.title}</h2> 
          <AddListButton boardId={boardId} /> 
         <div className="board-lists"> 
             <List boardId={boardId} /> 
         </div> 
      </div> 
    ); 
} 
 
export default BoardCard;