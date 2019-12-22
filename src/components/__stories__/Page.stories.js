// External
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Local
import page from '../Page';
import pageInst from './notes/page_install.md';

// constants
const pageStories = storiesOf('Page', module);
const mockStore = configureStore();
const getStore = () => mockStore({ app: { displayOverlay: false } });
const HeaderComponent = () => <div>Sub Text</div>;
const RenderPage = page(
  React.lazy(() => import('../page/StoriesRenderPage')),
  'Base Page',
  <HeaderComponent />,
);

pageStories.add(
  'Base View',
  () => (
    <ReduxProvider store={getStore()}>
      <RenderPage />
    </ReduxProvider>
  ),
  {
    notes: { install: pageInst },
  },
);
