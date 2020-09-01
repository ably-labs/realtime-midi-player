import { selectAuthState } from 'features/auth/redux/authSelectors';
import { loginAction } from 'features/auth/redux/authSlice';
import ChannelLink from 'features/channel/components/ChannelLink';
import PianoKeyboard from 'features/keyboard/components/PianoKeyboard';
import PresenceList from 'features/presence/components/PresenceList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ViewContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

const ViewSubContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  useEffect(() => {
    if (!authState) {
      const channelId = location.pathname.split('/')[2];
      dispatch(loginAction(channelId));
    }
  }, [authState, dispatch, location]);

  if (!authState) return <span>Loading...</span>;
  return (
    <ViewContainer>
      <PresenceList />
      <ViewSubContainer>
        <ChannelLink />
        <PianoKeyboard />
      </ViewSubContainer>
    </ViewContainer>
  );
};

export default RoomView;
