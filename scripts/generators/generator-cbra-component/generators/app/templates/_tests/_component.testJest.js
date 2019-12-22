// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import <%=cmpName%> from '../<%=cmpName%>';

// tests
describe('<%=cmpName%>', () => {
  afterEach(cleanup);
  it('should match <%=cmpName%> to snapshot', () => {
    const { getByTestId } = render(<<%=cmpName%> pClassname={'parent'} />);
    const <%= cmpName.toLowerCase() %> = getByTestId('');
    expect(<%= cmpName.toLowerCase() %>).toMatchSnapshot();
  });
});
