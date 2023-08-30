import { Row, Col } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

import IndicatorCard from '../../../../../../components/generic-card';
import Title from '../../../../../../components/title';
import formatNumber from '../../../../../../utils/formatNumber';

export default function Overview({ data }) {
  const ID_TOTAL_PERSO = '20000';
  const ID_CREDITS = 'C_PPP';
  const ID_DIRD = 'G_XGDP';

  // Effectif total personnel R-D
  const totalRD = { ...data
    // récupérer la donnée la plus récente
    .sort((a, b) => b.fields.year - a.fields.year)
    .find((el) => el.fields.code === ID_TOTAL_PERSO)?.fields };

  // Total des Crédits budgétaires
  const totalCB = { ...data
    // récupérer la donnée la plus récente
    .sort((a, b) => b.fields.year - a.fields.year)
    .find((el) => el.fields.code === ID_CREDITS)?.fields };

  // DIRD en % du PIB
  const totalDIRD = { ...data
    // récupérer la donnée la plus récente
    .sort((a, b) => b.fields.year - a.fields.year)
    .find((el) => el.fields.code === ID_DIRD)?.fields };

  const getIndicator = (code) => {
    if (code.code === ID_TOTAL_PERSO) {
      return (
        <h3 className="text-center fr-mb-0">
          {formatNumber(Math.floor(code.value))}
          &nbsp;personnels
        </h3>
      );
    }
    if (code.code === ID_CREDITS) {
      return (
        <h3 className="text-center fr-mb-0">
          {formatNumber(Math.floor(code.value))}
          &nbsp;$ PPA des États-Unis
        </h3>
      );
    }
    if (code.code === ID_DIRD) {
      return (
        <h3 className="text-center fr-mb-0">
          {code.value.toFixed(2)}
          &nbsp;% du PIB
        </h3>
      );
    }
    return null;
  };

  return (
    <>
      <Title
        as="h3"
        title="En un clin d'oeil"
        icon="ri-search-eye-line"
      />
      <Row gutters className="fr-mb-1w">
        {
          (Object.keys(totalRD).length !== 0) ? (
            <Col n="4">
              <IndicatorCard
                badgeLabel={totalRD.year}
                indicator={getIndicator(totalRD)}
                description={totalRD.label}
              />
            </Col>
          ) : null
        }
        {
          (Object.keys(totalCB).length !== 0) ? (
            <Col n="4">
              <IndicatorCard
                badgeLabel={totalCB.year}
                indicator={getIndicator(totalCB)}
                description={totalCB.label}
              />
            </Col>
          ) : null
        }
        {
          (Object.keys(totalDIRD).length !== 0) ? (
            <Col n="4">
              <IndicatorCard
                badgeLabel={totalDIRD.year}
                indicator={getIndicator(totalDIRD)}
                description={totalDIRD.label}
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
