import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { selectOctave, selectTranspose } from '../redux/keyboardSelectors';
import { keyboardActions } from '../redux/keyboardSlice';

const useStyles = makeStyles(() => ({
  typographyBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifierBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const Modifiers = () => {
  const classes = useStyles();
  const transpose = useSelector(selectTranspose);
  const octave = useSelector(selectOctave);
  const dispatch = useDispatch();

  const transposeUp = useCallback(() => {
    dispatch(keyboardActions.transpose(+1));
  }, [dispatch]);

  const transposeDown = useCallback(() => {
    dispatch(keyboardActions.transpose(-1));
  }, [dispatch]);

  const octaveUp = useCallback(() => {
    dispatch(keyboardActions.octave(+1));
  }, [dispatch]);

  const octaveDown = useCallback(() => {
    dispatch(keyboardActions.octave(-1));
  }, [dispatch]);
  return (
    <>
      <Box className={classes.typographyBox}>
        <Typography variant="caption">Transpose</Typography>
      </Box>
      <Box className={classes.modifierBox}>
        <IconButton onClick={transposeDown} size="small">
          <MinusIcon />
        </IconButton>
        <Typography variant="h6">{`${transpose > 0 ? '+' : ''}${transpose}`}</Typography>
        <IconButton onClick={transposeUp} size="small">
          <PlusIcon />
        </IconButton>
      </Box>
      <Box className={classes.typographyBox}>
        <Typography variant="caption">Octave</Typography>
      </Box>
      <Box className={classes.modifierBox}>
        <IconButton onClick={octaveDown} size="small">
          <MinusIcon />
        </IconButton>
        <Typography variant="h6">{`${octave > 0 ? '+' : ''}${octave}`}</Typography>
        <IconButton onClick={octaveUp} size="small">
          <PlusIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default Modifiers;
