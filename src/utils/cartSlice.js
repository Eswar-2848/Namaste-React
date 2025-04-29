import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      //mutating the state
      const itemAlreadyExist = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemAlreadyExist) {
        itemAlreadyExist.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemToRemove.count > 1) {
        itemToRemove.count -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.card.info.id !== action.payload.card.info.id
        );
      }
    },
    //originalState = {items: []}
    clearCart: (state) => {
      //RTK - either Mutate the existing state or return a new State
      //state.items.length = 0;

      return { items: [] };
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
