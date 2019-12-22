// External
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Local
import Snackbar from '../Snackbar';
import appEnum from '~Util/enum';
import snackbarInstruc from './notes/snackbar_install.md';

// Constants
const snackbarStories = storiesOf('Snackbar', module);
const mockStore = configureStore();
const { SUCCESS, NORMAL, ERROR, WARNING } = appEnum.APP.NOTIFY_TYPE;
const getStore = type =>
  mockStore({ app: { notify: { type, msg: `${type} message` } } });

snackbarStories
  .add(
    'Normal Message',
    () => (
      <ReduxProvider store={getStore(NORMAL)}>
        <Snackbar />
      </ReduxProvider>
    ),
    { notes: { install: snackbarInstruc } },
  )
  .add(
    'Success Message',
    () => (
      <ReduxProvider store={getStore(SUCCESS)}>
        <Snackbar />
      </ReduxProvider>
    ),
    { notes: { install: snackbarInstruc } },
  )
  .add(
    'Warning Message',
    () => (
      <ReduxProvider store={getStore(WARNING)}>
        <Snackbar />
      </ReduxProvider>
    ),
    { notes: { install: snackbarInstruc } },
  )
  .add(
    'Error Message',
    () => (
      <ReduxProvider store={getStore(ERROR)}>
        <Snackbar />
      </ReduxProvider>
    ),
    { notes: { install: snackbarInstruc } },
  );
