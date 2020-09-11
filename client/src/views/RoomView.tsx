import { selectAuthState } from 'features/auth/redux/authSelectors';
import { loginAction } from 'features/auth/redux/authSlice';
import ChannelLink from 'features/channel/components/ChannelLink';
import PianoKeyboard from 'features/keyboard/components/PianoKeyboard';
import PresenceList from 'features/presence/components/PresenceList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ViewContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
`;

const ViewSubContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const classes = useStyles();

  useEffect(() => {
    if (!authState) {
      const channelId = location.pathname.split('/')[2];
      dispatch(loginAction(channelId));
    }
  }, [authState, dispatch, location]);

  if (!authState)
    return (
      <Container className={classes.container}>
        <CircularProgress />
      </Container>
    );
  return (
    <ViewContainer>
      <PresenceList />
      <ViewSubContainer>
        <ChannelLink />
        <PianoKeyboard />
      </ViewSubContainer>
    </ViewContainer>
  );
};

export default RoomView;
