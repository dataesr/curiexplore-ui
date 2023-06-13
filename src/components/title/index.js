import PropTypes from 'prop-types';
import { Container, Icon, Row, Title } from '@dataesr/react-dsfr';

export default function TitleComponent({ icon, title, subTitle, as, look }) {
  const spaces = ((subTitle) ? ('fr-mb-0') : ('fr-mb-3w'));

  return (
    <Container fluid>
      <Row>
        <Title as={as} look={look} className={spaces}>
          {
            (icon) ? (
              <Icon name={icon} />
            ) : null
          }
          {title}
        </Title>
      </Row>
      {
        (subTitle) ? (
          <Row className="fr-mb-3w fr-card__detail">{subTitle}</Row>
        ) : null
      }
    </Container>
  );
}

TitleComponent.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  as: PropTypes.string,
  look: PropTypes.string,
};

TitleComponent.defaultProps = {
  icon: '',
  subTitle: '',
  as: 'h3',
  look: 'h3',
};
