import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {$api} from '../../api.js';
import { createSelector } from '@reduxjs/toolkit';
import classNames from 'classnames';

import Checkbox from '../Checkbox/Index';
import './styles.css';
import deleteCard from './DeleteCard';


function Card({ listId }) {
  const { boardId } = useParams();
  const [title, setTitle] = useState()
  const [cardd, setCard] = useState([])
  useEffect(() => {
    $api.get(`/task/task?boardId=${boardId}&listId=${listId}`)
      .then(response => {
        console.log(response)
        setCard(response.data)
        console.table(response.data)
      });
  }, [])

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
    dispatch(deleteCard(id));
  };


  async function deleteThisCard(e){
    try {
      await deleteCard(
          listId,
          taskId,
          boardId
      );
    }
    catch (error) {
      setTitle('');
      setShowForm(false);
    }
  }

  return (
    <div>
      {cardd?.map((card) => (


        <div key={card.id} className={classNames('card-item')}>
    

          <input
            type="text"
            value={card.name}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={(e) => handleRenameCard(card.id, e.target.value)}
            className={classNames('input-title')}
            disabled={false}
          />

          <div className="card-actions">
            <Checkbox id={card.id} isDone={card.isDone} onChange={handleIsDone} />
            <button
              className="delete-card"
              onClick={() => deleteCard()}>X</button>
          </div>

        </div>



      ))}


    </div>
  );
}


export default Card;
