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
        addCardIdToList: (state, action) => {
            const { cardId, listId } = action.payload;
            const list = state.lists.find((list) => list.id === listId);
            if (list) {
                list.cardIds.push(cardId)
            }
        },
        removeCardIdFromList: (state, action) => {
            const { cardId, listId } = action.payload;
            const list = state.lists.find((list) => list.id === listId);
            if (list) {
                list.cardIds = list.cardIds.filter((id) => id !== cardId);
            }
        },
        moveCard: (state, action) => {
            const { cardId, fromListId, toListId } = action.payload;
            const fromList = state.lists.find(list => list.id === fromListId);
            const toList = state.lists.find(list => list.id === toListId);

            if (fromList) {
                fromList.cardIds = fromList.cardIds.filter(id => id !== cardId);
            }
            if (toList) {
                toList.cardIds.push(cardId);
            }
        },
    },
});


export const { addList, updateList, deleteList, addCardIdToList, moveCard, removeCardIdFromList } = listsSlice.actions;

export default listsSlice.reducer;