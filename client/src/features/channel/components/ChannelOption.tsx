import React from 'react';
import { useHistory } from 'react-router-dom';
import JoinButton from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

type ChannelOptionProps = {
  channelId: string;
};

const ChannelOption = ({ channelId }: ChannelOptionProps) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/jam/${channelId}`);
  };

  return (
    <>
      <Typography variant="subtitle2">
        {`${channelId}'s Jam`}
        <IconButton onClick={handleClick}>
          <JoinButton />
        </IconButton>
      </Typography>
    </>
  );
};

export default ChannelOption;
