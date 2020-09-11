import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendNote } from '../redux/keyboardActions';
import { ControlledPiano, MidiNumbers, KeyboardShortcuts } from 'react-piano';
import 'react-piano/dist/styles.css';
import './customPianoStyles.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Modifiers from './Modifiers';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: '90%',
    background:
      'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898',
    backgroundBlendMode: 'multiply,multiply',
    marginTop: '6rem',
  },
  upperGrid: { height: '4em', display: 'flex', justifyContent: 'flex-end' },
  modifierGrid: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
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
        <Grid item xs={12} className={classes.upperGrid}>
          <Typography variant="h6">
            <b>M-Ably</b> | Keystation Mini 32
          </Typography>
        </Grid>
        <Grid item className={classes.modifierGrid} xs={1}>
          <Modifiers />
        </Grid>
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
