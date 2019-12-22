// External
import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Local
import page from '~Components/Page';
import appEnum from '~Util/enum';
import generateRoute from '~Components/appRoute';
import Login from '~Pages/Login';

// Constants
const Pokedex = page(lazy(() => import('~Pages/Pokedex')), 'Pokedex');
const { HOME, LOGIN } = appEnum.APP.ROUTES;
const classname = 'page';
const routes = [
  { path: HOME, comp: Pokedex, authReq: true },
  { path: LOGIN, comp: Login },
];
const classNames = {
  appear: `${classname}__appear`,
  appearActive: `${classname}__appear__active`,
  appearDone: `${classname}__appear__done`,
  enter: `${classname}__enter`,
  enterActive: `${classname}__enter__active`,
  enterDone: `${classname}__enter__done`,
  exit: `${classname}__exit`,
  exitActive: `${classname}__exit__active`,
  exitDone: `${classname}__exit__done`,
};

// Component
const Router = ({ location }) => (
  <TransitionGroup component={null}>
    <CSSTransition
      key={location.key}
      classNames={classNames}
      timeout={1500}
      unmountOnExit
    >
      <Switch location={location}>
        {routes.map(props => generateRoute(props))}
        <Redirect to={appEnum.APP.ROUTES.HOME} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

Router.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Router;
