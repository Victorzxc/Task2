import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCard, deleteCard } from '../redux/cardsSlice';
import { Draggable } from 'react-beautiful-dnd';
import Checkbox from './Checkbox';
import { createSelector } from '@reduxjs/toolkit';
import { isCardTitleUnique } from '../utils/validation';

function Card({ listId }) {
  const dispatch = useDispatch();

  const selectCards = createSelector(
    [state => state.cards.cards, (_, listId) => listId],
    (cards, listId) => cards.filter(card => card.listId === listId)

  );
  const cardTitles = useSelector(state => state.cards.cardTitles);

  const cards = useSelector(state => selectCards(state, listId));

  const handleRenameCard = (id, title, setTitle) => {
    if (!isCardTitleUnique(cardTitles, title)) {
      window.alert('Название уже существует');
      const cardToUpdate = cards.find(card => card.id === id);
      if (cardToUpdate) {
        setTitle(cardToUpdate.title);
      }
      return;
    }
  };

  const handleIsDone = (id, isDone) => {
    dispatch(updateCard({ id, isDone }));
  };

  const handleDeleteCard = (id) => {
    dispatch(deleteCard(id));
  };

  return (
    <div>
      {cards.map((card, index) => (
        <div key={card.id} className={`card-item ${card.isDone ? 'card-item-done' : ''}`}>
          <Draggable draggableId={String(card.id)} index={index} key={card.id} isDragDisabled={card.isDone}>
            {(provided) => (
              <div className='card-item-elements'
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>


                <CardInput card={card} handleRenameCard={handleRenameCard} isDone={card.isDone} />


                <div className="card-actions">
                  <Checkbox id={card.id} isDone={card.isDone} onChange={handleIsDone} />
                  <button
                    className="delete-card"
                    onClick={() => handleDeleteCard(card.id)}
                    disabled={card.isDone}>X</button>
                </div>
              </div>
            )}
          </Draggable>
        </div>
      ))}
    </div>
  );
}

function CardInput({ card, handleRenameCard, isDone }) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    setTitle(card.title)
  }, [card.title])

  return (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={(e) => handleRenameCard(card.id, e.target.value, setTitle)}
      className={`input-title ${isDone ? 'input-title-done' : ''}`}
      disabled={isDone}
    />
  )
}
export default Card;
