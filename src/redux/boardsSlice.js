import { createSlice } from '@reduxjs/toolkit';
import {generateId} from '../utils/id.js';

const initialState = {
    boards: [],
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, action) => {
            state.boards.push({id: generateId(), title: action.payload});
        },
        updateBoard: (state, action) => {
            const {id, title} = action.payload;
            const board = state.boards.find((board) => board.id === id);
            if (board) {
                board.title = title;
            }
        },
        deleteBoard: (state, action) => {
            state.boards = state.boards.filter((board) => board.id !== action.payload);
        }
    },
});


export const { addBoard, updateBoard, deleteBoard } = boardsSlice.actions;

export default boardsSlice.reducer;