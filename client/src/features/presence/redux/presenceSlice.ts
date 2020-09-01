import { createSlice } from '@reduxjs/toolkit';

type PresenceState = {
  members: Array<{ clientId: string; name: string; mute: boolean }>;
};

const initialState: PresenceState = {
  members: [],
};

const presenceSlice = createSlice({
  name: 'presence',
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    addMember: (state, action) => {
      const { clientId, name, mute } = action.payload;
      state.members.push({ clientId, name, mute });
    },
    removeMember: (state, action) => {
      state.members.filter((member) => member.clientId !== action.payload);
    },
    toggleMute: (state, action) => {
      const targetMember = state.members.find(
        (member) => member.clientId === action.payload.clientId,
      );
      if (targetMember !== undefined) {
        targetMember.mute = !targetMember?.mute;
      }
    },
  },
});

export const { reducer: presenceReducer, actions: presenceActions } = presenceSlice;
