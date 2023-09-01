/**
 *
 * Tests for SettingsPage
 *
 */

import React from 'react';

import { lightTheme, ThemeProvider } from '@strapi/design-system';
import { render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { SettingsPage } from '../index';

import server from './utils/server';

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  useNotification: jest.fn(),
  useOverlayBlocker: () => ({ lockApp: jest.fn(), unlockApp: jest.fn() }),
  useFocusWhenNavigate: jest.fn(),
}));

const App = (
  <ThemeProvider theme={lightTheme}>
    <IntlProvider locale="en" messages={{}} textComponent="span">
      <SettingsPage />
    </IntlProvider>
  </ThemeProvider>
);

describe('Upload | SettingsPage', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('renders and matches the snapshot', async () => {
    const { container, getByText } = render(App);

    await waitFor(() =>
      expect(
        getByText(
          'Enabling this option will automatically rotate the image according to EXIF orientation tag.'
        )
      ).toBeInTheDocument()
    );

    expect(container).toMatchInlineSnapshot(`
      .c41 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c6 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.25;
        color: #32324d;
      }

      .c11 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c12 {
        font-size: 1rem;
        line-height: 1.5;
        color: #666687;
      }

      .c20 {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25;
        color: #32324d;
      }

      .c25 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #32324d;
      }

      .c33 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #666687;
        text-transform: uppercase;
      }

      .c35 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #4945ff;
        text-transform: uppercase;
      }

      .c37 {
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c39 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #b72b1a;
        text-transform: uppercase;
      }

      .c1 {
        background: #f6f6f9;
        padding-top: 40px;
        padding-right: 56px;
        padding-bottom: 40px;
        padding-left: 56px;
      }

      .c3 {
        min-width: 0;
      }

      .c7 {
        background: #4945ff;
        padding: 8px;
        padding-right: 16px;
        padding-left: 16px;
        border-radius: 4px;
        border-color: #4945ff;
        border: 1px solid #4945ff;
        cursor: pointer;
      }

      .c13 {
        padding-right: 56px;
        padding-left: 56px;
      }

      .c15 {
        padding-bottom: 56px;
      }

      .c18 {
        background: #ffffff;
        padding: 24px;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c23 {
        max-width: 320px;
      }

      .c27 {
        background: #f6f6f9;
        padding: 4px;
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
        border-color: #dcdce4;
        position: relative;
        cursor: pointer;
      }

      .c30 {
        background: transparent;
        padding-top: 8px;
        padding-right: 12px;
        padding-bottom: 8px;
        padding-left: 12px;
        border-radius: 4px;
        border-color: #f6f6f9;
        border: 1px solid #f6f6f9;
        -webkit-flex: 1 1 50%;
        -ms-flex: 1 1 50%;
        flex: 1 1 50%;
      }

      .c34 {
        background: #ffffff;
        padding-right: 12px;
        padding-left: 12px;
        border-radius: 4px;
        border-color: #dcdce4;
        border: 1px solid #dcdce4;
        -webkit-flex: 1 1 50%;
        -ms-flex: 1 1 50%;
        flex: 1 1 50%;
      }

      .c38 {
        background: #ffffff;
        padding-top: 8px;
        padding-right: 12px;
        padding-bottom: 8px;
        padding-left: 12px;
        border-radius: 4px;
        border-color: #dcdce4;
        border: 1px solid #dcdce4;
        -webkit-flex: 1 1 50%;
        -ms-flex: 1 1 50%;
        flex: 1 1 50%;
      }

      .c40 {
        background: transparent;
        padding-right: 12px;
        padding-left: 12px;
        border-radius: 4px;
        border-color: #f6f6f9;
        border: 1px solid #f6f6f9;
        -webkit-flex: 1 1 50%;
        -ms-flex: 1 1 50%;
        flex: 1 1 50%;
      }

      .c2 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
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

      .c4 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c8 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        gap: 8px;
      }

      .c17 {
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
        gap: 12;
      }

      .c19 {
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
        gap: 16px;
      }

      .c24 {
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
        gap: 4px;
      }

      .c28 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
      }

      .c31 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c9 {
        position: relative;
        outline: none;
      }

      .c9 > svg {
        height: 12px;
        width: 12px;
      }

      .c9 > svg > g,
      .c9 > svg path {
        fill: #ffffff;
      }

      .c9[aria-disabled='true'] {
        pointer-events: none;
      }

      .c9:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c9:focus-visible {
        outline: none;
      }

      .c9:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c10 {
        height: 2rem;
      }

      .c10 svg {
        height: 0.75rem;
        width: auto;
      }

      .c10[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c10[aria-disabled='true'] .c5 {
        color: #666687;
      }

      .c10[aria-disabled='true'] svg > g,.c10[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c10[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c10[aria-disabled='true']:active .c5 {
        color: #666687;
      }

      .c10[aria-disabled='true']:active svg > g,.c10[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c10:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c10:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c10 svg > g,
      .c10 svg path {
        fill: #ffffff;
      }

      .c26 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c21 {
        display: grid;
        grid-template-columns: repeat(12,1fr);
        gap: 24px;
      }

      .c22 {
        grid-column: span 6;
        max-width: 100%;
      }

      .c14 {
        display: grid;
        grid-template-columns: 1fr;
      }

      .c16 {
        overflow-x: hidden;
      }

      .c0:focus-visible {
        outline: none;
      }

      .c29 {
        outline: none;
        box-shadow: 0;
        -webkit-transition-property: border-color,box-shadow,fill;
        transition-property: border-color,box-shadow,fill;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
      }

      .c29:focus-within {
        border: 1px solid #4945ff;
        box-shadow: #4945ff 0px 0px 0px 2px;
      }

      .c32 {
        padding-top: 6px;
        padding-bottom: 6px;
      }

      .c36 {
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        z-index: 0;
        width: 100%;
      }

      @media (max-width:68.75rem) {
        .c22 {
          grid-column: span 12;
        }
      }

      @media (max-width:34.375rem) {
        .c22 {
          grid-column: span;
        }
      }

      <div>
        <main
          aria-labelledby="main-content-title"
          class="c0"
          id="main-content"
          tabindex="-1"
        >
          <form>
            <div
              style="height: 0px;"
            >
              <div
                class="c1"
                data-strapi-header="true"
              >
                <div
                  class="c2"
                >
                  <div
                    class="c3 c4"
                  >
                    <h1
                      class="c5 c6"
                    >
                      Media Library
                    </h1>
                  </div>
                  <button
                    aria-disabled="true"
                    class="c7 c8 c9 c10"
                    data-testid="save-button"
                    disabled=""
                    type="submit"
                  >
                    <div
                      aria-hidden="true"
                      class=""
                    >
                      <svg
                        fill="none"
                        height="1rem"
                        viewBox="0 0 24 24"
                        width="1rem"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.727 2.97a.2.2 0 0 1 .286 0l2.85 2.89a.2.2 0 0 1 0 .28L9.554 20.854a.2.2 0 0 1-.285 0l-9.13-9.243a.2.2 0 0 1 0-.281l2.85-2.892a.2.2 0 0 1 .284 0l6.14 6.209L20.726 2.97Z"
                          fill="#212134"
                        />
                      </svg>
                    </div>
                    <span
                      class="c5 c11"
                    >
                      Save
                    </span>
                  </button>
                </div>
                <p
                  class="c5 c12"
                >
                  Configure the settings for the Media Library
                </p>
              </div>
            </div>
            <div
              class="c13"
            >
              <div
                class="c14"
              >
                <div
                  class="c15 c16"
                >
                  <div
                    class="c17"
                  >
                    <div
                      class="c18"
                    >
                      <div
                        class="c19"
                      >
                        <div
                          class="c4"
                        >
                          <h2
                            class="c5 c20"
                          >
                            Asset management
                          </h2>
                        </div>
                        <div
                          class="c21"
                        >
                          <div
                            class="c22"
                          >
                            <div
                              class="c23"
                            >
                              <div
                                class="c24"
                              >
                                <div
                                  class="c4"
                                >
                                  <label
                                    class="c5 c25 c26"
                                    for=":r0:"
                                  >
                                    Responsive friendly upload
                                  </label>
                                </div>
                                <div
                                  class="c27 c28 c29"
                                  wrap="wrap"
                                >
                                  <div
                                    class="c30 c31 c32"
                                  >
                                    <span
                                      class="c5 c33"
                                    >
                                      Off
                                    </span>
                                  </div>
                                  <div
                                    class="c34 c31 c32"
                                  >
                                    <span
                                      class="c5 c35"
                                    >
                                      On
                                    </span>
                                  </div>
                                  <input
                                    aria-describedby=":r0:-hint :r0:-error"
                                    aria-disabled="false"
                                    aria-label="responsiveDimensions"
                                    aria-required="false"
                                    checked=""
                                    class="c36"
                                    data-testid="responsiveDimensions"
                                    id=":r0:"
                                    name="responsiveDimensions"
                                    type="checkbox"
                                  />
                                </div>
                                <p
                                  class="c5 c37"
                                  id=":r0:-hint"
                                >
                                  Enabling this option will generate multiple formats (small, medium and large) of the uploaded asset.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="c22"
                          >
                            <div
                              class="c23"
                            >
                              <div
                                class="c24"
                              >
                                <div
                                  class="c4"
                                >
                                  <label
                                    class="c5 c25 c26"
                                    for=":r2:"
                                  >
                                    Size optimization
                                  </label>
                                </div>
                                <div
                                  class="c27 c28 c29"
                                  wrap="wrap"
                                >
                                  <div
                                    class="c38 c31 c32"
                                  >
                                    <span
                                      class="c5 c39"
                                    >
                                      Off
                                    </span>
                                  </div>
                                  <div
                                    class="c40 c31 c32"
                                  >
                                    <span
                                      class="c5 c33"
                                    >
                                      On
                                    </span>
                                  </div>
                                  <input
                                    aria-describedby=":r2:-hint :r2:-error"
                                    aria-disabled="false"
                                    aria-label="sizeOptimization"
                                    aria-required="false"
                                    class="c36"
                                    data-testid="sizeOptimization"
                                    id=":r2:"
                                    name="sizeOptimization"
                                    type="checkbox"
                                  />
                                </div>
                                <p
                                  class="c5 c37"
                                  id=":r2:-hint"
                                >
                                  Enabling this option will reduce the image size and slightly reduce its quality.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="c22"
                          >
                            <div
                              class="c23"
                            >
                              <div
                                class="c24"
                              >
                                <div
                                  class="c4"
                                >
                                  <label
                                    class="c5 c25 c26"
                                    for=":r4:"
                                  >
                                    Auto orientation
                                  </label>
                                </div>
                                <div
                                  class="c27 c28 c29"
                                  wrap="wrap"
                                >
                                  <div
                                    class="c30 c31 c32"
                                  >
                                    <span
                                      class="c5 c33"
                                    >
                                      Off
                                    </span>
                                  </div>
                                  <div
                                    class="c34 c31 c32"
                                  >
                                    <span
                                      class="c5 c35"
                                    >
                                      On
                                    </span>
                                  </div>
                                  <input
                                    aria-describedby=":r4:-hint :r4:-error"
                                    aria-disabled="false"
                                    aria-label="autoOrientation"
                                    aria-required="false"
                                    checked=""
                                    class="c36"
                                    data-testid="autoOrientation"
                                    id=":r4:"
                                    name="autoOrientation"
                                    type="checkbox"
                                  />
                                </div>
                                <p
                                  class="c5 c37"
                                  id=":r4:-hint"
                                >
                                  Enabling this option will automatically rotate the image according to EXIF orientation tag.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
        <div
          class="c41"
        >
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-log"
            role="log"
          />
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-status"
            role="status"
          />
          <p
            aria-live="assertive"
            aria-relevant="all"
            id="live-region-alert"
            role="alert"
          />
        </div>
      </div>
    `);
  });

  it('should display the form correctly with the initial values', async () => {
    const { getByTestId } = render(App);

    await waitFor(() => {
      const responsiveDimension = getByTestId('responsiveDimensions');
      const sizeOptimization = getByTestId('sizeOptimization');
      const autoOrientation = getByTestId('autoOrientation');
      const saveButton = getByTestId('save-button');

      expect(responsiveDimension.checked).toBe(true);
      expect(autoOrientation.checked).toBe(true);
      expect(sizeOptimization.checked).toBe(false);
      expect(saveButton).toBeDisabled();
    });
  });
});
