// External
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Local
import ErrorBoundary from '~Components/ErrorBoundary';
import PageHeader from './page/PageHeader';
import PageContent from './page/PageContent';

// Constants
const classname = 'page'; // prefix for all WrappedComponents
const spacing = 35;

// Component
const page = (WrappedComponent, title, headerComponent) => {
  const Loader = () => {
    const [calHeight, updateCalHeight] = useState(0);
    const [topOffset, updateTopOffset] = useState(0);
    const headerRef = React.useRef();
    const pageRef = React.useRef();

    const updatedHeight = () => {
      if (pageRef.current && headerRef.current) {
        const pageHeight = pageRef.current.clientHeight || 0;
        const headerHeight = headerRef.current.clientHeight || 0;
        const currentHeight = pageHeight - headerHeight;
        if (currentHeight !== calHeight) {
          updateCalHeight(currentHeight);
          updateTopOffset(headerHeight);
        }
      }
    };

    useEffect(() => {
      if (pageRef.current && headerRef.current) {
        updatedHeight();
        window.addEventListener('resize', updatedHeight);
      }
      return () => {
        window.removeEventListener('resize', updatedHeight);
      };
    });

    return (
      <div ref={pageRef} className={`${classname}`}>
        <ErrorBoundary>
          <PageHeader myRef={headerRef} title={title} pClassname={classname}>
            {headerComponent}
          </PageHeader>
        </ErrorBoundary>
        <ErrorBoundary>
          <PageContent
            height={calHeight - spacing}
            topOffset={topOffset}
            spacing={spacing}
            pClassname={classname}
            page={contentClass => <WrappedComponent className={contentClass} />}
          />
        </ErrorBoundary>
      </div>
    );
  };

  return Loader;
};

page.propTypes = {
  WrappedComponent: PropTypes.elementType.isRequired,
  title: PropTypes.string,
  headerComponent: PropTypes.elementType,
};

page.defaultProps = {
  title: 'Page Title',
};

export default page;
