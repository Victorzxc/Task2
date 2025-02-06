import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBoard } from '../../redux/boardsSlice';
import './styles.css';


function BoardForm() {
   const [title, setTitle] = useState('');
   const dispatch = useDispatch();
   const [showForm, setShowForm] = useState(false);

   const handleShowForm = () => {
      setShowForm(true);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (title.trim()) {
         dispatch(addBoard(title));
         setTitle('');
         setShowForm(false);
      }
   };

   const handleCloseForm = () => {
      setShowForm(false);
      setTitle('');
   }

   return (
      <div>
         {!showForm && (
            <button onClick={handleShowForm} className="add-board-button">Новая доска +</button>
         )}
         {showForm && (
            <div className="board-form-wrapper">
               <form onSubmit={handleSubmit} className="board-form">
                  <input type="text" placeholder="Название доски" maxLength={30} value={title} onChange={(e) => setTitle(e.target.value)} />
                  <div className="buttons-wrapper">
                     <button type="submit" className="button save">Сохранить</button>
                     <button type="button" className="button cancel" onClick={handleCloseForm}>Отменить</button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}

export default BoardForm;