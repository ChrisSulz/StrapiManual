import React from 'react';

import { darkTheme, lightTheme } from '@strapi/design-system';
import { TrackingProvider } from '@strapi/helper-plugin';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { Route, Router } from 'react-router-dom';

import Theme from '../../../../../../../components/Theme';
import ThemeToggleProvider from '../../../../../../../components/ThemeToggleProvider';
import PaginationFooter from '../index';

const makeApp = (history, pagination) => {
  return (
    <TrackingProvider>
      <IntlProvider messages={{}} textComponent="span" locale="en" defaultLocale="en">
        <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
          <Theme>
            <Router history={history}>
              <Route path="/settings/user">
                <PaginationFooter pagination={pagination} />
              </Route>
            </Router>
          </Theme>
        </ThemeToggleProvider>
      </IntlProvider>
    </TrackingProvider>
  );
};

describe('DynamicTable', () => {
  it('renders and matches the snapshot', () => {
    const history = createMemoryHistory();
    const pagination = { pageCount: 2 };
    act(() => history.push('/settings/user?pageSize=10&page=1&sort=firstname'));
    const app = makeApp(history, pagination);

    const { container } = render(app);

    expect(container).toMatchSnapshot();
  });
});
