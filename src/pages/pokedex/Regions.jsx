// Extenal
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// Local
import ErrorBoundary from '~Components/ErrorBoundary';
import withPokedex from '~Modules/pokedex/withPokedex';

// Constants
const classname = 'regions';
const classNames = {
  appear: 'appear',
  appearActive: 'appear__active',
  appearDone: 'appear__done',
  enter: 'enter',
  enterActive: 'enter__active',
  enterDone: 'enter__done',
  exit: 'exit',
  exitActive: 'exit__active',
  exitDone: 'exit__done',
};

// Component
const Regions = ({
  fetchDex,
  pClassname,
  getRegions,
  selectRegion,
  getSelectedRegion,
  getRegionsArray: regions,
}) => {
  const selectedName = getSelectedRegion?.name ?? null;
  const handleOnClick = urlId => {
    if (!getRegions[urlId].descriptions) {
      fetchDex(urlId);
    }
    selectRegion(urlId);
  };
  return (
    <ErrorBoundary>
      <div
        data-testid="pokedex-regions"
        className={`${pClassname}__${classname}`}
      >
        <div className={`${pClassname}__${classname}__decor`}>
          <div className={`${pClassname}__${classname}__decor__light`}>
            <div className="trim">
              <div className="bulb red" />
            </div>
          </div>
          <div className={`${pClassname}__${classname}__decor__light`}>
            <div className="trim">
              <div className="bulb yellow" />
            </div>
          </div>
          <div className={`${pClassname}__${classname}__decor__light`}>
            <div className="trim">
              <div className="bulb green" />
            </div>
          </div>
        </div>
        <div className={`${pClassname}__${classname}__list`}>
          {!getRegions && (
            <div className={`${pClassname}__${classname}__list__region noAnim`}>
              <button
                tabIndex={0}
                type={'button'}
                onClick={() => {}}
                onKeyDown={() => {}}
                className={`${pClassname}__${classname}__list__region__button active`}
              >
                national
              </button>
            </div>
          )}
          {!!getRegions &&
            regions.map(({ name, urlId }, index) => (
              <CSSTransition
                key={name}
                timeout={2000}
                in
                unmountOnExit
                appear
                classNames={classNames}
              >
                <div
                  className={`${pClassname}__${classname}__list__region${
                    index === 0 ? ' noAnim' : ''
                  }`}
                >
                  <button
                    key={`${name}-${index}`}
                    tabIndex={0}
                    type={'button'}
                    onClick={() => handleOnClick(urlId)}
                    onKeyDown={() => handleOnClick(urlId)}
                    className={`${pClassname}__${classname}__list__region__button${
                      selectedName === name ? ' active' : ''
                    }`}
                  >
                    {name}
                  </button>
                </div>
              </CSSTransition>
            ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

Regions.propTypes = {
  pClassname: PropTypes.string.isRequired,
  fetchDex: PropTypes.func.isRequired,
  selectRegion: PropTypes.func.isRequired,
  getRegions: PropTypes.object,
  getRegionsArray: PropTypes.array,
  getSelectedRegion: PropTypes.object,
};

Regions.defaultProps = {
  getRegionsArray: [],
};

export default withPokedex(Regions);

export { Regions };
