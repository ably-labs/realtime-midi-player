import { selectName } from 'features/auth/redux/authSelectors';
import ChannelPicker from 'features/channel/components/ChannelPicker';
import { enumerateChannelsAction } from 'features/channel/redux/channelSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SubmitButton from 'shared/SubmitButton';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const name = useSelector(selectName);

  useEffect(() => {
    dispatch(enumerateChannelsAction());
  }, [dispatch]);

  const handleSubmit = () => {
    history.push(`/jam/${name}`);
  };

  return (
    <Container>
      <h4>Welcome to Ably Midi Player</h4>
      <span>
        Click the button below to start a new room. You can invite your friends to join once you
        have started a 'jam'...
      </span>
      <SubmitButton type="submit" onClick={handleSubmit}>
        Start a new jam
      </SubmitButton>
      <span>...or alternatively you can join one of the existing jams below:</span>
      <ChannelPicker />
    </Container>
  );
};

export default LandingView;
