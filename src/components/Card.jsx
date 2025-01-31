import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCard, deleteCard } from '../redux/cardsSlice';
import { Draggable } from 'react-beautiful-dnd';
import Checkbox from './Checkbox';
import { createSelector } from '@reduxjs/toolkit';

function Card({ listId }) {
  const dispatch = useDispatch();
  const selectCards = createSelector(
    [state => state.cards.cards, (_, listId) => listId],
    (cards, listId) => cards.filter(card => card.listId === listId)
  );
  const cards = useSelector(state => selectCards(state, listId));

  const handleRenameCard = (id, title) => {
    const cardToUpdate = cards.find(card => card.id === id);
    if (cardToUpdate) {
      dispatch(updateCard({ id, title, isDone: cardToUpdate.isDone }));
    }
  };

  const handleIsDone = (id, isDone) => {
    dispatch(updateCard({ id, isDone }));
  };

  const handleDeleteCard = (id) => {
    dispatch(deleteCard(id))
  };
    return (
        <div>
            {cards.map((card, index) => (
                <Draggable draggableId={String(card.id)} index={index} key={card.id}>
                    {(provided) => (
                        <div
                           className="card-item"
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                       >
                            <input type="text" defaultValue={card.title} onBlur={(e) => handleRenameCard(card.id, e.target.value)} className="input-title" />
                            <div className="card-actions">
                                 <Checkbox id={card.id} isDone={card.isDone} onChange={handleIsDone}/>
                                 <button className="delete-card" onClick={() => handleDeleteCard(card.id)}>X</button>
                            </div>
                        </div>
                    )}
               </Draggable>
            ))}
        </div>
    );
}

export default Card;