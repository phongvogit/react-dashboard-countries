import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Country } from 'model';

export interface cartSliceState {
  toggle: boolean;
  items: Country[];
}

const initialState: cartSliceState = {
  toggle: false,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeToggle(state) {
      state.toggle = !state.toggle;
    },

    addItems(state, action: PayloadAction<Country>) {
      if (!action.payload.isFavorite) {
        state.items.push(action.payload);
        localStorage.setItem('items', JSON.stringify(state.items));
      } else {
        state.items = state.items.filter(
          (item) => item.name.localeCompare(action.payload.name) !== 0
        );
        localStorage.setItem('items', JSON.stringify(state.items));
      }
    },

    fetchItemsFromLocalStorage(state) {
      if (!localStorage.getItem('items')) return;
      const items = JSON.parse(localStorage.getItem('items') || '');
      state.items = items;
    },

    removeItems(state, action: PayloadAction<Country>) {
      state.items = state.items.filter((item) => {
        item.isFavorite = false;
        return item.name.localeCompare(action.payload.name) !== 0;
      });
      localStorage.setItem('items', JSON.stringify(state.items));
    },
  },
});

//Actions
export const cartActions = cartSlice.actions;
//Selectors
export const selectCartToggle = (state: RootState) => state.cart.toggle;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCountryItemQuantity = createSelector(
  selectCartItems,
  (itemList) => itemList.length
);
//Reducers
const cartReducer = cartSlice.reducer;
export default cartReducer;
