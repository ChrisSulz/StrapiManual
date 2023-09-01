/**
 *
 * Tests for ListView
 *
 */

import React from 'react';

import { lightTheme, ThemeProvider } from '@strapi/design-system';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';

import FormModalNavigationProvider from '../../../components/FormModalNavigationProvider';
import pluginEn from '../../../translations/en.json';
import getTrad from '../../../utils/getTrad';
import ListView from '../index';

import mockData from './mockData';

jest.mock('../../../hooks/useDataManager', () => {
  return jest.fn(() => ({
    initialData: mockData,
    modifiedData: mockData,
    isInDevelopmentMode: true,
    isInContentTypeView: true,
    submitData() {},
    toggleModalCancel() {},
  }));
});

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  // eslint-disable-next-line
  CheckPermissions: ({ children }) => <div>{children}</div>,
}));

const makeApp = () => {
  const history = createMemoryHistory();
  const messages = {
    en: Object.keys(pluginEn).reduce((acc, current) => {
      acc[getTrad(current)] = pluginEn[current];

      return acc;
    }, {}),
  };

  return (
    <IntlProvider messages={messages} defaultLocale="en" textComponent="span" locale="en">
      <ThemeProvider theme={lightTheme}>
        <Router history={history}>
          <FormModalNavigationProvider>
            <ListView />
          </FormModalNavigationProvider>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
};

describe('<ListView />', () => {
  it('renders and matches the snapshot', () => {
    const App = makeApp();
    const { container } = render(App);

    expect(container).toMatchSnapshot();
  });
});
