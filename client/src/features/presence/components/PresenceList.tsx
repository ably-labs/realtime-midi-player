import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMembers } from '../redux/presenceSelectors';
import { presenceActions } from '../redux/presenceSlice';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryActon from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MutedIcon from '@material-ui/icons/VolumeOff';
import UnmutedIcon from '@material-ui/icons/VolumeUp';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    width: '16rem',
  },
}));

const PresenceList = () => {
  const members = useSelector(selectMembers);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleMute = useCallback(
    (clientId) => {
      dispatch(presenceActions.toggleMute({ clientId }));
    },
    [dispatch],
  );

  return (
    <Paper className={classes.paper}>
      <Typography>Online:</Typography>
      <List>
        {members.map(({ name, clientId, mute, active }) => (
          <ListItem
            style={{ color: mute ? 'grey' : active ? '#0FB17E' : 'initial' }}
            key={clientId}
          >
            <ListItemText>{name}</ListItemText>
            <ListItemSecondaryActon>
              <IconButton onClick={() => handleMute(clientId)}>
                {mute ? <MutedIcon /> : <UnmutedIcon />}
              </IconButton>
            </ListItemSecondaryActon>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PresenceList;
