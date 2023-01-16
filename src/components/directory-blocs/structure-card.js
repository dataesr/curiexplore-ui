import { Button, Title } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function StructureCard({ name, address, postalCode, phoneNumber, website, city, type, country }) {
  let cardTitle;
  switch (type) {
  case 'embassy':
    cardTitle = 'Ambassade';
    break;
  case 'campusFrance':
    cardTitle = 'Campus France';
    break;
  case 'cci':
    cardTitle = 'CCI';
    break;
  default:
    cardTitle = null;
  }
  return (
    <div className="fr-card fr-card--grey">
      <Title as="h3">{cardTitle}</Title>
      <div>{name}</div>
      <div>{address}</div>
      <div>{`${city} ${postalCode}`}</div>
      <div>{phoneNumber}</div>
      <div>
        {website ? (
          <Button icon="ri-external-link-line">
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
            >
              Voir le site
            </a>
          </Button>
        ) : ''}
      </div>
    </div>
  );
}
StructureCard.propTypes = {
  address: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  phoneNumber: PropTypes.number,
  postalCode: PropTypes.string,
  type: PropTypes.string,
  website: PropTypes.string,
};

StructureCard.defaultProps = {
  address: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  postalCode: PropTypes.string,
  phoneNumber: PropTypes.number,
  type: PropTypes.string,
  website: PropTypes.string,
};
