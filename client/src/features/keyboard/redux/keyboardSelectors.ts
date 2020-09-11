import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const selectKeyboardState = ({ keyboard }: RootState) => keyboard;

export const selectTranspose = createSelector(selectKeyboardState, ({ transpose }) => transpose);

export const selectOctave = createSelector(selectKeyboardState, ({ octave }) => octave);
