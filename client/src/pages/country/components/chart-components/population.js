import PropTypes from 'prop-types';
import { Text, Icon, Col } from '@dataesr/react-dsfr';

import useFetchDataPopulation from './hooks/useFetchDataPopulation';
import PopulationCard from '../../../../components/generic-card/index';

export default function PopulationComponent({ data, isoCode }) {
  const { lastYearData, evolution, lastYear } = useFetchDataPopulation({
    code: data.code,
    sort: data.sort,
    countryCode: isoCode,
  });

  const description = (
    <Text className="fr-mb-0">
      {data.title}
    </Text>
  );

  const indicator = (
    <Text className="text-center fr-mb-0">
      <h3 className="fr-mb-0">
        {lastYearData}
      </h3>
      {evolution.label}
      <Icon name="ri-arrow-right-s-fill" />
      <strong>{evolution.data}</strong>
    </Text>
  );

  return (
    (evolution.data !== null) ? (
      <Col n="4">
        <PopulationCard
          badgeLabel={lastYear}
          description={description}
          indicator={indicator}
        />
      </Col>
    ) : null
  );
}

PopulationComponent.propTypes = {
  data: PropTypes.object.isRequired,
  isoCode: PropTypes.string.isRequired,
};
