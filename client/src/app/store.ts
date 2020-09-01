import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from 'features/auth/redux/authSlice';
import { channelReducer } from 'features/channel/redux/channelSlice';
import { presenceReducer } from 'features/presence/redux/presenceSlice';
import createAblyMiddleware from './createAblyMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    presence: presenceReducer,
    channel: channelReducer,
  },
  middleware: [createAblyMiddleware()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
