import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import BoardForm from "../BoardForm/Index";
import './styles.css';
import { deleteBoard } from "./DeleteBoard.js";
import RenameBoard from "./RenameBoard.jsx";


function BoardList() {
    const [listBoard, setListBoard] = useState([]);
    const { boardId } = useParams();
    async function deleteThisBoard(boardId) {
        try {
            await deleteBoard(boardId);
            setListBoard(listBoard.filter(board => board.id !== boardId));
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    }

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const response = await axios.get("http://localhost:7000/board/boards", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("priton")
                }
            });
            setListBoard(response.data);
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    };

    return (
        <div className="board-list">
            <BoardForm />
            <div className="board-items">
                {listBoard?.map((board) => (
                    <div  key={board.id} className="board-container">
                        <RenameBoard
                            board={board}
                        />
                        <button onClick={() => deleteThisBoard(board.id)} className="delete-board">X</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default BoardList;