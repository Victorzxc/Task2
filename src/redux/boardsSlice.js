import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../utils/id.js';

const initialState = {
    boards: [],
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, action) => {
            state.boards.push({ id: generateId(), title: action.payload });
        },
        deleteBoard: (state, action) => {
            state.boards = state.boards.filter((board) => board.id !== action.payload);
        }
    },
});


export const { addBoard, deleteBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
