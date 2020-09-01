import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const selectPresenceSlice = ({ presence }: RootState) => presence;

export const selectMembers = createSelector(selectPresenceSlice, ({ members }) => members);

export const selectMember = createSelector(selectMembers, (members) => (clientId: string) => {
  return members.find((member) => member.clientId === clientId);
});

export const selectMemberIsMuted = createSelector(
  selectMember,
  (getMember) => (clientId: string) => {
    const member = getMember(clientId);
    if (member === undefined) return false;
    return member.mute;
  },
);
