import React from 'react';
import WelcomePage from './WelcomePage';

const routes = [
  {
    path: '/foreman_hdm/welcome',
    exact: true,
    render: (props) => <WelcomePage {...props} />,
  },
];

export default routes;
