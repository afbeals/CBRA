// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// LOcal
import ErrorBoundary from '~Components/ErrorBoundary';

// Constants
const classname = 'panel';

// Component
const Panel = ({ title, children, className, render, borderless }) => (
  <ErrorBoundary>
    <div
      data-testid="panel"
      className={`${className ? `${className} ` : ''}${
        borderless ? `${borderless} ` : ''
      }${classname}`}
    >
      {typeof title === 'string' && (
        <h2 className={`${classname}__header`}>{title}</h2>
      )}
      {typeof title !== 'string' && (
        <div className={`${classname}__header`}>{title}</div>
      )}
      <div className={`${classname}__body`}>
        {children || render(`${className ? `${className}__body` : ''}`)}
      </div>
    </div>
  </ErrorBoundary>
);

Panel.propTypes = {
  title: PropTypes.node.isRequired,
  render: (props, propName, componentName) => {
    const { children, content, render } = props;
    if (!children && !content && !render) {
      return new Error(
        `'${propName}'. Must provide either content prop, children, or render prop in ${componentName}.`,
      );
    }
    return null;
  },
  children: (props, propName, componentName) => {
    const { children, content, render } = props;
    if (!children && !content && !render) {
      return new Error(
        `'${propName}'. Must provide either content prop, children, or render prop in ${componentName}.`,
      );
    }
    return null;
  },
  borderless: PropTypes.bool,
  className: PropTypes.string,
};

export default Panel;
