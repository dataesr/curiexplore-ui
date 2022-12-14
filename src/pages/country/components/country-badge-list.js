import { Badge, BadgeGroup } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

const checkPolicyItems = (fields) => {
  const items = [];

  if (fields.bologne === 'True') {
    items.push('Processus de bologne');
  }
  if (fields.oecd_members === 'True') {
    items.push('Membre de l\'OCDE');
  }
  if (fields.euro_area === 'True') {
    items.push('Zone euro');
  }

  return items;
};

const checkGeographicItems = (fields) => {
  const items = [];

  if (fields.sub_saharan_africa === 'True') {
    items.push('Afrique et Océan Indien');
  }
  if (fields.middle_east_north_africa === 'True') {
    items.push('Afrique du Nord et Moyen-Orient');
  }
  if (fields.central_america_caraibes === 'True') {
    items.push('Amérique centrale et Caraïbes');
  }
  if (fields.asia_oceania === 'True') {
    items.push('Asie-Océanie');
  }
  if (fields.european_union === 'True') {
    items.push('Union européenne');
  }
  if (fields.continental_europe === 'True') {
    items.push('Europe continentale');
  }
  if (fields.south_america === 'True') {
    items.push('Amérique du sud');
  }
  if (fields.north_america === 'True') {
    items.push('Amérique du nord');
  }

  return items;
};

export default function CountryBadgeList({ data, geographic, policy, type }) {
  if (!data) return null;
  return (
    <BadgeGroup>
      {(policy) && checkPolicyItems(data).map((item) => <Badge type={type} key={item} text={item} />)}
      {(geographic) && checkGeographicItems(data).map((item) => <Badge type={type} key={item} text={item} />)}
    </BadgeGroup>
  );
}

CountryBadgeList.defaultProps = {
  geographic: false,
  policy: false,
  data: null,
  type: 'new',
};

CountryBadgeList.propTypes = {
  data: PropTypes.object,
  geographic: PropTypes.bool,
  policy: PropTypes.bool,
  type: PropTypes.string,
};
