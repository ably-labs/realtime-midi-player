import React from 'react';
import TextInput from 'shared/TextInput';
import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
  margin-bottom: 2em;
`;

const CopyButton = styled.button`
  border: none;
  border-radius: 25%;
  padding: 1em;
`;

const ChannelLink = () => {
  const handleClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Container>
      <span>Copy this link to invite your friends:</span>
      <div>
        <TextInput readOnly value={window.location.href} />
        <CopyButton onClick={handleClick}>Copy</CopyButton>
      </div>
    </Container>
  );
};

export default ChannelLink;
