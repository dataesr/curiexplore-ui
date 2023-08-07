import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function PageTracker({ children }) {
  const { pathname } = useLocation();
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({ documentTitle: pathname });
  }, [pathname, trackPageView]);

  return children;
}

PageTracker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTracker;
