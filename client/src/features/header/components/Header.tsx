import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import GithubIcon from '@material-ui/icons/GitHub';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black',
    boxShadow: 'none',
  },
}));

const Header = () => {
  const classes = useStyles();

  const handleClick = () => {
    window.open('https://www.github.com/ably/realtime-midi-player');
  };

  return (
    <AppBar className={classes.appBar} position="static">
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
