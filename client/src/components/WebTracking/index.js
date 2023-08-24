import { createInstance, MatomoProvider } from '@jonkoops/matomo-tracker-react';
import PropTypes from 'prop-types';

function WebTracking({ children }) {
  const instance = createInstance({
    urlBase: 'https://piwik.enseignementsup-recherche.pro',
    siteId: 41,
    disabled: false,
    configurations: {
      disableCookies: true,
    },
  });

  return <MatomoProvider value={instance}>{children}</MatomoProvider>;
}

WebTracking.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WebTracking;
