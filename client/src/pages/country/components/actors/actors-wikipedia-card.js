import { Callout, Col, Icon, Link, Title } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function WikipediaCard({ title, nameEn }) {
  return (
    (title && nameEn) && (
      <Col n="12 md-6">
        <Callout hasInfoIcon={false} colors={['#F5E498', '#eee']}>
          <Title as="h3" look="h6">
            <Icon name="ri-wikipedia-line" />
            <Link
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(nameEn?.replace(/\s/g, '_'))}`}
              target="_blank"
              verticalIconPosition="top"
            >
              {`Wikipedia (${title})`}
            </Link>
          </Title>
        </Callout>
      </Col>
    )
  );
}

WikipediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  nameEn: PropTypes.string.isRequired,
};
