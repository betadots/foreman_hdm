import React from 'react';
import PropTypes from 'prop-types';
import { STATUS } from 'foremanReact/constants';
import { Divider, EmptyStateIcon, Grid, GridItem, Menu, MenuContent, MenuList, MenuItem} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import EmptyState from 'foremanReact/components/common/EmptyState/EmptyStatePattern';
import { global_danger_color_200 as dangerColor } from '@patternfly/react-tokens';
import Skeleton from 'react-loading-skeleton';
import { useAPI } from 'foremanReact/common/hooks/API/APIHooks';
import Hierarchies from './Hierarchies';

const HdmTab = ({ response: tabResponse, status: tabStatus, location: { pathname } }) => {
  const hostname = tabResponse.name;
  const url = `${window.location.origin.toString()}/foreman_hdm/hosts/${hostname}/keys`;
  const { response, status } = useAPI('get', url);
  const [activeItem, setActiveItem] = React.useState(0);

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

  const onSelect = (event, itemId) => {
    setActiveItem(itemId);
  };

  let menuItems = [];
  if (Array.isArray(response)) {
    menuItems = response.map((item) => {
      return (
        <div key={item.name}>
          <MenuItem itemId={item.name}>
            {item.name}
          </MenuItem>
          <Divider component="li" />
        </div>
      );
    });
  }

  return (
    <div>
      <Grid hasGutter>
        <GridItem span={6}>
          <Menu onSelect={onSelect} activeItemId={activeItem}>
            <MenuContent>
              <MenuList>{menuItems}</MenuList>
            </MenuContent>
          </Menu>
        </GridItem>
        <GridItem span={6}>
          <Hierarchies hostname={hostname} keyName={activeItem} />
        </GridItem>
      </Grid>
    </div>
  );
};

HdmTab.propTypes = {
  response: PropTypes.object,
  status: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
HdmTab.defaultProps = {
  location: { pathname: '' },
  response: { name: '' },
  status: STATUS.PENDING,
};

export default HdmTab;
