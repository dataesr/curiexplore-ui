import PropTypes from 'prop-types';
import { Title, Text, Icon } from '@dataesr/react-dsfr';

import useFetchDataPopulation from './hooks/useFetchDataPopulation';
import PopulationCard from '../../../../components/population-card/index';

export default function PopulationComponent({ data, isoCode }) {
  const { lastYearData, evolution, lastYear } = useFetchDataPopulation({
    code: data.code,
    sort: data.sort,
    countryCode: isoCode,
  });

  const description = (
    <>
      <Title as="h3">
        {lastYearData}
      </Title>
      <Text>
        {evolution.label}
        <Icon name="ri-arrow-right-s-fill" />
        <strong>{evolution.data}</strong>
      </Text>
    </>
  );

  return (
    <PopulationCard
      badgeLabel={lastYear}
      description={description}
      title={data.title}
    />
  );
}

PopulationComponent.propTypes = {
  data: PropTypes.object.isRequired,
  isoCode: PropTypes.string.isRequired,
};
