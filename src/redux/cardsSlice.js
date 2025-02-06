import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../utils/id.js';

const initialState = {
  cards: [],
  cardTitles: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const newCard = {
        id: generateId(),
        listId: action.payload.listId,
        title: action.payload.title,
        isDone: false,
      };
      state.cards.push(newCard);
      state.cardTitles.push(newCard.title);
    },
    updateCard: (state, action) => {
      const { id, title, isDone, listId } = action.payload;
      const card = state.cards.find((card) => card.id === id);
      if (card) {
        if (title) {
          const index = state.cardTitles.indexOf(card.title)
          if (index !== -1) {
            state.cardTitles[index] = title;
          }
          card.title = title;
        }
        if (isDone !== undefined) {
          card.isDone = isDone;
        }
        if (listId) {
          card.listId = listId
        }

      }
    },
    moveCard: (state, action) => {
      const { cardId, toListId } = action.payload;
      const card = state.cards.find(card => card.id === cardId);
      if (card) {
        card.listId = toListId;
      }
    },
    deleteCard: (state, action) => {
      const id = action.payload;
      const card = state.cards.find(card => card.id === id)
      if (card) {
        const index = state.cardTitles.indexOf(card.title);
        if (index !== -1) {
          state.cardTitles.splice(index, 1)
        }
        state.cards = state.cards.filter(card => card.id !== id)
      }
    },
    deleteAllCardsFromList: (state, action) => {
      const listId = action.payload;

      const cardsToDelete = state.cards.filter(card => card.listId === listId);

      state.cards = state.cards.filter(card => card.listId !== listId);

      state.cardTitles = state.cardTitles.filter(title => !cardsToDelete.some(card => card.title === title));
    },
    updateCardOrder: (state, action) => {
      const { listId, cardIds } = action.payload;

      state.cards = state.cards.map(card => {
        if (card.listId === listId) {
          const newIndex = cardIds.indexOf(card.id);
          return { ...card, order: newIndex };
        }
        return card;
      }).sort((a, b) => a.order - b.order);
    },
  },
});

export const { addCard, updateCard, deleteCard, deleteAllCardsFromList, moveCard, updateCardOrder } = cardsSlice.actions;
export default cardsSlice.reducer;