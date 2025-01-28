import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from "./Card";
import { deleteList, updateList} from '../redux/listsSlice';
import AddCardButton from './AddCardButton';

function List({ boardId }) {
    const lists = useSelector(state => state.lists.lists.filter(list => list.boardId === boardId));
    const dispatch = useDispatch();

     const handleDeleteList = (listId) => {
        dispatch(deleteList(listId));
    };

   const handleRenameList = (listId, title) => {
        dispatch(updateList({id: listId, title}));
    }

    return (
        <div className="lists">
            {lists.map((list) => (
            <div key={list.id} className="list-item">
                <div className="list-header">
                    <input type="text" defaultValue={list.title} onBlur={(e) => handleRenameList(list.id, e.target.value)}  className="input-title" />
                    <button className="delete-list" onClick={() => handleDeleteList(list.id)}>X</button>
                 </div>
                    <div className="list-card">
                       <Card listId={list.id}/>
                    </div>
                 <AddCardButton listId={list.id}/>
             </div>
            ))}
        </div>
    );
}

export default List;