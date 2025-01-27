import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from './boardsSlice'
import listsReducer from './listsSlice'
import cardsReducer from './cardsSlice'

const store = configureStore({
    reducer: {
        boards: boardsReducer,
        lists: listsReducer,
        cards: cardsReducer,
    },
});

export default store;