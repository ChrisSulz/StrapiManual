/**
 *
 * FilterListURLQuery
 *
 */

import React from 'react';

import { Box, Tag } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { useQueryParams } from '../hooks/useQueryParams';

export const FilterListURLQuery = ({ filtersSchema }) => {
  const [{ query }, setQuery] = useQueryParams();

  const handleClick = (filter) => {
    const nextFilters = query.filters.$and.filter((prevFilter) => {
      const name = Object.keys(filter)[0];
      const filterType = Object.keys(filter[name])[0];
      const value = filter[name][filterType];

      return prevFilter[name]?.[filterType] !== value;
    });

    setQuery({ filters: { $and: nextFilters }, page: 1 });
  };

  return (
    query?.filters?.$and.map((filter, i) => {
      const attributeName = Object.keys(filter)[0];
      const attribute = filtersSchema.find(({ name }) => name === attributeName);

      if (!attribute) {
        return null;
      }

      if (attribute.fieldSchema.type === 'relation') {
        const relationTargetAttribute = attribute.fieldSchema.mainField.name;
        const filterObj = filter[attributeName][relationTargetAttribute];
        const operator = Object.keys(filterObj)[0];
        const value = filterObj[operator];

        return (
          <AttributeTag
            // eslint-disable-next-line react/no-array-index-key
            key={`${attributeName}-${i}`}
            attribute={attribute}
            filter={filter}
            onClick={handleClick}
            operator={operator}
            value={value}
          />
        );
      }

      const filterObj = filter[attributeName];
      const operator = Object.keys(filterObj)[0];
      const value = filterObj[operator];

      return (
        <AttributeTag
          // eslint-disable-next-line react/no-array-index-key
          key={`${attributeName}-${i}`}
          attribute={attribute}
          filter={filter}
          onClick={handleClick}
          operator={operator}
          value={value}
        />
      );
    }) || null
  );
};

FilterListURLQuery.defaultProps = {
  filtersSchema: [],
};

FilterListURLQuery.propTypes = {
  filtersSchema: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({
        type: PropTypes.string,
        mainField: PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.string,
        }),
      }),
    })
  ),
};

const AttributeTag = ({ attribute, filter, onClick, operator, value }) => {
  const { formatMessage, formatDate, formatTime, formatNumber } = useIntl();

  const handleClick = () => {
    onClick(filter);
  };

  const { fieldSchema } = attribute;

  const type = fieldSchema?.mainField?.schema?.type || fieldSchema.type;

  let formattedValue = value;

  if (type === 'date') {
    formattedValue = formatDate(value, { dateStyle: 'full' });
  }

  if (type === 'datetime') {
    formattedValue = formatDate(value, { dateStyle: 'full', timeStyle: 'short' });
  }

  if (type === 'time') {
    const [hour, minute] = value.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    formattedValue = formatTime(date, {
      numeric: 'auto',
      style: 'short',
    });
  }

  if (['float', 'integer', 'biginteger', 'decimal'].includes(type)) {
    formattedValue = formatNumber(value);
  }

  // Handle custom input
  if (attribute.metadatas.customInput) {
    // If the custom input has an options array, find the option with a customValue matching the query value
    if (attribute.metadatas.options) {
      const selectedOption = attribute.metadatas.options.find((option) => {
        return option.customValue === value;
      });
      // Expecting option as an object: {label: 'Neat label', customValue: 'some.value'}
      // return the label or fallback to the query value
      formattedValue = selectedOption?.label || value;
    }
  }

  const content = `${attribute.metadatas.label || attribute.name} ${formatMessage({
    id: `components.FilterOptions.FILTER_TYPES.${operator}`,
    defaultMessage: operator,
  })} ${operator !== '$null' && operator !== '$notNull' ? formattedValue : ''}`;

  return (
    <Box padding={1}>
      <Tag onClick={handleClick} icon={<Cross />}>
        {content}
      </Tag>
    </Box>
  );
};

AttributeTag.propTypes = {
  attribute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fieldSchema: PropTypes.object.isRequired,
    metadatas: PropTypes.shape({
      label: PropTypes.string.isRequired,
      options: PropTypes.array,
      customInput: PropTypes.func,
    }).isRequired,
  }).isRequired,
  filter: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  operator: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
