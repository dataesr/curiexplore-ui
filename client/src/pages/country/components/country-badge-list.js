import { Badge, BadgeGroup } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import checkGeographicItems from '../../../utils/checkGeographicItems';
import checkPolicyItems from '../../../utils/checkPolicyItems';

export default function CountryBadgeList({ data, geographic, policy, type }) {
  if (!data) return null;
  return (
    <BadgeGroup>
      {(policy) && checkPolicyItems(data).map((item) => <Badge type={type} key={item.code} text={item.label} />)}
      {(geographic) && checkGeographicItems(data).map((item) => <Badge type={type} key={item.code} text={item.label} />)}
    </BadgeGroup>
  );
}

CountryBadgeList.defaultProps = {
  data: null,
  geographic: false,
  policy: false,
  type: 'new',
};

CountryBadgeList.propTypes = {
  data: PropTypes.object,
  geographic: PropTypes.bool,
  policy: PropTypes.bool,
  type: PropTypes.oneOf([
    'error',
    'info',
    'new',
    'success',
    'warning',
  ]),
};
