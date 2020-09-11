import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendNote } from '../redux/keyboardActions';
import { ControlledPiano, MidiNumbers, KeyboardShortcuts } from 'react-piano';
import 'react-piano/dist/styles.css';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import './customPianoStyles.css';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: '90%',
    background:
      'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898',
    backgroundBlendMode: 'multiply,multiply',
    marginTop: '6rem',
  },
}));

const PianoKeyboard = () => {
  const dispatch = useDispatch();
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const classes = useStyles();

  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const handleStopNote = (noteNumber: number) => {
    setActiveNotes(activeNotes.filter((note) => note !== noteNumber));
  };

  const handlePlayNote = (noteNumber: number) => {
    dispatch(sendNote({ noteNumber }));
    setActiveNotes([noteNumber]);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} style={{ height: '4em', display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h6">
            <b>M-Ably</b> | Keystation Mini 32
          </Typography>
        </Grid>
        <Grid
          item
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          xs={1}
        ></Grid>
        <Grid item xs={11}>
          <ControlledPiano
            activeNotes={activeNotes}
            onStopNoteInput={handleStopNote}
            onPlayNoteInput={handlePlayNote}
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={() => {}}
            stopNote={() => {}}
            width={1000}
            keyboardShortcuts={keyboardShortcuts}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PianoKeyboard;
