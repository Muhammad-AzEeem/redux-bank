// === In this file we used a modern way for create the slice..

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const custonerSlice = createSlice({
  initialState,
  // == the name of the slice..
  name: "customer",
  reducers: {
    createCustomer: {
      // === this is the modern way of writing the methods in the object..
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;

        // == this is the small side effects that we should not do in the reducer but should do in the prepare method .
        state.createdAt = new Date().toISOString();
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = custonerSlice.actions;

// === the store we are exporting from here and importing into the store..
export default custonerSlice.reducer;

/*
// ============  Reducers... ==============

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

// ============  Action Creators... ==============

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}


*/
