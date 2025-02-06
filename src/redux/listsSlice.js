import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../utils/id.js';

const initialState = {
    lists: [],
};

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList: (state, action) => {
            state.lists.push({ id: generateId(), boardId: action.payload.boardId, title: action.payload.title, cardIds: [] });
        },
        updateList: (state, action) => {
            const { id, title } = action.payload;
            const list = state.lists.find(list => list.id === id);
            if (list) {
                list.title = title;
            }
        },
        deleteList: (state, action) => {
            state.lists = state.lists.filter(list => list.id !== action.payload);
        },
    },
});


export const { addList, updateList, deleteList } = listsSlice.actions;

export default listsSlice.reducer;