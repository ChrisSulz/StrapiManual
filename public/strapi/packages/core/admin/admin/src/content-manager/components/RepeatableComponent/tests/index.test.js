import * as React from 'react';

import { lightTheme, ThemeProvider } from '@strapi/design-system';
import { useCMEditViewDataManager, useNotification } from '@strapi/helper-plugin';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import RepeatableComponent from '../index';

import { layoutData } from './fixtures';

jest.mock('../../FieldComponent', () => () => "I'm a field component");
jest.mock('../../Inputs', () => () => "I'm inputs");

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  useNotification: jest.fn().mockImplementation(() => jest.fn()),
  useCMEditViewDataManager: jest.fn().mockImplementation(() => ({
    modifiedData: {
      'repeatable-component': [
        {
          name: 'accordion1',
        },
        {
          name: 'accordion2',
        },
      ],
      'error-field': [
        {
          name: 'accordion1',
        },
        {
          name: 'accordion2',
        },
      ],
      'error-min': [
        {
          name: 'accordion1',
        },
        {
          name: 'accordion2',
        },
      ],
    },
    formErrors: {
      'error-field': { id: 'error', defaultMessage: 'This is an error' },
      'error-min': { id: 'min-error', defaultMessage: 'This is an min error' },
    },
    triggerFormValidation: jest.fn(),
    moveComponentField: jest.fn(),
  })),
}));

jest.mock('../../../hooks', () => ({
  useContentTypeLayout: jest.fn().mockReturnValue({
    getComponentLayout: jest.fn().mockImplementation((componentUid) => layoutData[componentUid]),
  }),
}));

