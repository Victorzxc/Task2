import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import List from './List';
import AddListButton from "./AddListButton";


function BoardCard() {
   const { boardId } = useParams();
   const board = useSelector(state => state.boards.boards.find(board => board.id === boardId));

   useEffect(() => {
      console.log("Board ID in BoardCard:", boardId);
   }, [boardId]);

   if (!board) {
      return <div>Доска не найдена</div>;
   }

   return (
      <div className="board-card">
         <div>
            <h2>{board.title}
            </h2>
         </div>
         <div>

            <AddListButton boardId={boardId} />

            <div className="board-lists">
               <List boardId={boardId} />
            </div>
         </div>
      </div>
   );
}


export default BoardCard;