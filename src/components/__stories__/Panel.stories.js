// External
import React from 'react';
import { storiesOf } from '@storybook/react';

// Local
import Panel from '../Panel';
import panelInst from './notes/panel_install.md';

// Constants
const panelStories = storiesOf('Panel', module);
const style = {
  width: '550px',
  height: '350px',
};

panelStories.add(
  'Base view',
  () => (
    <Panel title="Panel Title" className="added_class" style={style}>
      <p>panel body content</p>
    </Panel>
  ),
  { notes: { install: panelInst } },
);
