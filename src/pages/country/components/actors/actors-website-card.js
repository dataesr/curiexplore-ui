import { Callout, Col, Icon, Link } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function WebSiteCard({ language, link, name }) {
  return (
    <Col n="12 md-6">
      <Callout
        hasInfoIcon={false}
        colors={['#F5E498', '#eee']}
      >
        <h6 className="fr-card__title">
          <Icon name="ri-global-line" />
          <Link href={link} target="blank">
            {`${name}${language ? ` (${language})` : ''}`}
          </Link>
        </h6>
      </Callout>
    </Col>

  );
}

WebSiteCard.propTypes = {
  language: PropTypes.string,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

WebSiteCard.defaultProps = {
  language: null,
};
