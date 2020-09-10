import React from 'react';
import { useSelector } from 'react-redux';
import { selectChannels, selectChannelsLoaded } from '../redux/channelSelectors';
import ChannelOption from './ChannelOption';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const ChannelPicker = () => {
  const channels = useSelector(selectChannels);
  const channelsLoaded = useSelector(selectChannelsLoaded);
  const classes = useStyles();

  if (channelsLoaded === false)
    return (
      <Box className={classes.box}>
        <CircularProgress />
      </Box>
    );
  return (
    <Container maxWidth="xs">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {channels.length === 0 ? (
              <Typography>No jams currently in progress...</Typography>
            ) : (
              <>
                <Typography>Jams currently in progress:</Typography>
                {channels.map((channelId) => (
                  <ChannelOption channelId={channelId} key={channelId} />
                ))}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChannelPicker;
