import { selectName } from 'features/auth/redux/authSelectors';
import ChannelPicker from 'features/channel/components/ChannelPicker';
import { enumerateChannelsAction } from 'features/channel/redux/channelSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  typography: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const LandingView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const name = useSelector(selectName);
  const classes = useStyles();

  useEffect(() => {
    dispatch(enumerateChannelsAction());
  }, [dispatch]);

  const handleSubmit = () => {
    history.push(`/jam/${name}`);
  };

  return (
    <Container className={classes.container}>
      <Typography className={classes.typography} variant="h6">
        Welcome to the Ably Realtime MIDI Player!
      </Typography>
      <Typography className={classes.typography}>
        Click the button below to start a new room. You can invite your friends to join once you
        have started a 'jam'...
      </Typography>
      <Box className={classes.box}>
        <Button variant="contained" color="secondary" type="submit" onClick={handleSubmit}>
          Start Jamming!
        </Button>
      </Box>
      <Typography className={classes.typography}>
        ...Alternatively you can join one of the existing jams below:
      </Typography>
      <ChannelPicker />
    </Container>
  );
};

export default LandingView;
