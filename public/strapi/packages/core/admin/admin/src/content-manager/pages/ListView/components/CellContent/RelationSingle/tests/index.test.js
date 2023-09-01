import React from 'react';

import { lightTheme, ThemeProvider } from '@strapi/design-system';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import RelationSingle from '../index';

const DEFAULT_PROPS_FIXTURE = {
  metadatas: {
    mainField: {
      name: 'name',
      schema: {
        type: 'string',
      },
    },
  },
  value: {
    name: 1,
  },
};

const ComponentFixture = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <IntlProvider locale="en" messages={{}} defaultLocale="en">
        <RelationSingle {...DEFAULT_PROPS_FIXTURE} />
      </IntlProvider>
    </ThemeProvider>
  );
};

describe('DynamicTabe / Cellcontent / RelationSingle', () => {
  it('renders and matches the snapshot', async () => {
    const { container } = render(<ComponentFixture />);
    expect(container).toMatchSnapshot();
  });
});
