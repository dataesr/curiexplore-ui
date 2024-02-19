import { Callout, Col, Icon, Link, Title } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function WebSiteCard({ languages, links, name }) {
  if (!languages && languages.length === 0) {
    return null;
  }

  return (
    <>
      {languages.map((language, index) => (
        <Col key={index} n="12 md-6">
          <Callout hasInfoIcon={false} colors={['#F5E498', '#eee']}>
            <Title as="h3" look="h6">
              <Icon name="ri-global-line" />
              <Link href={links[index]} target="blank">
                {`${name} (${language || ''})`}
              </Link>
            </Title>
          </Callout>
        </Col>
      ))}
    </>
  );
}

WebSiteCard.propTypes = {
  languages: PropTypes.string,
  links: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

WebSiteCard.defaultProps = {
  languages: null,
};
