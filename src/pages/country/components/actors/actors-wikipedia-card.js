import { Callout, Col, Icon, Link } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function WikipediaCard({ title }) {
  return (
    title && (
      <Col n="12 md-6">
        <Callout hasInfoIcon={false} colors={['#F5E498', '#eee']}>
          <h6 className="fr-card__title">
            <Icon name="ri-wikipedia-line" />
            <Link
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`}
              target="_blank"
              verticalIconPosition="top"
            >
              {`Wikipedia (${title})`}
            </Link>
          </h6>
        </Callout>
      </Col>
    )
  );
}

WikipediaCard.propTypes = {
  title: PropTypes.string.isRequired,
};
