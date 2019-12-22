// External
import React from 'react';
import { storiesOf } from '@storybook/react';

// Local
import ErrorBoundary from '../ErrorBoundary';
import errorBoundaryInst from './notes/errorBoundary_install.md';
import Button from '../Button';

// Constants
const errorBoundaryStories = storiesOf('ErrorBoundary', module);
const style = {
  minWidth: '550px',
  minHeight: '400px',
};

const BuggyCounter = () => {
  const [counter, updateCounter] = React.useState(0);

  const handleClick = () => {
    updateCounter(pVal => pVal + 1);
  };

  if (counter > 0) {
    // Simulate a JS error
    throw new Error('I crashed!');
  }
  return <Button onClick={handleClick}>Create Error</Button>;
};

errorBoundaryStories.add(
  'Default Error',
  () => (
    <ErrorBoundary style={style}>
      <BuggyCounter />
    </ErrorBoundary>
  ),
  { notes: { install: errorBoundaryInst } },
);
