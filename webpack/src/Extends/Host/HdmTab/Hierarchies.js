import React from 'react';
import PropTypes from 'prop-types';
import { STATUS } from 'foremanReact/constants';
import { Divider, EmptyStateIcon, Title } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import EmptyState from 'foremanReact/components/common/EmptyState/EmptyStatePattern';
import { global_danger_color_200 as dangerColor } from '@patternfly/react-tokens';
import Skeleton from 'react-loading-skeleton';
import { useAPI } from 'foremanReact/common/hooks/API/APIHooks';
import Hierarchy from './Hierarchy';

const Hierarchies = ({ hostname, keyName }) => {
  let hierarchies = [];

  if (keyName) {
    const url = `${window.location.origin.toString()}/foreman_hdm/hosts/${hostname}/keys/${keyName}`;
    const { response, status } = useAPI('get', url);

    if (status === STATUS.PENDING) {
      return <Skeleton count={5} />;
    }

    if (status === STATUS.ERROR) {
      const description = __('Could not fetch HDM data.');
      const icon = (
        <EmptyStateIcon icon={ExclamationCircleIcon} color={dangerColor.value} />
      );
      return (
        <EmptyState header={__('Error!')} icon={icon} description={description} />
      );
    }

    if (Array.isArray(response)) {
      hierarchies = response.map((item) => {
        return (
          <div keyName={item.hierarchy_name}>
            <Hierarchy hierarchy={item} />
          </div>
        );
      });
    }
  }

  const header = () => {
    if (keyName) {
      const prefix = __("Key: ");
      return (
        <div>
          <Title headingLevel="h2">
            <b>{prefix}</b>
            {keyName}
          </Title>
          <Divider className="pf-u-mb-md" />
        </div>
      );
    } else {
      const message = __("Please select a key from the list on the left.");
      return (
        <EmptyState header={__('No key selected')} description={message} />
      );
    }
  }

  return (
    <div>
      {header()}
      {hierarchies}
    </div>
  );
};

Hierarchies.propTypes = {
  hostname: PropTypes.string,
  keyName: PropTypes.string
};

Hierarchies.defaultProps = {
  hostname: "",
  keyName: null
};

export default Hierarchies;
