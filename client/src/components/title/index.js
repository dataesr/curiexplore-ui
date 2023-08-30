import { Badge, Container, Icon, Row, Title } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

export default function TitleComponent({ as, betaBadge, icon, look, subTitle, title }) {
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
          {
            (betaBadge) && <Badge text="Version [bêta]" className="fr-ml-1w" colorFamily="green-menthe" />
          }
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
  as: PropTypes.string,
  betaBadge: PropTypes.bool,
  icon: PropTypes.string,
  look: PropTypes.string,
  subTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

TitleComponent.defaultProps = {
  as: 'h3',
  betaBadge: false,
  icon: '',
  look: 'h3',
  subTitle: '',
};
