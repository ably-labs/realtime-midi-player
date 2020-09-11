import { AnyAction, MiddlewareAPI, Dispatch } from '@reduxjs/toolkit';
import Ably from 'ably/promises';
import * as Tone from 'tone';
import { Types } from 'ably';
import { authActions, loginAction } from 'features/auth/redux/authSlice';
import { sendNote } from 'features/keyboard/redux/keyboardActions';
import { presenceActions } from 'features/presence/redux/presenceSlice';
import WebMidi from 'webmidi';
import { selectMemberIsMuted } from 'features/presence/redux/presenceSelectors';
import { channelActions, enumerateChannelsAction } from 'features/channel/redux/channelSlice';
import { selectName } from 'features/auth/redux/authSelectors';
import { selectOctave, selectTranspose } from 'features/keyboard/redux/keyboardSelectors';

const createAblyMiddleware = () => {
  let channel: Types.RealtimeChannelPromise;

  return (api: MiddlewareAPI) => (next: Dispatch) => async (action: AnyAction) => {
    if (enumerateChannelsAction.match(action)) {
      const ablyClient = new Ably.Rest.Promise({
        authUrl: 'api/createEnumerationTokenRequest',
      });

      const responsePages = await ablyClient.request(
        'get',
        '/channels',
        { limit: 10, by: 'id' },
        null,
        null,
      );

      if (responsePages.success) {
        api.dispatch(channelActions.setChannels(responsePages.items));
      } else {
        console.error('error finding available channels');
      }
    }

    const name = selectName(api.getState());

    if (loginAction.match(action)) {
      const ablyClient = new Ably.Realtime.Promise({
        authUrl: '/api/createChannelTokenRequest',
        authParams: { channelId: action.payload },
      });

      ablyClient.connect();

      ablyClient.connection.on('connected', async () => {
        channel = ablyClient.channels.get(action.payload);
        await channel.attach();

        api.dispatch(authActions.setAuthState(true));

        const members = await channel.presence.get();

        api.dispatch(
          presenceActions.setMembers(
            members.map((member) => ({
              clientId: member.clientId,
              name: member.data.name,
              mute: false,
            })),
          ),
        );

        channel.presence.subscribe('enter', (evt) => {
          api.dispatch(
            presenceActions.addMember({
              clientId: evt.clientId,
              name: evt.data.name,
              mute: false,
            }),
          );
        });

        channel.presence.subscribe('leave', (evt) => {
          api.dispatch(presenceActions.removeMember(evt.clientId));
        });

        channel.presence.enter({
          name,
        });

        const synth = new Tone.PolySynth().toDestination();

        channel.subscribe('note', (evt) => {
          if (!selectMemberIsMuted(api.getState())(evt.clientId)) {
            const { noteNumber } = evt.data;
            const octave = Math.floor(noteNumber / 12) - 1;
            const scaleIndexToNote = [
              'C',
              'C#',
              'D',
              'D#',
              'E',
              'F',
              'F#',
              'G',
              'G#',
              'A',
              'A#',
              'B',
            ];
            const note = noteNumber % 12;
            synth.triggerAttackRelease(scaleIndexToNote[note] + octave.toString(), '8n');
          }
          const timeoutId = setTimeout(() => {
            api.dispatch(presenceActions.unregisterActivity({ timeoutId, clientId: evt.clientId }));
          }, 5000);
          api.dispatch(presenceActions.registerActivity({ timeoutId, clientId: evt.clientId }));
        });

        WebMidi.enable((err) => {
          if (err) throw err;
          if (!WebMidi.inputs[0]) {
          } else {
            const input = WebMidi.getInputById(WebMidi.inputs[0].id);
            if (input) {
              input.addListener('noteon', 'all', (evt) => {
                api.dispatch(sendNote({ noteNumber: evt.note.number }));
              });
            }
          }
        });
      });

      return action;
    }

    if (sendNote.match(action)) {
      const transpose = selectTranspose(api.getState());
      const octave = selectOctave(api.getState());

      const noteNumber = action.payload.noteNumber + transpose + 12 * octave;

      channel.publish('note', { noteNumber });
    }

    return next(action);
  };
};

export default createAblyMiddleware;
