import {useState} from 'react';
import {Link} from "react-router-dom";
import {putBoard} from "./PutBoard.js";


function RenameBoard({board, onRename}) {
    const [isRename, setIsRename] = useState(false);
    const [newBoardName, setNewBoardName] = useState(board.name);

    const handleInputChange = (e) => {
        setNewBoardName(e.target.value);
    };

    const handleRenameClick = () => {
        setIsRename(!isRename);
    };

    const saveBoard = async () => {
        try {
            const newBoard = {
                name: newBoardName,
                boardId: board.id
            }
            await putBoard(newBoard);
            handleRenameClick()
        } catch (error) {
            console.error("Error updating list:", error);
        }
    };

    return (
        <div className="board-item">
            {isRename ? (
                <input
                    type="text"
                    value={newBoardName}
                    onChange={handleInputChange}
                />
            ) : (
                <Link to={`/board/${board.id}`}>
                    {newBoardName}
                </Link>
            )}
            <button onClick={isRename ? saveBoard : handleRenameClick}>
                {isRename ? "Save" : "Rename"}
            </button>
        </div>
    )
}

export default RenameBoard;


