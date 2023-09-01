import React from 'react';

import { lightTheme, ThemeProvider } from '@strapi/design-system';
import { fireEvent, render } from '@testing-library/react';

import GlobalStyle from '../../../../../components/GlobalStyle';
import ComponentCard from '../ComponentCard';

describe('ComponentCard', () => {
  const setup = (props) =>
    render(
      <ThemeProvider theme={lightTheme}>
        <ComponentCard {...props}>test</ComponentCard>
        <GlobalStyle />
      </ThemeProvider>
    );

  it('should call the onClick handler when passed', () => {
    const onClick = jest.fn();
    const { getByText } = setup({ onClick });
    fireEvent.click(getByText('test'));
    expect(onClick).toHaveBeenCalled();
  });
});
