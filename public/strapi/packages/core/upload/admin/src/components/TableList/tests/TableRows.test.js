import React from 'react';

import { lightTheme, ThemeProvider } from '@strapi/design-system';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import { TableRows } from '../TableRows';

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  useQueryParams: jest.fn(() => [{ query: {} }]),
}));

const ASSET_FIXTURE = {
  alternativeText: 'alternative text',
  createdAt: '2021-10-01T08:04:56.326Z',
  ext: '.jpeg',
  formats: {
    thumbnail: {
      url: '/uploads/thumbnail_3874873_b5818bb250.jpg',
    },
  },
  id: 1,
  mime: 'image/jpeg',
  name: 'michka',
  size: 11.79,
  updatedAt: '2021-10-18T08:04:56.326Z',
  url: '/uploads/michka.jpg',
  type: 'asset',
};

const FOLDER_FIXTURE = {
  createdAt: '2022-11-17T10:40:06.022Z',
  id: 1,
  name: 'folder 1',
  type: 'folder',
  updatedAt: '2022-11-17T10:40:06.022Z',
};

const PROPS_FIXTURE = {
  canUpdate: true,
  rows: [ASSET_FIXTURE],
  onEditAsset: jest.fn(),
  onEditFolder: jest.fn(),
  onSelectOne: jest.fn(),
  selected: [],
};

const ComponentFixture = (props) => {
  const customProps = {
    ...PROPS_FIXTURE,
    ...props,
  };

  return (
    <MemoryRouter>
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={lightTheme}>
          <table>
            <TableRows {...customProps} />
          </table>
        </ThemeProvider>
      </IntlProvider>
    </MemoryRouter>
  );
};

const setup = (props) => render(<ComponentFixture {...props} />);

