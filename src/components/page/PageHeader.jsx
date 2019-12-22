// Extenal
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Constants
const classname = 'header';

// Component
const PageHeader = ({
  children,
  myRef,
  title,
  pClassname,
  history: {
    goBack,
    location: { pathname },
  },
}) => {
  const [isHovering, updateHovering] = useState(false);
  const handleUpdateHovering = val => {
    if (pathname !== '/') {
      updateHovering(val);
    }
  };
  const handleOnClick = () => {
    if (pathname !== '/') {
      goBack();
    }
  };
  return (
    <div ref={myRef} className={`${pClassname}__${classname}`}>
      {title && (
        <button
          type={'button'}
          onMouseEnter={() => handleUpdateHovering(true)}
          onMouseLeave={() => handleUpdateHovering(false)}
          onClick={() => handleOnClick()}
          className={`${pClassname}__${classname}__title${
            isHovering ? ' back' : ''
          }`}
        >
          <h2
            className={`${pClassname}__${classname}__title__content ${pClassname}__${classname}__title__content--current`}
          >
            {title}
          </h2>
          <h2
            className={`${pClassname}__${classname}__title__content ${pClassname}__${classname}__title__content--back`}
          >
            Go Back
          </h2>
        </button>
      )}
      {children}
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node,
  pClassname: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  title: PropTypes.string,
  myRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default withRouter(PageHeader);

export { PageHeader };
