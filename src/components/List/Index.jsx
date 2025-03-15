import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { createSelector } from '@reduxjs/toolkit';
import Card from "../Card/Index";
import { useEffect } from 'react';
import axios from 'axios';
import AddCardButton from '../AddCardButton/Index';
import { deleteList, updateList } from '../../redux/listsSlice';
import { moveCard, deleteAllCardsFromList, updateCardOrder } from '../../redux/cardsSlice';
import './styles.css';
import { useState } from 'react';

function List({ boardId }) {
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:7000/list/list?boardId=${boardId}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("priton")
            }
        })
            .then(response => {
                console.log(response)
                setList(response.data)
                console.table(response.data)
            });
    }, [])

    const dispatch = useDispatch();

    const selectLists = createSelector(
        [state => state.lists.lists, (_, boardId) => boardId],
        (lists, boardId) => lists.filter(list => list.boardId === boardId)
    );
    const lists = useSelector(state => selectLists(state, boardId));

    const cards = useSelector(state => state.cards.cards);

    const cardsByList = lists.map(list => ({
        listId: list.id,
        cards: cards.filter(card => card.listId === list.id)
    }));

    const handleOnDragEnd = (result, listId, cards) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId === destination.droppableId) {
            const startIndex = source.index;
            const endIndex = destination.index;
            const newCards = Array.from(cards);
            const [removed] = newCards.splice(startIndex, 1);
            newCards.splice(endIndex, 0, removed);

            dispatch(updateCardOrder({ listId: listId, cardIds: newCards.map(card => card.id) }));
        } else {
            dispatch(moveCard({
                cardId: draggableId,
                toListId: destination.droppableId
            }));
        }
    };

    const handleDeleteList = (listId) => {
        dispatch(deleteList(listId));
        dispatch(deleteAllCardsFromList(listId));
    };

    const handleRenameList = (listId, title) => {
        dispatch(updateList({ id: listId, title }));
    }

    return (
        <div className="lists">
          
            {list?.map((list) => (
                <div className="list-item" key={list.id}>
                    <div className="list-header">

                        <input
                            type="text"
                            className="input-title"
                            defaultValue={list.name}
                            onBlur={(e) => handleRenameList(list.id, e.target.value)}
                        />

                        <button className="delete-list" onClick={() => handleDeleteList(list.id)}>X</button>
                        <Card listId={list.id} />
                        <AddCardButton listId={list.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default List;