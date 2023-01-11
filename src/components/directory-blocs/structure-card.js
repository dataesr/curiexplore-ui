import { Button } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function StructureCard({ name, address, postalCode, phoneNumber, website, city, type, country }) {
  return (
    <div className={`fr-card card-${type}`}>
      <p className="structure">{name}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{postalCode}</p>
      <p>{phoneNumber}</p>
      <p className="country">{country}</p>
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
