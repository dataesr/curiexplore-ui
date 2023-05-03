import PropTypes from 'prop-types';
import { Callout, Row, Col, Link } from '@dataesr/react-dsfr';
import GenericCard from '../../../../../../components/generic-card';

import Title from '../../../../../../components/title';

export default function EducationIndex({ data }) {
  // Nombre moyen d'années de scolarité
  const MOYSCO = { ...data.find((el) => el.fields.code === 'MOYSCO')?.fields };

  // Espérance de scolarisation
  const ESPSCO = { ...data.find((el) => el.fields.code === 'ESPSCO')?.fields };

  const getDescription = (code) => {
    if (code.code === 'MOYSCO') {
      return (
        <Title
          as="h3"
          title={`${code.value.toFixed(1)} ${code.unit}`}
          icon=""
        />
      );
    }
    if (code.code === 'ESPSCO') {
      return (
        <Title
          as="h3"
          title={`${code.value.toFixed(1)} ${code.unit}`}
          icon=""
        />
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
        <Col n="6">
          <GenericCard
            badgeLabel={MOYSCO.year}
            description={getDescription(MOYSCO)}
            title={MOYSCO.label}
          />
        </Col>
        <Col n="6">
          <GenericCard
            badgeLabel={ESPSCO.year}
            description={getDescription(ESPSCO)}
            title={ESPSCO.label}
          />
        </Col>
      </Row>
      <Row className="fr-mb-1w">
        <Callout hasInfoIcon={false}>
          Les 3 dimensions qui permettent le calcul de l'indice de développement humain (IDH) sont: l'espérance de vie en bonne santé, le savoir et le niveau de vie.
          Le savoir est un indice d'éducation calculé à partir de l'espérance d'année de scolarisation et le nombre moyen d'années de scolarité.
          Le nombre d'année effectif de scolarité est observé sur la population adulte de plus de 25 ans.
          <br />
          Voir le&nbsp;
          <Link
            href="https://hdr.undp.org/sites/default/files/data/2020/hdr2020_technical_notes.pdf"
            target="_blank"
          >
            détail
          </Link>
          .
        </Callout>
      </Row>

    </>
  );
}

EducationIndex.propTypes = {
  data: PropTypes.object.isRequired,
};
