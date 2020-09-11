import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transpose: 0,
  octave: 0,
};

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    transpose: (state, action) => {
      const newTranspose = state.transpose + action.payload;
      if (newTranspose <= 12 && newTranspose >= -12) {
        state.transpose = newTranspose;
      }
    },
    octave: (state, action) => {
      const newOctave = state.octave + action.payload;
      if (newOctave <= 3 && newOctave >= -2) {
        state.octave = newOctave;
      }
    },
  },
});

export const { reducer: keyboardReducer, actions: keyboardActions } = keyboardSlice;
