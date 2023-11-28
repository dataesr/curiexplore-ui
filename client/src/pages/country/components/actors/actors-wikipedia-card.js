import { Callout, Col, Icon, Link } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function WikipediaCard({ title, nameEn }) {
  return (
    (title && nameEn) && (
      <Col n="12 md-6">
        <Callout hasInfoIcon={false} colors={['#F5E498', '#eee']}>
          <h3 className="fr-card__title">
            <Icon name="ri-wikipedia-line" />
            <Link
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(nameEn?.replace(/\s/g, '_'))}`}
              target="_blank"
              verticalIconPosition="top"
            >
              {`Wikipedia (${title})`}
            </Link>
          </h3>
        </Callout>
      </Col>
    )
  );
}

WikipediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  nameEn: PropTypes.string.isRequired,
};
