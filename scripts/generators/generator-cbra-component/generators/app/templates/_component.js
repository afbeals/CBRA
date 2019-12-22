// External
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class <%=cmpName%> extends PureComponent {
  static propTypes = {
    prop: PropTypes,
  }

  state = {}

  render() {
    return (
      <div>
        <%=cmpName%>
      </div>
    );
  }
}

export default <%=cmpName%>;

export { <%=cmpName%> };
