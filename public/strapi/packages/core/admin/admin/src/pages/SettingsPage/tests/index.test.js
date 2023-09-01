import React from 'react';

import { darkTheme, lightTheme } from '@strapi/design-system';
import { AppInfosContext, StrapiAppProvider, TrackingProvider } from '@strapi/helper-plugin';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';

import { SettingsPage } from '..';
import Theme from '../../../components/Theme';
import ThemeToggleProvider from '../../../components/ThemeToggleProvider';
import { useSettingsMenu } from '../../../hooks';

jest.mock('../../../hooks', () => ({
  useSettingsMenu: jest.fn(() => ({ isLoading: false, menu: [] })),
  useAppInfo: jest.fn(() => ({ shouldUpdateStrapi: false })),
  useThemeToggle: jest.fn(() => ({ currentTheme: 'light', themes: { light: lightTheme } })),
}));

jest.mock('react-intl', () => ({
  FormattedMessage: ({ id }) => id,
  useIntl: () => ({ formatMessage: jest.fn(({ id }) => id) }),
}));
jest.mock('../pages/ApplicationInfosPage', () => () => {
  return <h1>App infos</h1>;
});

const appInfos = { shouldUpdateStrapi: false };

const makeApp = (history, settings) => (
  <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
    <TrackingProvider>
      <Theme>
        <AppInfosContext.Provider value={appInfos}>
          <StrapiAppProvider
            settings={settings}
            plugins={{}}
            getPlugin={jest.fn()}
            runHookParallel={jest.fn()}
            runHookWaterfall={jest.fn()}
            runHookSeries={jest.fn()}
            menu={[]}
          >
            <Router history={history}>
              <Route path="/settings/:settingId" component={SettingsPage} />
              <Route path="/settings" component={SettingsPage} />
            </Router>
          </StrapiAppProvider>
        </AppInfosContext.Provider>
      </Theme>
    </TrackingProvider>
  </ThemeToggleProvider>
);

describe('ADMIN | pages | SettingsPage', () => {
  it('should not crash', () => {
    const history = createMemoryHistory();
    const App = makeApp(history, {
      global: {
        id: 'global',
        intlLabel: {
          id: 'Settings.global',
          defaultMessage: 'Global Settings',
        },
        links: [],
      },
    });
    const route = '/settings/application-infos';
    act(() => history.push(route));

    const { container } = render(App);

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c11 {
        padding-bottom: 56px;
      }

      .c0 {
        display: grid;
        grid-template-columns: auto 1fr;
      }

      .c12 {
        overflow-x: hidden;
      }

      .c2 {
        padding-top: 24px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 24px;
      }

      .c5 {
        padding-top: 16px;
      }

      .c6 {
        background: #eaeaef;
      }

      .c9 {
        padding-top: 8px;
        padding-bottom: 16px;
      }

      .c4 {
        font-weight: 600;
        font-size: 1.125rem;
        line-height: 1.22;
        color: #32324d;
      }

      .c3 {
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c10 {
        -webkit-align-items: stretch;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: 8px;
      }

      .c7 {
        height: 1px;
        border: none;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        margin: 0;
      }

      .c1 {
        width: 14.5rem;
        background: #f6f6f9;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
        border-right: 1px solid #dcdce4;
        z-index: 1;
      }

      .c8 {
        width: 1.5rem;
        background-color: #dcdce4;
      }

      <div
        class="c0"
      >
        <nav
          aria-label="global.settings"
          class="c1"
        >
          <div
            class="c2"
          >
            <div
              class="c3"
            >
              <h2
                class="c4"
              >
                global.settings
              </h2>
            </div>
            <div
              class="c5"
            >
              <hr
                class="c6 c7 c8"
              />
            </div>
          </div>
          <div
            class="c9"
          >
            <ol
              class="c10"
            />
          </div>
        </nav>
        <div
          class="c11 c12"
        >
          <h1>
            App infos
          </h1>
        </div>
      </div>
    `);
  });

  it('should redirect to the application-infos', async () => {
    const history = createMemoryHistory();
    const App = makeApp(history, {
      global: {
        id: 'global',
        intlLabel: {
          id: 'Settings.global',
          defaultMessage: 'Global Settings',
        },
        links: [],
      },
    });
    const route = '/settings';
    act(() => history.push(route));

    render(App);

    await screen.findByText('App infos');

    expect(screen.getByText(/App infos/)).toBeInTheDocument();
  });

  it('should create the plugins routes correctly', async () => {
    useSettingsMenu.mockImplementation(() => ({
      isLoading: false,
      menu: [
        {
          id: 'global',
          intlLabel: {
            defaultMessage: 'Global Settings',
            id: 'Settings.global',
          },
          links: [
            {
              id: 'internationalization',
              intlLabel: { id: 'i18n.plugin.name', defaultMessage: 'Internationalization' },
              isDisplayed: true,
              permissions: [],
              to: '/settings/internationalization',
              Component: () => ({ default: () => <div>i18n settings</div> }),
            },
          ],
        },
        {
          id: 'email',
          intlLabel: { id: 'email.plugin', defaultMessage: 'email plugin' },
          links: [
            {
              id: 'email-settings',
              intlLabel: { id: 'email', defaultMessage: 'email' },
              isDisplayed: true,
              permissions: [],
              to: '/settings/email-settings',
              Component: () => ({ default: () => <div>email settings</div> }),
            },
          ],
        },
      ],
    }));

    const history = createMemoryHistory();
    const App = makeApp(history, {
      global: {
        id: 'global',
        intlLabel: {
          id: 'Settings.global',
          defaultMessage: 'Global Settings',
        },
        links: [
          {
            id: 'internationalization',
            intlLabel: { id: 'i18n.plugin.name', defaultMessage: 'Internationalization' },
            isDisplayed: true,
            permissions: [],
            to: '/settings/internationalization',
            Component: () => ({ default: () => <div>i18n settings</div> }),
          },
        ],
      },
      email: {
        id: 'email',
        intlLabel: { id: 'email.plugin', defaultMessage: 'email plugin' },
        links: [
          {
            id: 'email-settings',
            intlLabel: { id: 'email', defaultMessage: 'email' },
            isDisplayed: true,
            permissions: [],
            to: '/settings/email-settings',
            Component: () => ({ default: () => <div>email settings</div> }),
          },
        ],
      },
    });
    const route = '/settings/application-infos';
    const user = userEvent.setup();
    act(() => history.push(route));

    render(App);

    expect(screen.getByText(/App infos/)).toBeInTheDocument();

    await user.click(screen.getByText('i18n.plugin.name'));

    await waitFor(() => {
      expect(screen.getByText(/i18n settings/)).toBeInTheDocument();
    });

    await user.click(screen.getByText('email'));

    await waitFor(() => {
      expect(screen.getByText(/email settings/)).toBeInTheDocument();
    });
  });
});
