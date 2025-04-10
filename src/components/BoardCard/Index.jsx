import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import List from '../List/Index';
import AddListButton from "../AddListButton/Index";
import './styles.css';
import axios from 'axios';

function BoardCard() {
    const { boardId } = useParams();
    const boards = useSelector(state => state.boards.boards);
    const [boardName, setBoardName] = useState('Loading...');

    useEffect(() => {
        console.log("Board ID in BoardCard:", boardId);
    }, [boardId]);

    useEffect(() => {
        axios.get("http://localhost:7000/board/boards", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("priton")
            }
        })
            .then(response => {
                console.log(response.data)

                const currentBoard = response.data.find(board => board.id === boardId);

                if (currentBoard) {
                    setBoardName(currentBoard.name);
                } else {
                    setBoardName('Board not found');
                }
            })

    }, [boardId]);

    return (
        <div className="board-card">
            <div>
                <h2>
                    {boardName}
                </h2>
            </div>
            <div>
                <AddListButton boardId={boardId} />
                <div className="board-lists">
                    <List boardId={boardId} />
                </div>
            </div>
        </div>
    );
}

export default BoardCard;