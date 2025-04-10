import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {$api} from '../../api.js';
import classNames from 'classnames';
import Checkbox from '../Checkbox/Index';
import './styles.css';
import {deleteCard} from "./DeleteCard.js";
import {putCard} from "./PutCard.js";


function Card({ listId }) {
  const { boardId } = useParams();
  const [cardd, setCard] = useState([])

  useEffect(() => {
    fetchCards();
  }, [boardId, listId])

  const fetchCards = async () => {
    try {
      const response = await $api.get(`/task/task?boardId=${boardId}&listId=${listId}`);
      console.log(response);
      setCard(response.data);
      console.table(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  async function deleteThisCard(cardId){
    try {
      await deleteCard(
          cardId,
          listId,
          boardId
      );
      setCard(cardd.filter(card => card.id !== cardId));
    }
    catch (error) {
      console.error("Error deleting card:", error)
    }
  }

  async function putThisCard(card, newName){
    try {
      const potter = {
        name: newName,
        isActive: card.isActive,
        taskId: card.id,
        listId: listId,
        boardId: boardId
      };

      putCard(potter);

    } catch (error) {
      console.error("Error updating card:", error);
    }
  }

  return (
      <div>
        {cardd?.map((card) => (
            <div key={card.id} className={classNames('card-item')}>
              <input
                  type="text"
                  defaultValue={card.name}
                  onBlur={(e) => putThisCard(card, e.target.value)}
                  className={classNames('input-title')}
                  disabled={false}
              />
              <div className="card-actions">
                <Checkbox id={card.id} isDone={card.isDone} onChange={() => {}} />
                <button
                    className="delete-card"
                    onClick={() => deleteThisCard(card.id)}>X</button>
              </div>
            </div>
        ))}
      </div>
  );
}

export default Card;