import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { useIntl } from 'react-intl';

import en from '../../../translations/en.json';
import fr from '../../../translations/fr.json';
import useLocalesProvider from '../../LocalesProvider/useLocalesProvider';
import LanguageProvider from '../index';

const messages = { en, fr };
const localeNames = { en: 'English', fr: 'Français' };

describe('LanguageProvider', () => {
  afterEach(() => {
    localStorage.removeItem('strapi-admin-language');
  });

  it('should not crash', () => {
    const { container } = render(
      <LanguageProvider messages={messages} localeNames={localeNames}>
        <div>Test</div>
      </LanguageProvider>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Test
      </div>
    `);
  });

  it('should change the locale and set the strapi-admin-language item in the localStorage', async () => {
    const Test = () => {
      const { locale } = useIntl();
      const { changeLocale } = useLocalesProvider();

      return (
        <div>
          <h1>{localeNames[locale]}</h1>
          <button type="button" onClick={() => changeLocale('fr')}>
            CHANGE
          </button>
        </div>
      );
    };

    render(
      <LanguageProvider messages={messages} localeNames={localeNames}>
        <Test />
      </LanguageProvider>
    );

    expect(localStorage.getItem('strapi-admin-language')).toEqual('en');

    expect(screen.getByText('English')).toBeInTheDocument();

    fireEvent.click(screen.getByText('CHANGE'));

    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(localStorage.getItem('strapi-admin-language')).toEqual('fr');
  });
});
