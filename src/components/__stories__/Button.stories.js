// External
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';

// Local
import Button from '../Button';
import buttonPrimInst from './notes/buttonPrimary_install.md';
import buttonSecInst from './notes/buttonSecondary_install.md';

// constants
const buttonStories = storiesOf('Button', module).addDecorator(withKnobs);
const sizeOpts = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};
const typeOpts = {
  primary: 'primary',
  secondary: 'secondary',
};

buttonStories.add(
  'Buttons',
  () => (
    <>
      <Button
        size={radios('Display size: ', sizeOpts, 'medium')}
        text={text('Button Text: ', '')}
        linkTo={text('URL: ', '')}
        icon={text('Icon classname: ', 'fab fa-acquisitions-incorporated')}
        disabled={boolean('Is Disabled: ', false)}
        type={radios('Type of button: ', typeOpts, 'primary')}
      >
        Button component
      </Button>
    </>
  ),
  {
    notes: { Primary: buttonPrimInst, Secondary: buttonSecInst },
  },
);
