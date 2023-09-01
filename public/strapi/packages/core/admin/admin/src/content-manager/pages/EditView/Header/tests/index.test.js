/**
 *
 * Tests for Header
 *
 */

import React from 'react';

import { darkTheme, lightTheme } from '@strapi/design-system';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import Theme from '../../../../../components/Theme';
import ThemeToggleProvider from '../../../../../components/ThemeToggleProvider';
import { Header } from '../index';

import ct from './data/ct-schema.json';

const defaultProps = {
  allowedActions: { canUpdate: true, canCreate: true, canPublish: true },
  initialData: {},
  isCreatingEntry: true,
  isSingleType: false,
  hasDraftAndPublish: false,
  layout: ct,
  modifiedData: {},
  onPublish: jest.fn(),
  onPublishPromptDismissal: jest.fn(),
  onUnpublish: jest.fn(),
  status: 'resolved',
  publishConfirmation: {
    show: false,
    draftCount: 0,
  },
};

const makeApp = (props = defaultProps) => {
  return (
    <MemoryRouter>
      <IntlProvider locale="en" defaultLocale="en" messages={{}}>
        <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
          <Theme>
            <Header {...props} />
          </Theme>
        </ThemeToggleProvider>
      </IntlProvider>
    </MemoryRouter>
  );
};

describe('CONTENT MANAGER | EditView | Header', () => {
  it('renders and matches the snapshot', () => {
    const {
      container: { firstChild },
    } = render(makeApp());

    expect(firstChild).toMatchInlineSnapshot(`
      .c8 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.25;
        color: #32324d;
      }

      .c13 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c14 {
        font-size: 1rem;
        line-height: 1.5;
        color: #666687;
      }

      .c0 {
        background: #f6f6f9;
        padding-top: 24px;
        padding-right: 56px;
        padding-bottom: 40px;
        padding-left: 56px;
      }

      .c1 {
        padding-bottom: 8px;
      }

      .c5 {
        min-width: 0;
      }

      .c10 {
        background: #4945ff;
        padding: 8px;
        padding-right: 16px;
        padding-left: 16px;
        border-radius: 4px;
        border-color: #4945ff;
        border: 1px solid #4945ff;
        cursor: pointer;
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
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c6 {
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

      .c9 {
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

      .c11 {
        position: relative;
        outline: none;
      }

      .c11 > svg {
        height: 12px;
        width: 12px;
      }

      .c11 > svg > g,
      .c11 > svg path {
        fill: #ffffff;
      }

      .c11[aria-disabled='true'] {
        pointer-events: none;
      }

      .c11:after {
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

      .c11:focus-visible {
        outline: none;
      }

      .c11:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c12 {
        height: 2rem;
      }

      .c12 svg {
        height: 0.75rem;
        width: auto;
      }

      .c12[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c12[aria-disabled='true'] .c7 {
        color: #666687;
      }

      .c12[aria-disabled='true'] svg > g,.c12[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c12[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c12[aria-disabled='true']:active .c7 {
        color: #666687;
      }

      .c12[aria-disabled='true']:active svg > g,.c12[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c12:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c12:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c12 svg > g,
      .c12 svg path {
        fill: #ffffff;
      }

      .c3 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c2 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        gap: 8px;
        position: relative;
        outline: none;
      }

      .c2 svg {
        font-size: 0.625rem;
      }

      .c2 svg path {
        fill: #4945ff;
      }

      .c2:hover {
        color: #7b79ff;
      }

      .c2:active {
        color: #271fe0;
      }

      .c2:after {
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

      .c2:focus-visible {
        outline: none;
      }

      .c2:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      <div
        style="height: 0px;"
      >
        <div
          class="c0"
          data-strapi-header="true"
        >
          <div
            class="c1"
          >
            <a
              aria-current="page"
              class="c2 active"
              href="/"
            >
              <svg
                fill="none"
                height="1rem"
                viewBox="0 0 24 24"
                width="1rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 13.3a.2.2 0 0 1-.2.2H5.74l8.239 8.239a.2.2 0 0 1 0 .282L12.14 23.86a.2.2 0 0 1-.282 0L.14 12.14a.2.2 0 0 1 0-.282L11.86.14a.2.2 0 0 1 .282 0L13.98 1.98a.2.2 0 0 1 0 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6Z"
                  fill="#212134"
                />
              </svg>
              <span
                class="c3"
              >
                Back
              </span>
            </a>
          </div>
          <div
            class="c4"
          >
            <div
              class="c5 c6"
            >
              <h1
                class="c7 c8"
              >
                Create an entry
              </h1>
            </div>
            <div
              class="c9"
            >
              <button
                aria-disabled="true"
                class="c10 c9 c11 c12"
                disabled=""
                type="submit"
              >
                <span
                  class="c7 c13"
                >
                  Save
                </span>
              </button>
            </div>
          </div>
          <p
            class="c7 c14"
          >
            API ID  : restaurant
          </p>
        </div>
      </div>
    `);
  });
});
