/* eslint-disable max-len */
import { Container, Row, Col, Link, Badge, Tag, Text } from '@dataesr/react-dsfr';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import PublicationsChart from '../../../components/open-alex-charts/publications-chart';
import InstitutionsChart from '../../../components/open-alex-charts/institutions-chart';
import Title from '../../../components/title';
import getLabel from '../../../utils/getLabel';

export default function FranceCooperationPage() {
  const { isoCode } = useParams();
  const contextData = useOutletContext();
  const [dataProjects, setDataProjects] = useState([]);
  const [dataStructuresProjects, setDataStructuresProjects] = useState([]);
  const [pending, setPending] = useState(0);
  const [iso2, setIso2] = useState('');
  const urlProjects = `${process.env.REACT_APP_SCANR_API_URL}/projects/search`;
  const urlStructures = `${process.env.REACT_APP_SCANR_API_URL}/structures/search`;
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
            op: 'any',
            type: 'MultiValueSearchFilter',
            values: [getLabel(isoCode, true)],
          },
          year: {
            op: 'any',
            type: 'MultiValueSearchFilter',
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
  }, [isoCode, urlProjects, years]);

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

      if (dataProjects.length !== 0) {
        const response = await fetch(urlStructures, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const json = await response.json();

        if (json.results) {
          setDataStructuresProjects(json.results.map((structure) => structure.value));
          setPending(2);
        }
      }
    };

    if (pending === 1) getDataStructures();
  }, [dataProjects, pending, urlStructures]);

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
            title="Les liens avec la France"
          />
          <Text className="fr-mb-3w">
            L'identification des publications communes de la France avec ses partenaires internationaux est réalisée via l'exploitation des affiliations des auteurs dans les données ouvertes décrivant les publications scientifiques. L'exploitation de ce texte libre présente de nombreuses difficultés qui ne permettent pas de garantir, à ce stade, l'exhaustivité dans la détection des publications communes de la recherche française avec ses partenaires internationaux. L'information mise à disposition via CurieXplore doit donc être prise avec distance et ne doit être considérée que comme une illustration des relations de co-publications internationales de la France.
          </Text>
        </Col>
      </Row>
      <PublicationsChart iso2={iso2} iso3={isoCode} />
      <InstitutionsChart iso2={iso2} iso3={isoCode} />
      {
        (frenchStructureWithNbProjects.length > 0) ? (
          <>
            <Row className="fr-mt-3w fr">
              <Col n="12">
                <Title
                  icon="ri-arrow-up-circle-line"
                  title={topTenFrenchTitle(frenchStructureWithNbProjects.length.toString())}
                  as="h4"
                  look="h4"
                  subTitle={subTitle}
                />
              </Col>
            </Row>
            <ol className="fr-mx-3w fr-mb-3w">
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
            <Row className="fr-mt-3w fr">
              <Col n="12">
                <Title
                  icon="ri-arrow-up-circle-line"
                  title={topTenCountryTitle(foreignStructureWithNbProjects.length.toString())}
                  as="h4"
                  look="h4"
                  subTitle={subTitle}
                />
              </Col>
            </Row>
            <ol className="fr-mx-3w fr-mb-3w">
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
