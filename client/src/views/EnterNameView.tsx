import { authActions } from 'features/auth/redux/authSlice';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import SubmitButton from 'shared/SubmitButton';
import TextInput from 'shared/TextInput';
import styled from 'styled-components';

const ViewContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EnterNameView = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleSubmit = () => {
    dispatch(authActions.setName(name));
  };

  return (
    <ViewContainer>
      <TextInput autoFocus placeholder="Name" onChange={handleNameChange} value={name}></TextInput>
      <SubmitButton type="submit" onClick={handleSubmit} disabled={name === ''}>
        Submit
      </SubmitButton>
    </ViewContainer>
  );
};

export default EnterNameView;
