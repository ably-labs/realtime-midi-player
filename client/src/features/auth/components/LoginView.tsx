import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enumerateChannelsAction } from 'features/channel/redux/channelSlice';
import ChannelPicker from 'features/channel/components/ChannelPicker';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const SubmitButton = styled.button`
  border: none;
  height: 3em;
  width: 10em;
  padding: 1em;
  border-radius: 1em;
  margin: 1em;
`;

const NameInput = styled.input`
  padding: 0.5em;
  margin: 1em;
`;

const ViewContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginView = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const history = useHistory();

  useEffect(() => {
    dispatch(enumerateChannelsAction());
  }, [dispatch]);

  const handleSubmit = () => {
    history.push(`/jam/${name}`);
  };

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  return (
    <Container style={{ border: '1px solid black' }}>
      <NameInput autoFocus placeholder="Name" onChange={handleNameChange} value={name}></NameInput>
      <SubmitButton type="submit" onClick={handleSubmit} disabled={name === ''}>
        Start Jamming!
      </SubmitButton>
      <ChannelPicker />
    </Container>
  );
};

export default LoginView;
