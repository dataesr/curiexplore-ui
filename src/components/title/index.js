import PropTypes from 'prop-types';
import { Icon, Text, Title } from '@dataesr/react-dsfr';

export default function TitleComponent({ icon, title, subTitle, as, look }) {
  const spaces = ((subTitle) ? ('fr-mb-0') : ('fr-mb-2w'));

  return (
    <>
      <Title as={as} look={look} className={spaces}>
        {
          (icon) ? (
            <Icon name={icon} />
          ) : null
        }
        {title}
      </Title>
      {/* TODO: PROBLEME D'ALIGNEMENT TITRE. ex 32HYq */}
      {
        (subTitle) ? (
          <Text className="fr-mb-3w">{subTitle}</Text>
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
  icon: '',
  subTitle: '',
  as: 'h3',
  look: 'h3',
};
