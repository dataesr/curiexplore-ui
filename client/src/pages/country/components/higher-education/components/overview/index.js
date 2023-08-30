import { Row, Col } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

import IndicatorCard from '../../../../../../components/indicator-card';
import Title from '../../../../../../components/title';
// Récupération des données affichées dans le donut
import charts from '../donut/charts.json';
import formatNumber from '../../../../../../utils/formatNumber';

export default function Overview({ data }) {
  let seriesCountry = [];
  const ID_TOTAL_STU = '25053';

  // Nombre moyen d'années de scolarité
  const MOYSCO = { ...data.find((el) => el.fields.code === 'MOYSCO')?.fields };

  // Effectif total supérieur
  const total = { ...data
    // récupérer la donnée la plus récente
    .sort((a, b) => b.fields.year - a.fields.year)
    .find((el) => el.fields.code === '25053')?.fields };

  // Effectif par domaine d'études
  for (let j = 0; j < charts.length; j += 1) {
    seriesCountry.push({
      label: charts[j].label,
      code: charts[j].code,
      value: data?.filter((el) => (el.fields?.code === charts[j].code && el.fields?.year === total.year))
        .map((el) => Math.round(el.fields?.value))
        ?.[0] || 0,
      year: total.year,
    });
  }

  seriesCountry.sort((a, b) => b.value - a.value);
  seriesCountry = seriesCountry.slice(0, 1);

  const getIndicator = (code) => {
    if (code.code === 'MOYSCO') {
      return (
        <h3 className="text-center fr-mb-0">
          {code.value.toFixed(1)}
          &nbsp;
          {code.unit}
        </h3>
      );
    }
    if (code.code === ID_TOTAL_STU) {
      return (
        <h3 className="text-center fr-mb-0">
          {formatNumber(Math.floor(code.value))}
          &nbsp;étudiants
        </h3>
      );
    }
    if (code.code === seriesCountry[0].code) {
      return (
        <h3 className="text-center fr-mb-0">
          {code.value.toFixed(0)}
          &nbsp;%
        </h3>
      );
    }
    return null;
  };

  return (
    <>
      <Title
        as="h3"
        icon="ri-search-eye-line"
        title="En un clin d'oeil"
      />
      <Row gutters className="fr-mb-1w">
        {
          (Object.keys(total).length !== 0) ? (
            <Col n="4">
              <IndicatorCard
                badgeLabel={total.year}
                indicator={getIndicator(total)}
                description={total.label}
              />
            </Col>
          ) : null
        }
        {
          ((Object.keys(seriesCountry[0]).length !== 0) && (seriesCountry[0].value !== 0)) ? (
            <Col n="4">
              <IndicatorCard
                badgeLabel={seriesCountry[0].year}
                indicator={getIndicator(seriesCountry[0])}
                description={seriesCountry[0].label}
              />
            </Col>
          ) : null
        }
        {
          (Object.keys(MOYSCO).length !== 0) ? (
            <Col n="4">
              <IndicatorCard
                badgeLabel={MOYSCO.year}
                indicator={getIndicator(MOYSCO)}
                description={MOYSCO.label}
              />
            </Col>
          ) : null
        }
      </Row>
    </>

  );
}

Overview.propTypes = {
  data: PropTypes.object.isRequired,
};
