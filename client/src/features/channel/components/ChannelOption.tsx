import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

type ChannelOptionProps = {
  channelId: string;
};

const JoinButton = styled.button`
  border: none;
  border-radius: 25%;
  padding: 0.5em;
  margin-left: 1em;
`;

const ChannelOption = ({ channelId }: ChannelOptionProps) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/jam/${channelId}`);
  };

  return (
    <>
      <span>{`${channelId}'s Jam`}</span>
      <JoinButton onClick={handleClick}>Join in</JoinButton>
    </>
  );
};

export default ChannelOption;
