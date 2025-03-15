import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { data, Link } from 'react-router-dom';
import BoardForm from "../BoardForm/Index";
import { deleteBoard } from "../../redux/boardsSlice";
import './styles.css';




function BoardList() {
  const boards = useSelector((state) => state.boards.boards);
  const dispatch = useDispatch();

  const [listBoard, setListBoard] = useState([])

  const handleDeleteBoard = (id) => {
    dispatch(deleteBoard(id))
  }

  useEffect(() => {
    axios.get("http://localhost:7000/board/boards", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("priton")
      }
    })
      .then(response => {
        console.log(response)
        setListBoard(response.data)
        console.table(response.data)
      });
  }, [])
  
  return (
    <div className="board-list">

      <BoardForm />

      <div className="board-items">
        {listBoard?.map((board) => (
          <div key={board.id} className="board-item">
            <Link to={`/board/${board.id}`}>
              {board.name}
            </Link>
            <button onClick={() => handleDeleteBoard(board.id)} className="delete-board">X</button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default BoardList;