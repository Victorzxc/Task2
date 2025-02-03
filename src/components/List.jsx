import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from "./Card";
import { deleteList, updateList } from '../redux/listsSlice';
import AddCardButton from './AddCardButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { createSelector } from '@reduxjs/toolkit';
import { moveCard } from '../redux/cardsSlice';


function List({ boardId }) {
    const dispatch = useDispatch();
    const selectLists = createSelector(
        [state => state.lists.lists, (_, boardId) => boardId],
        (lists, boardId) => lists.filter(list => list.boardId === boardId)
    );
    const lists = useSelector(state => selectLists(state, boardId));


    const handleOnDragEnd = result => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        if (source.droppableId !== destination.droppableId) {
            dispatch(moveCard({
                cardId: draggableId,
                toListId: destination.droppableId
            }))
        }
    }

    const handleDeleteList = (listId) => {
        dispatch(deleteList(listId));
    };
    const handleRenameList = (listId, title) => {
        dispatch(updateList({ id: listId, title }));
    }

    return (
        <div className="lists">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {lists.map((list) => (
                    <div key={list.id} className="list-item">
                        <div className="list-header">
                            <input
                                type="text"
                                className="input-title"
                                defaultValue={list.title}
                                onBlur={(e) => handleRenameList(list.id, e.target.value)}
                            />
                            <button className="delete-list" onClick={() => handleDeleteList(list.id)}>X</button>
                        </div>
                        <Droppable droppableId={String(list.id)}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="list-card">
                                    <Card listId={list.id} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <AddCardButton listId={list.id} />
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
}

export default List;