describe('TableList | TableRows', () => {
  describe('rendering assets', () => {
    it('should properly render every asset attribute', () => {
      const { getByRole, getByText } = setup();

      expect(getByRole('img', { name: 'alternative text' })).toBeInTheDocument();
      expect(getByText('michka')).toBeInTheDocument();
      expect(getByText('JPEG')).toBeInTheDocument();
      expect(getByText('12KB')).toBeInTheDocument();
      expect(getByText('Friday, October 1, 2021')).toBeInTheDocument();
      expect(getByText('Monday, October 18, 2021')).toBeInTheDocument();
    });

    it('should call onSelectAsset callback', () => {
      const onSelectOneSpy = jest.fn();
      const { getByRole } = setup({ onSelectOne: onSelectOneSpy });

      fireEvent.click(getByRole('checkbox', { name: 'Select michka asset', hidden: true }));

      expect(onSelectOneSpy).toHaveBeenCalledTimes(1);
    });

    it('should reflect non selected assets state', () => {
      const { getByRole } = setup();

      expect(
        getByRole('checkbox', { name: 'Select michka asset', hidden: true })
      ).not.toBeChecked();
    });

    it('should reflect selected assets state', () => {
      const { getByRole } = setup({ selected: [{ id: 1, type: 'asset' }] });

      expect(getByRole('checkbox', { name: 'Select michka asset', hidden: true })).toBeChecked();
    });

    it('should disable select asset checkbox when users do not have the permission to update', () => {
      const { getByRole } = setup({ canUpdate: false });

      expect(getByRole('checkbox', { name: 'Select michka asset', hidden: true })).toBeDisabled();
    });

    it('should disable select asset checkbox when users if the file type is not allowed', () => {
      const { getByRole } = setup({ allowedTypes: [] });

      expect(getByRole('checkbox', { name: 'Select michka asset', hidden: true })).toBeDisabled();
    });

    it('should call onEditAsset callback', () => {
      const onEditAssetSpy = jest.fn();
      const { getByRole } = setup({ onEditAsset: onEditAssetSpy });

      fireEvent.click(getByRole('button', { name: 'Edit', hidden: true }));

      expect(onEditAssetSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('rendering folders', () => {
    it('should render folder', () => {
      const { getByText } = setup({
        rows: [FOLDER_FIXTURE],
      });

      expect(getByText('folder 1')).toBeInTheDocument();
    });

    it('should call onEditFolder callback', () => {
      const onEditFolderSpy = jest.fn();
      const { getByRole } = setup({
        rows: [FOLDER_FIXTURE],
        onEditFolder: onEditFolderSpy,
      });

      fireEvent.click(getByRole('button', { name: 'Edit', hidden: true }));

      expect(onEditFolderSpy).toHaveBeenCalledTimes(1);
    });

    it('should display folder navigation as a link if no folder url exists', () => {
      const { getByRole } = setup({ rows: [{ ...FOLDER_FIXTURE, folderURL: 'plugins/upload' }] });

      expect(getByRole('link', { name: 'Access folder', hidden: true })).toBeInTheDocument();
    });

    it('should display folder nagivation as a button if a folder url exists', () => {
      const { getByRole } = setup({ rows: [FOLDER_FIXTURE] });

      expect(getByRole('button', { name: 'Access folder', hidden: true })).toBeInTheDocument();
    });

    it('should call onChangeFolder when clicking on folder navigation button', () => {
      const onChangeFolderSpy = jest.fn();
      const { getByRole } = setup({ rows: [FOLDER_FIXTURE], onChangeFolder: onChangeFolderSpy });

      fireEvent.click(getByRole('button', { name: 'Access folder', hidden: true }));

      expect(onChangeFolderSpy).toHaveBeenCalledWith(1);
    });

    it('should reflect non selected folder state', () => {
      const { getByRole } = setup({ rows: [FOLDER_FIXTURE] });

      expect(
        getByRole('checkbox', { name: 'Select folder 1 folder', hidden: true })
      ).not.toBeChecked();
    });

    it('should reflect selected folder state', () => {
      const { getByRole } = setup({
        rows: [FOLDER_FIXTURE],
        selected: [{ id: 1, type: 'folder' }],
      });

      expect(getByRole('checkbox', { name: 'Select folder 1 folder', hidden: true })).toBeChecked();
    });

    it('should disable select folder checkbox when users do not have the permission to update', () => {
      const { getByRole } = setup({ rows: [FOLDER_FIXTURE], canUpdate: false });

      expect(
        getByRole('checkbox', { name: 'Select folder 1 folder', hidden: true })
      ).toBeDisabled();
    });

    it('should disable select folder checkbox when folder selection is not allowed', () => {
      const { getByRole } = setup({ rows: [FOLDER_FIXTURE], isFolderSelectionAllowed: false });

      expect(
        getByRole('checkbox', { name: 'Select folder 1 folder', hidden: true })
      ).toBeDisabled();
    });

    it('should not display size and ext', () => {
      const { getAllByText } = setup({ rows: [FOLDER_FIXTURE] });

      expect(getAllByText('-').length).toEqual(2);
    });
  });

  describe.only('rendering folder & asset with the same id', () => {
    it('should reflect selected only folder state', () => {
      const { getByRole } = setup({
        rows: [FOLDER_FIXTURE, ASSET_FIXTURE],
        selected: [{ id: 1, type: 'folder' }],
      });

      expect(getByRole('checkbox', { name: 'Select folder 1 folder', hidden: true })).toBeChecked();
      expect(
        getByRole('checkbox', { name: 'Select michka asset', hidden: true })
      ).not.toBeChecked();
    });

    it('should reflect selected only asset state', () => {
      const { getByRole } = setup({
        rows: [FOLDER_FIXTURE, ASSET_FIXTURE],
        selected: [{ id: 1, type: 'asset' }],
      });

      expect(
        getByRole('checkbox', { name: 'Select folder 1 folder', hidden: true })
      ).not.toBeChecked();
      expect(getByRole('checkbox', { name: 'Select michka asset', hidden: true })).toBeChecked();
    });

    it('should reflect selected both asset & folder state', () => {
      const { getByRole } = setup({
        rows: [FOLDER_FIXTURE, ASSET_FIXTURE],
        selected: [
          { id: 1, type: 'asset' },
          { id: 1, type: 'folder' },
        ],
      });

      expect(getByRole('checkbox', { name: 'Select folder 1 folder', hidden: true })).toBeChecked();
      expect(getByRole('checkbox', { name: 'Select michka asset', hidden: true })).toBeChecked();
    });
  });
});
