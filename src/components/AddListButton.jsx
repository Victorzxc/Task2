import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../redux/listsSlice';

function AddListButton({boardId}) {
    const [title, setTitle] = useState('');
     const dispatch = useDispatch();
     const [showForm, setShowForm] = useState(false);


     const handleShowForm = () => {
        setShowForm(true);
     };

     const handleSubmit = (e) => {
        e.preventDefault();
       if (title.trim()) {
            dispatch(addList({boardId, title}));
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
             <button onClick={handleShowForm} className="add-list-button">Добавить список +</button>
           )}
          {showForm && (
             <div className="list-form-wrapper">
                 <form onSubmit={handleSubmit} className="list-form">
                     <input type="text" placeholder="Список"  value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <div className="buttons-wrapper">
                           <button type="submit" className="button save">Сохранить</button>
                           <button type="button" className="button cancel" onClick={handleCloseForm}>Отменить</button>
                        </div>
                </form>
             </div>
            )}
        </div>
    )
}


export default AddListButton;