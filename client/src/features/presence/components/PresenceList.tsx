import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectMembers } from '../redux/presenceSelectors';
import { presenceActions } from '../redux/presenceSlice';

const Container = styled.div`
  padding: 1em;
  width: 15vw;
`;

const List = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5em;
`;

const MuteButton = styled.button`
  border: none;
  border-radius: 25%;
  padding: 0.5em;
  margin-left: 0.5em;
`;

const PresenceList = () => {
  const members = useSelector(selectMembers);
  const dispatch = useDispatch();

  const handleMute = useCallback(
    (clientId) => {
      dispatch(presenceActions.toggleMute({ clientId }));
    },
    [dispatch],
  );

  return (
    <Container>
      <h4>Online:</h4>
      <List>
        {members.map(({ name, clientId, mute }) => (
          <ListItem style={{ color: mute ? 'lightgray' : 'initial' }} key={clientId}>
            {name}
            <MuteButton onClick={() => handleMute(clientId)}>{mute ? 'Unmute' : 'Mute'}</MuteButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PresenceList;
