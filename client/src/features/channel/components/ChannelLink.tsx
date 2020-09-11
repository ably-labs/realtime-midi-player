import React from 'react';
import Typography from '@material-ui/core/Typography';
import CopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextInput from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  box: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
}));

const ChannelLink = () => {
  const classes = useStyles();

  const handleClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Box className={classes.box}>
      <Typography variant="subtitle2">Copy this link to invite your friends:</Typography>
      <div>
        <TextInput readOnly value={window.location.href} />
        <IconButton onClick={handleClick}>
          <CopyIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default ChannelLink;
