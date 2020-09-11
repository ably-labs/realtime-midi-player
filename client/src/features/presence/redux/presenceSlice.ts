import { createSlice } from '@reduxjs/toolkit';

type PresenceState = {
  members: Array<{
    clientId: string;
    name: string;
    mute: boolean;
    active: boolean;
    timeoutId?: string;
  }>;
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
      state.members.push({ clientId, name, mute, active: false });
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
    registerActivity: (state, action) => {
      const { clientId, timeoutId } = action.payload;
      const member = state.members.find((member) => clientId === member.clientId);
      if (member) {
        member.active = true;
        member.timeoutId = timeoutId;
      }
    },
    unregisterActivity: (state, action) => {
      const { clientId, timeoutId } = action.payload;
      const member = state.members.find((member) => clientId === member.clientId);
      if (member && member.timeoutId === timeoutId) {
        member.active = false;
        member.timeoutId = undefined;
      }
    },
  },
});

export const { reducer: presenceReducer, actions: presenceActions } = presenceSlice;
