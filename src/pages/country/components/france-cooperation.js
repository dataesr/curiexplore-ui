/* eslint-disable max-len */
import { useState, useEffect, useMemo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Container, Row, Col, Highlight, Link, Badge, Tag, Text } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';
import getLabel from '../../../utils/getLabel';
import Title from '../../../components/title';
import PublicationsChart from '../../../components/open-alex-charts/publications-chart';
import InstitutionsChart from '../../../components/open-alex-charts/institutions-chart';

export default function FranceCooperationPage() {
  const { isoCode } = useParams();
  const contextData = useOutletContext();
  const [dataProjects, setDataProjects] = useState([]);
  const [dataStructuresProjects, setDataStructuresProjects] = useState([]);
  const [pending, setPending] = useState(0);
  const [iso2, setIso2] = useState('');
  const urlProjects = 'https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/projects/search';
  const urlStructures = 'https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/structures/search';
  // const years = [2017, 2018, 2019];

  const years = useMemo(() => ([2017, 2018, 2019]), []);

  useEffect(() => {
    setIso2(contextData['curiexplore-pays'].find((country) => country.fields.iso3 === isoCode).fields.iso2);
  }, [contextData, isoCode]);

  useEffect(() => {
    const getDataProjects = async () => {
      setPending(0);
      const body = {
        pageSize: 0,
        query: '',
        filters: {
          'participants.structure.address.country': {
            type: 'MultiValueSearchFilter',
            op: 'any',
            values: [getLabel(isoCode, true)],
          },
          year: {
            type: 'MultiValueSearchFilter',
            op: 'any',
            values: [years[years.length - 1]],
          },
        },
        aggregations: {
          'participants.structure.id': {
            field: 'participants.structure.id',
            filters: {},
            min_doc_count: 1,
            order: {
              direction: 'DESC',
              type: 'COUNT',
            },
            size: 100,
          },
        },
      };

      const response = await fetch(urlProjects, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();

      setDataProjects(json.facets[0].entries);
      setPending(1);
    };

    getDataProjects();
  }, [isoCode, years]);

  useEffect(() => {
    const getDataStructures = async () => {
      const body = {
        pageSize: 10000,
        query: '',
        sourceFields: ['id', 'label', 'acronym', 'address', 'nature', 'isFrench'],
        filters: {
          id: {
            type: 'MultiValueSearchFilter',
            op: 'any',
            values: dataProjects.map((structure) => structure.value),
          },
        },
      };

      const response = await fetch(urlStructures, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();

      setDataStructuresProjects(json.results.map((structure) => structure.value));
      setPending(2);
    };

    if (pending === 1) getDataStructures();
  }, [dataProjects, pending]);

  // add number of projects in dataStructuresProjects
  const dataStructuresProjectsWithNbProjects = dataStructuresProjects.map((structure) => ({
    ...structure,
    nbProjects: dataProjects.find((el) => el.value === structure.id).count,
  }));

  const nbTop = 5;

  const frenchStructureWithNbProjects = dataStructuresProjectsWithNbProjects
    .filter((structure) => structure.address[0].country.toLowerCase() === 'france')
    .sort((a, b) => b.nbProjects - a.nbProjects)
    .slice(0, nbTop);
  const foreignStructureWithNbProjects = dataStructuresProjectsWithNbProjects
    .filter((structure) => structure.address[0].country.toLowerCase() === getLabel(isoCode, true).toLowerCase())
    .sort((a, b) => b.nbProjects - a.nbProjects)
    .slice(0, nbTop);

  const subTitle = (
    <Text>
      Source : &nbsp;
      <Link href="https://scanr.enseignementsup-recherche.gouv.fr/" target="_blank">
        scanR, moteur de la recherche et de l'innovation
      </Link>
    </Text>
  );

  const topTenFrenchTitle = (nb) => (
    <>
      Top des institutions Françaises travaillant avec le pays
      {' '}
      (
      {years.join(', ')}
      )
      <Badge className="fr-ml-1w" color="yellow-tournesol" text={nb} />
    </>
  );

  const topTenCountryTitle = (nb) => (
    <>
      Top des institutions du pays travaillant avec la France
      {' '}
      (
      {years.join(', ')}
      )
      <Badge className="fr-ml-1w" color="yellow-tournesol" text={nb} />
    </>
  );

  const getNbProjectsWithLabel = (nbProjects) => {
    if (nbProjects === 1) return `${nbProjects} projet commun`;
    return `${nbProjects} projets communs`;
  };

  return (
    <Container fluid spacing="mb-6w">
      <Row>
        <Col n="12">
          <Title
            icon="ri-map-pin-3-line"
            title="Collaboration avec la France"
            subTitle={subTitle}
          />
          <Highlight colorFamily="yellow-tournesol" className="fr-pt-1w">
            L'identification des publications communes de la France avec ses partenaires internationaux est réalisée via l'exploitation des affiliations des auteurs dans les données ouvertes décrivant les publications scientifiques. L'exploitation de ce texte libre présente de nombreuses difficultés qui ne permettent pas de garantir, à ce stade, l'exhaustivité dans la détection des publications communes de la recherche française avec ses partenaires internationaux. L'information mise à disposition via CurieXplore doit donc être prise avec distance et ne doit être considérée que comme une illustration des relations de co-publications internationales de la France.
          </Highlight>
        </Col>
      </Row>
      <PublicationsChart iso2={iso2} iso3={isoCode} />
      <InstitutionsChart iso2={iso2} iso3={isoCode} />
      {(pending < 2) ? (
        <Row>
          <Col n="12">
            Récupération des données depuis scanR ...
          </Col>
        </Row>
      ) : null}
      {
        (frenchStructureWithNbProjects.length > 0) ? (
          <>
            <Row className="fr-mt-1w">
              <Col n="12">
                <Title
                  icon="ri-arrow-up-circle-line"
                  title={topTenFrenchTitle(frenchStructureWithNbProjects.length)}
                  as="h4"
                  look="h4"
                  subTitle={subTitle}
                />
              </Col>
            </Row>
            <ol>
              {frenchStructureWithNbProjects.map((structure) => (
                <li key={uuidv4()}>
                  <div>
                    {structure.label.default}
                    {structure.acronym && (` (${structure.acronym.default})`)}
                  </div>
                  <div>
                    <Tag small>{getNbProjectsWithLabel(structure.nbProjects)}</Tag>
                    <Tag small className="fr-ml-1w">{`${structure.address[0].country}/${structure.address[0].city}`}</Tag>
                  </div>
                </li>
              ))}
            </ol>
          </>
        ) : null
      }
      {
        (foreignStructureWithNbProjects.length > 0) ? (
          <>
            <Row className="fr-mt-3w">
              <Col n="12">
                <Title
                  icon="ri-arrow-up-circle-line"
                  title={topTenCountryTitle(foreignStructureWithNbProjects.length)}
                  as="h4"
                  look="h4"
                  subTitle={subTitle}
                />
              </Col>
            </Row>
            <ol>
              {foreignStructureWithNbProjects.map((structure) => (
                <li key={uuidv4()}>
                  <div>
                    {structure.label.default}
                    {structure.acronym && (` (${structure.acronym.default})`)}
                  </div>
                  <div>
                    <Tag small>{getNbProjectsWithLabel(structure.nbProjects)}</Tag>
                    <Tag small className="fr-ml-1w">{`${structure.address[0].country}/${structure.address[0].city}`}</Tag>
                  </div>
                </li>
              ))}
            </ol>
          </>
        ) : null
      }
    </Container>

  );
}
