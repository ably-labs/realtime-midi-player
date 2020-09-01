import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const selectChannelState = ({ channel }: RootState) => channel;

export const selectChannels = createSelector(selectChannelState, ({ channels }) => channels);

export const selectChannelsLoaded = createSelector(selectChannelState, ({ loaded }) => loaded);
