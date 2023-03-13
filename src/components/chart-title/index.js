import PropTypes from 'prop-types';
import { Icon, Text, Title } from '@dataesr/react-dsfr';

export default function ChartTitle({ title, subTitile }) {
  return (
    <>
      <Title as="h3" className="fr-mb-0">
        <Icon name="ri-pie-chart-2-fill" />
        {title}
      </Title>
      {
        (subTitile) ? (
          <Text className="fr-mb-0">{subTitile}</Text>
        ) : null
      }
    </>
  );
}

ChartTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitile: PropTypes.string,
};

ChartTitle.defaultProps = {
  subTitile: '',
};
