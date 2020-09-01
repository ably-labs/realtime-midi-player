declare module 'react-piano' {
  export interface ControlledPianoProps {
    noteRange: {
      first: string;
      last: string;
    };
    playNote: (midiNote: number) => void;
    stopNote: (midiNote: number) => void;
    onPlayNoteInput: (midiNote: number) => void;
    onStopNoteInput: (midiNote: number) => void;
    width: number;
    keyboardShortcuts: any;
    activeNotes: number[];
  }

  export const MidiNumbers = {
    fromNote: (note: string) => number,
  };

  export const KeyboardShortcuts = {
    create: (config: object) => object,
    HOME_ROW: object,
  };

  export class ControlledPiano extends React.Component<ControlledPianoProps, any> {}
}
