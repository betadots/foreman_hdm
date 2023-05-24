import React from 'react';
import { registerReducer } from 'foremanReact/common/MountingService';
import { addGlobalFill } from 'foremanReact/components/common/Fill/GlobalFill';
import { registerRoutes } from 'foremanReact/routes/RoutingService';
import Routes from './src/Router/routes'
import reducers from './src/reducers';
import HdmTab from './src/Extends/Host/HdmTab';
import "./src/Extends/index";

// register reducers
Object.entries(reducers).forEach(([key, reducer]) =>
    registerReducer(key, reducer)
);

// register client routes
registerRoutes('PluginHdm', Routes);

// register fills for extending foreman core
// http://foreman.surge.sh/?path=/docs/introduction-slot-and-fill--page
// addGlobalFill('<slotId>', '<fillId>', <div key='plugin-template-example' />, 300);
addGlobalFill(
  "host-details-page-tabs",
  "HDM",
  <HdmTab key="hdm-fill-root" />,
  490,
  {
    title: __('HDM'),
    hideTab: ({hostDetails}) => (hostDetails.hdm_proxy == null)
  }, 
);