describe('RepeatableComponents', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    name: 'repeatable-component',
    componentUid: 'test',
  };

  const TestComponent = (props) => <RepeatableComponent {...defaultProps} {...props} />;

  const setup = (props) =>
    render(<TestComponent {...props} />, {
      wrapper({ children }) {
        return (
          <ThemeProvider theme={lightTheme}>
            <IntlProvider locale="en" messages={{}} defaultLocale="en">
              <DndProvider backend={HTML5Backend}>
                <MemoryRouter>{children}</MemoryRouter>
              </DndProvider>
            </IntlProvider>
          </ThemeProvider>
        );
      },
    });

  describe('rendering', () => {
    it('should render the component initializer when there are no components to render', () => {
      const { getByText } = setup();

      expect(getByText(/No entry yet/)).toBeInTheDocument();
    });

    it('should render an error in the component initializer if it is present', () => {
      const { getByText } = setup({
        name: 'error-field',
      });

      expect(getByText(/No entry yet/)).toBeInTheDocument();
      expect(getByText(/This is an error/)).toBeInTheDocument();
    });

    it('should render components & a footer when there are components to render', async () => {
      const user = userEvent.setup();

      const { getAllByText, getByRole } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      const accordion1Button = getByRole('button', { name: /accordion1/ });

      expect(accordion1Button).toBeInTheDocument();

      await user.click(accordion1Button);

      expect(getAllByText("I'm inputs")).toHaveLength(2);

      expect(getByRole('button', { name: 'Add an entry' })).toBeInTheDocument();
    });

    it('should render a passed error message', () => {
      const { queryByText, getAllByRole, getByText } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
        name: 'error-field',
      });

      expect(queryByText(/No entry yet/)).not.toBeInTheDocument();
      expect(getAllByRole('button', { name: /accordion/ })).toHaveLength(2);
      expect(getByText(/This is an error/)).toBeInTheDocument();
    });

    it('should render a specific min error when error message contains the word min', () => {
      const { queryByText, getAllByRole, getByText } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
        min: 4,
        name: 'error-min',
      });

      expect(queryByText(/No entry yet/)).not.toBeInTheDocument();
      expect(getAllByRole('button', { name: /accordion/ })).toHaveLength(2);
      expect(getByText(/There are 2 missing components/)).toBeInTheDocument();
    });
  });

  describe('callbacks', () => {
    it('should call addRepeatableComponentToField when the footer button is clicked', async () => {
      const addRepeatableComponentToField = jest.fn();

      useCMEditViewDataManager.mockReturnValueOnce({
        modifiedData: {
          'repeatable-component': [
            {
              name: 'accordion1',
            },
            {
              name: 'accordion2',
            },
          ],
        },
        formErrors: {
          'error-field': { id: 'error', defaultMessage: 'This is an error' },
        },
        addRepeatableComponentToField,
      });

      const { getByRole } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      await userEvent.click(getByRole('button', { name: 'Add an entry' }));

      expect(addRepeatableComponentToField).toHaveBeenCalledWith(
        'repeatable-component',
        layoutData.test,
        undefined,
        false
      );
    });

    it('should fire a notification if the max number of components have been added and the user tries to add another', async () => {
      const toggleNotification = jest.fn();

      useNotification.mockReturnValueOnce(toggleNotification);

      const { getByRole } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
        max: 2,
      });

      await userEvent.click(getByRole('button', { name: 'Add an entry' }));

      expect(toggleNotification).toHaveBeenCalledTimes(1);
    });

    it('should fire moveComponentField when a component is drag and dropped to a new location', async () => {
      const moveComponentField = jest.fn();

      useCMEditViewDataManager.mockReturnValueOnce({
        modifiedData: {
          'repeatable-component': [
            {
              name: 'accordion1',
            },
            {
              name: 'accordion2',
            },
          ],
        },
        formErrors: {
          'error-field': { id: 'error', defaultMessage: 'This is an error' },
        },
        moveComponentField,
        triggerFormValidation: jest.fn(),
      });

      const { getAllByRole } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      const [draggedItem, dropZone] = getAllByRole('button', { name: /Drag/ });

      fireEvent.dragStart(draggedItem);
      fireEvent.dragEnter(dropZone);
      fireEvent.dragOver(dropZone);
      fireEvent.drop(dropZone);

      expect(moveComponentField).toHaveBeenCalledWith({
        currentIndex: 0,
        name: 'repeatable-component',
        newIndex: 1,
      });
    });

    it('should not fire moveComponentField when a component is placed to the same position via drag and drop', () => {
      const moveComponentField = jest.fn();

      useCMEditViewDataManager.mockReturnValueOnce({
        modifiedData: {
          'repeatable-component': [
            {
              name: 'accordion1',
            },
            {
              name: 'accordion2',
            },
          ],
        },
        formErrors: {
          'error-field': { id: 'error', defaultMessage: 'This is an error' },
        },
        moveComponentField,
        triggerFormValidation: jest.fn(),
      });

      const { getAllByRole } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      const [draggedItem] = getAllByRole('button', { name: /Drag/ });

      fireEvent.dragStart(draggedItem);
      fireEvent.dragEnter(draggedItem);
      fireEvent.dragOver(draggedItem);
      fireEvent.drop(draggedItem);

      expect(moveComponentField).not.toHaveBeenCalled();
    });
  });

  describe('side effects', () => {
    it('should open the new component by default when it is added', async () => {
      const addRepeatableComponentToField = jest.fn();

      useCMEditViewDataManager.mockImplementation(() => ({
        modifiedData: {
          'repeatable-component': [
            {
              name: 'accordion1',
            },
            {
              name: 'accordion2',
            },
            {
              name: 'accordion3',
            },
          ],
        },
        formErrors: {
          'error-field': { id: 'error', defaultMessage: 'This is an error' },
        },
        addRepeatableComponentToField,
        moveComponentField: jest.fn(),
      }));

      const { getByRole, rerender } = setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      expect(getByRole('button', { name: /accordion1/ })).toHaveAttribute('aria-expanded', 'false');
      expect(getByRole('button', { name: /accordion2/ })).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(getByRole('button', { name: 'Add an entry' }));

      rerender(
        <TestComponent
          componentValueLength={3}
          componentValue={[{ __temp_key__: 1 }, { __temp_key__: 2 }, { __temp_key__: 3 }]}
        />
      );

      expect(getByRole('button', { name: /accordion1/ })).toHaveAttribute('aria-expanded', 'false');
      expect(getByRole('button', { name: /accordion2/ })).toHaveAttribute('aria-expanded', 'false');
      expect(getByRole('button', { name: /accordion3/ })).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should have have description text', () => {
      setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      expect(screen.queryByText('Press spacebar to grab and re-order')).toBeInTheDocument();
    });

    it('should update the live text when an item has been grabbed', async () => {
      setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      const [draggedItem] = screen.getAllByText('Drag');

      fireEvent.keyDown(draggedItem, { key: ' ', code: 'Space' });

      expect(
        screen.queryByText(
          /Press up and down arrow to change position, Spacebar to drop, Escape to cancel/
        )
      ).toBeInTheDocument();
    });

    it('should change the live text when an item has been moved', () => {
      setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      const [draggedItem] = screen.getAllByText('Drag');

      fireEvent.keyDown(draggedItem, { key: ' ', code: 'Space' });
      fireEvent.keyDown(draggedItem, { key: 'ArrowDown', code: 'ArrowDown' });

      expect(screen.queryByText(/New position in list/)).toBeInTheDocument();
    });

    it('should change the live text when an item has been dropped', () => {
      setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      const [draggedItem] = screen.getAllByText('Drag');

      fireEvent.keyDown(draggedItem, { key: ' ', code: 'Space' });
      fireEvent.keyDown(draggedItem, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(draggedItem, { key: ' ', code: 'Space' });

      expect(screen.queryByText(/Final position in list/)).toBeInTheDocument();
    });

    it('should change the live text after the reordering interaction has been cancelled', () => {
      setup({
        componentValue: [{ __temp_key__: 1 }, { __temp_key__: 2 }],
        componentValueLength: 2,
      });

      const [draggedItem] = screen.getAllByText('Drag');

      fireEvent.keyDown(draggedItem, { key: ' ', code: 'Space' });
      fireEvent.keyDown(draggedItem, { key: 'Escape', code: 'Escape' });

      expect(screen.queryByText(/Re-order cancelled/)).toBeInTheDocument();
    });
  });
});
