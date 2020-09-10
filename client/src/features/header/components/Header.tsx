import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import GithubIcon from '@material-ui/icons/GitHub';

const Header = () => {
  const handleClick = () => {
    window.open('https://www.github.com/ably/realtime-midi-player');
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Realtime MIDI Player</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={handleClick} color="inherit">
          <GithubIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
