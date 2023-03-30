import PropTypes from 'prop-types';
import { Icon, Text, Title } from '@dataesr/react-dsfr';

export default function TitleComponent({ icon, title, subTitle, as, look }) {
  return (
    <>
      <Title as={as} look={look} className="fr-mb-0">
        <Icon name={icon} />
        {title}
      </Title>
      {
        (subTitle) ? (
          <Text className="fr-mb-0">{subTitle}</Text>
        ) : null
      }
    </>
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
  icon: 'ri-pie-chart-2-fill',
  subTitle: '',
  as: 'h3',
  look: 'h3',
};
