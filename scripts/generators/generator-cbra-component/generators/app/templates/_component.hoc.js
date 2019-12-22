// External
import React from 'react';

/**
 * @name <%=cmpName%>
 * @param {component} WrappedComponent React Component to be returned with new props
 * @desc HOC component to add additional props (ex: <%=cmpName%>('data')(Component))
 */

const <%=cmpName%> = data => WrappedComponent => class ModifiedComponent extends React.PureComponent {
    render() {
        const newData = { data, newData: `newData ${data}` };
        return <WrappedComponent {...newData} {...this.props} />;
    }
};

export default <%=cmpName%>;

export { <%=cmpName%> };
