import React from 'react';

import { EmptyStateLayout } from '@strapi/design-system';
import { EmptyDocuments } from '@strapi/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const NoContent = ({ content, ...rest }) => {
  const { formatMessage } = useIntl();

  return (
    <EmptyStateLayout
      icon={<EmptyDocuments width="10rem" />}
      {...rest}
      content={formatMessage(
        { id: content.id, defaultMessage: content.defaultMessage },
        content.values
      )}
    />
  );
};

NoContent.defaultProps = {
  content: {
    id: 'app.components.EmptyStateLayout.content-document',
    defaultMessage: 'No content found',
    values: {},
  },
};

NoContent.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
    values: PropTypes.object,
  }),
};

export { NoContent };
