// External
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Local
import Overlay from '../Overlay';
import overlayInst from './notes/overlay_install.md';

// Constants
const overlayStories = storiesOf('Overlay', module);
const mockStore = configureStore();
const getStore = () => mockStore({ app: { displayOverlay: true } });

overlayStories.add(
  'Base View',
  () => (
    <ReduxProvider store={getStore()}>
      <Overlay>Overlay component</Overlay>
    </ReduxProvider>
  ),
  {
    notes: { install: overlayInst },
  },
);
