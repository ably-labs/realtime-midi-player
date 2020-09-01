import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const selectAuthSlice = ({ auth }: RootState) => auth;

export const selectAuthState = createSelector(selectAuthSlice, ({ authState }) => authState);

export const selectName = createSelector(selectAuthSlice, ({ name }) => name);
