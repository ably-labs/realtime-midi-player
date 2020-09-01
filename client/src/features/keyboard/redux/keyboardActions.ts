import { createAction } from '@reduxjs/toolkit';

export const sendNote = createAction<{ noteNumber: number }>('sendNote');
