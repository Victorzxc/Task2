import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {$api} from '../../api.js';
import Card from "../Card/Index";
import AddCardButton from '../AddCardButton/Index';
import './styles.css';
import {deleteList} from "./DeleteList.js";
import {putList} from "./PutList.js";

function List({ boardId }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchLists();
    }, [boardId]);

    const fetchLists = async () => {
        try {
            const response = await $api.get(`/list/list?boardId=${boardId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("priton")
                }
            });
            setList(response.data);
            console.log("fetchLists: list", response.data);
        } catch (error) {
            console.error("Error fetching lists:", error);
        }
    };

    async function deleteThisList(listId){
        try {
            await deleteList(
                listId,
                boardId
            );
            setList(list.filter(list => list.id !== listId));
        }
        catch (error) {
            console.error("Error deleting list:", error)
        }
    }

    async function putThisList(listId, list, newName){
        try {
            const upList = {
                name: newName,
                listId: list.id,
                boardId: boardId
            };
            putList(upList);

        } catch (error) {
            console.error("Error updating list:", error);
        }
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
                            onBlur={(e) => putThisList(list.id, list, e.target.value)}
                        />
                        <button className="delete-list" onClick={() => deleteThisList(list.id)}>X</button>
                        <Card listId={list.id} />
                        <AddCardButton listId={list.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default List;