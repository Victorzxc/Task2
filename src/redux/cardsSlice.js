import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../utils/id.js';

   const cardsSlice = createSlice({
     name: 'cards',
     initialState: {
       cards: [],
     },
     reducers: {
       addCard: (state, action) => {
           state.cards.push({
              id: generateId(),
              listId: action.payload.listId,
              title: action.payload.title,
              isDone: false
           })
       },
       updateCard: (state, action) => {
         const { id, title, isDone} = action.payload;
         const card = state.cards.find((card) => card.id === id);
           if(card) {
               card.title = title;
               card.isDone = isDone;
           }
       },
       deleteCard: (state, action) => {
           state.cards = state.cards.filter(card => card.id !== action.payload)
       },
     },
   });

   export const { addCard, updateCard, deleteCard } = cardsSlice.actions;
   export default cardsSlice.reducer;