import { createAction, createSlice } from '@reduxjs/toolkit';

export const enumerateChannelsAction = createAction('enumerateChannels');

const initialState = {
  channels: [],
  loaded: false,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
      state.loaded = true;
    },
  },
});

export const { actions: channelActions, reducer: channelReducer } = channelSlice;
