import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCard, deleteCard } from '../redux/cardsSlice';
import Checkbox from './Checkbox';

function Card({ listId }) {
     const cards = useSelector(state => state.cards.cards.filter(card => card.listId === listId));
     const dispatch = useDispatch();
    const handleIsDone = (id, isDone) => {
        dispatch(updateCard({id, isDone}));
    }
    const handleRenameCard = (id, title) => {
        dispatch(updateCard({id, title}));
     }

    const handleDeleteCard = (id) => {
        dispatch(deleteCard(id))
    }
    return (
        <div>
            {cards.map((card) => (
              <div key={card.id} className="card-item">
                   <input type="text" defaultValue={card.title} onBlur={(e) => handleRenameCard(card.id, e.target.value)} className="input-title" />
                     <div className="card-actions">
                      <Checkbox id={card.id} isDone={card.isDone} onChange={handleIsDone}/>
                       <button onClick={() => handleDeleteCard(card.id)}  className="delete-card">X</button>
                    </div>
               </div>
            ))}
        </div>
    );
}

export default Card;