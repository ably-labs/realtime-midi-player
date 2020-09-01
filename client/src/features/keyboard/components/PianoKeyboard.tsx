import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendNote } from '../redux/keyboardActions';
import { ControlledPiano, MidiNumbers, KeyboardShortcuts } from 'react-piano';
import 'react-piano/dist/styles.css';

const PianoKeyboard = () => {
  const dispatch = useDispatch();
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
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
    <div>
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
    </div>
  );
};

export default PianoKeyboard;
