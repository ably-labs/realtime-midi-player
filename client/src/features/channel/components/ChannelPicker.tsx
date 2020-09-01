import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectChannels, selectChannelsLoaded } from '../redux/channelSelectors';
import ChannelOption from './ChannelOption';

const Container = styled.div`
  margin-top: 2em;
`;

const ChannelPicker = () => {
  const channels = useSelector(selectChannels);
  const channelsLoaded = useSelector(selectChannelsLoaded);

  if (channelsLoaded === false) return <span>Finding jams...</span>;
  if (channels.length === 0) return <span>No jams currently in session...</span>;
  return (
    <Container>
      <h4>Jams currently in session:</h4>
      {channels.map((channelId) => (
        <ChannelOption channelId={channelId} key={channelId} />
      ))}
    </Container>
  );
};

export default ChannelPicker;
