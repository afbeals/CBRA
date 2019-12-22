// Extenal
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

// Local
import Overlay from '../Overlay';
import Loading from '../Loading';

// Constants
const classname = 'body';

// Component
const PageContent = ({ height, topOffset, spacing, page, pClassname }) => (
  <div
    style={{ height: `${height}px`, top: `${topOffset + spacing}px` }}
    className={`${pClassname}__${classname}`}
  >
    <Suspense fallback={<Loading />}>
      {page(`${pClassname}__${classname}__content`)}
    </Suspense>
    <Overlay />
  </div>
);

PageContent.propTypes = {
  height: PropTypes.number.isRequired,
  topOffset: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  pClassname: PropTypes.string.isRequired,
  page: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default PageContent;
