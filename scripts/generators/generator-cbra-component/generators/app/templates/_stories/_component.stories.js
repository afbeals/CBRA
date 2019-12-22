// External
import React from 'react';
import { storiesOf } from '@storybook/react';

// Local
import <%=cmpName%> from '../<%=cmpName%>';

storiesOf('<%=cmpName%>', module)
  .add('Base View', () => (
    <<%=cmpName%>><%=cmpName%> component</<%=cmpName%>>
  ));
