import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { createSelector } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { updateCard, deleteCard } from '../../redux/cardsSlice';
import Checkbox from '../Checkbox/Index';

import './styles.css';

function Card({ card, index, listId }) {
  const dispatch = useDispatch();

  const selectCards = createSelector(
    [state => state.cards.cards, (_, listId) => listId],
    (cards, listId) => cards.filter(card => card.listId === listId)

  );
  const cardTitles = useSelector(state => state.cards.cardTitles);

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
    dispatch(deleteCard(id));
  };



  return (
    <div>

      <Draggable draggableId={String(card.id)} index={index} key={card.id} isDragDisabled={card.isDone}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
          
            <div key={card.id} className={classNames('card-item', { 'card-item-done': card.isDone })}>

              <div className='card-item-elements' {...provided.dragHandleProps}>
                <CardInput card={card} handleRenameCard={handleRenameCard} isDone={card.isDone} />
              </div>

              <div className="card-actions">
                <Checkbox id={card.id} isDone={card.isDone} onChange={handleIsDone} />
                <button
                  className="delete-card"
                  onClick={() => handleDeleteCard(card.id)}>X</button>
              </div>

            </div>

          </div>
        )}
      </Draggable>
      
    </div>
  );
}

function CardInput({ card, handleRenameCard, isDone }) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    setTitle(card.title)
  }, [card.title])

  const onChangeCustom = (ev) => {
    setTitle(ev.target.value)
  }

  return (
    <input
      type="text"
      value={title}
      onChange={onChangeCustom}
      onBlur={(e) => handleRenameCard(card.id, e.target.value)}
      className={classNames('input-title', { 'input-title-done': isDone })}
      disabled={isDone}
    />
  )
}
export default Card;
