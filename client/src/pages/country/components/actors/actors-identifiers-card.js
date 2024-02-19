import { Callout, Col, Icon, Link, Row, Title } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

function Identifiers({ type, identifiersId }) {
  const getLink = (el) => {
    let linkTo = '';
    switch (el.type) {
    case 'annelis':
      linkTo = `https://dgesip-annelis.adc.education.fr/etablissement/${el.value}`;
      break;
    case 'bnf':
      linkTo = `https://catalogue.bnf.fr/ark:/12148/cb${el.value}`;
      break;
    case 'cnrs-grafilabo':
      linkTo = `https://www2.cnrs.fr/graflabo/unite.php?cod_uni=${el.value}`;
      break;
    case 'cnrs-unit':
      linkTo = `https://web-ast.dsi.cnrs.fr/l3c/owa/structure.infos_admin?&p_lab=${el.value}&p_origine_appel=u`;
      break;
    case 'fundref':
      linkTo = `https://search.crossref.org/funding?q=${el.value}`;
      break;
    case 'idhal':
      linkTo = `https://aurehal.archives-ouvertes.fr/structure/read/id/${el.value}`;
      break;
    case 'idref':
      linkTo = `https://www.idref.fr/${el.value}`;
      break;
    case 'isni':
      linkTo = `http://www.isni.org/${el.value.split(' ').join('')}`;
      break;
    case 'nnt':
      linkTo = `http://www.theses.fr/${el.value}`;
      break;
    case 'oc':
      linkTo = `https://opencorporates.com/companies/${el.value}`;
      break;
    case 'orcid':
      linkTo = `https://orcid.org/${el.value}`;
      break;
    case 'pia':
      linkTo = `https://anr.fr/ProjetIA-${el.value}`;
      break;
    case 'pic':
      linkTo = `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/org-details/${el.value}`;
      break;
    case 'rcr':
      linkTo = `http://www.sudoc.abes.fr//DB=2.2/SET=1/TTL=3/CMD?ACT=SRCHA&IKT=8888&SRT=RLV&TRM=${el.value}`;
      break;
    case 'rna':
      linkTo = `https://entreprise.data.gouv.fr/etablissement/${el.value}`;
      break;
    case 'rnsr':
      linkTo = `https://appliweb.dgri.education.fr/rnsr/PresenteStruct.jsp?numNatStruct=${el.value}&PUBLIC=OK`;
      break;
    case 'ror':
      linkTo = `https://ror.org/${el.value}`;
      break;
    case 'scopus':
      linkTo = `https://www.scopus.com/authid/detail.uri?authorId=${el.value}`;
      break;
    case 'siren':
      linkTo = `https://annuaire-entreprises.data.gouv.fr/entreprise/${el.value.split(' ').join('')}`;
      break;
    case 'siret':
      linkTo = `https://annuaire-entreprises.data.gouv.fr/etablissement/${el.value.split(' ').join('')}`;
      break;
    case 'univ-droit':
      linkTo = `https://univ-droit.fr/universitaires/${el.value}`;
      break;
    case 'wikidata':
      linkTo = `https://wikidata.org/wiki/${el.value}`;
      break;
    case 'wikidata_json':
      linkTo = `https://www.wikidata.org/wiki/Special:EntityData/${el.value}.json`;
      break;
    case 'wos':
      linkTo = `https://publons.com/researcher/${el.value}/`;
      break;
    default:
      break;
    }
    return linkTo;
  };

  return (
    <Row gutters>
      {type.map((el, index) => (
        <Col n="12 md-4" key={index}>
          <Callout hasInfoIcon={false} colors={['#5958A8', '#eee']}>
            <Title as="h3" look="h6">
              <Icon name="ri-wikipedia-line" />
              <Link href={getLink({ type: el, value: identifiersId[index] })} target="_blank">
                {`${el.charAt(0).toUpperCase() + el.slice(1)} (${identifiersId[index]})`}
              </Link>
            </Title>
          </Callout>
        </Col>
      ))}
    </Row>
  );
}

Identifiers.propTypes = {
  type: PropTypes.arrayOf(PropTypes.string).isRequired,
  identifiersId: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Identifiers;
