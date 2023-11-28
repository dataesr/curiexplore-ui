import PropTypes from 'prop-types';
import { Callout, Row, Col, Link, Text } from '@dataesr/react-dsfr';
import IndicatorCard from '../../../../../../components/indicator-card';

import Title from '../../../../../../components/title';

export default function EducationIndex({ data }) {
  // Nombre moyen d'années de scolarité
  const MOYSCO = { ...data.find((el) => el.fields.code === 'MOYSCO')?.fields };

  // Espérance de scolarisation
  const ESPSCO = { ...data.find((el) => el.fields.code === 'ESPSCO')?.fields };

  const getIndicator = (code) => {
    if (code.code === 'MOYSCO') {
      return (
        <Text className="text-center fr-mb-0">
          {code.value.toFixed(1)}
          {' '}
          {code.unit}
        </Text>
      );
    }
    if (code.code === 'ESPSCO') {
      return (
        <Text className="text-center fr-mb-0">
          {code.value.toFixed(1)}
          {' '}
          {code.unit}
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      <Row>
        <Title
          as="h4"
          look="h4"
          title="L'indice d'éducation du pays"
          icon="ri-book-open-fill"
        />
      </Row>
      <Row gutters className="fr-mb-1w">
        {
          MOYSCO.year && (
            <Col n="12 md-6">
              <IndicatorCard
                badgeLabel={MOYSCO.year}
                indicator={getIndicator(MOYSCO)}
                description={MOYSCO.label}
              />
            </Col>
          )
        }
        {
          ESPSCO.year && (
            <Col n="12 md-6">
              <IndicatorCard
                badgeLabel={ESPSCO.year}
                indicator={getIndicator(ESPSCO)}
                description={ESPSCO.label}
              />
            </Col>

          )
        }
      </Row>
      <Row className="fr-mb-1w">
        <Callout hasInfoIcon={false}>
          <Text>
            Les 3 dimensions qui permettent le calcul de l'indice de développement humain (IDH) sont: l'espérance de vie en bonne santé, le savoir et le niveau de vie.
            Le savoir est un indice d'éducation calculé à partir de l'espérance d'année de scolarisation et le nombre moyen d'années de scolarité.
            Le nombre d'année effectif de scolarité est observé sur la population adulte de plus de 25 ans.
            <br />
            Voir la&nbsp;
            <Link
              href="https://hdr.undp.org/sites/default/files/data/2020/hdr2020_technical_notes.pdf"
              target="_blank"
            >
              documentation de l'indicateur
            </Link>
            .
          </Text>
        </Callout>
      </Row>

    </>
  );
}

EducationIndex.propTypes = {
  data: PropTypes.object.isRequired,
};
