import { Col, Container, Row, Title } from '@dataesr/react-dsfr';
import { useEffect, useState } from 'react';
import { FormattedDate } from 'react-intl';
import CountryCard from '../../../components/country-card';

const API_ODS_ENDPOINT = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search';
const { REACT_APP_ODS_API_KEY } = process.env;
const ENDPOINT_V1 = `${API_ODS_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;

function useLastUpdates() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = `${ENDPOINT_V1}&dataset=curiexplore-timestamp&q=&rows=8&sort=submitdate&facet=isoalpha3`;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        await fetch(query)
          .then((response) => (response.json()))
          .then((res) => setData(res?.records))
          .catch(() => setError(true));
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [query]);

  return { data, isLoading, error };
}

export default function LastUpdated() {
  const { data, isLoading, error } = useLastUpdates();
  if (!data) return null;
  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Erreur</p>;
  if (!data?.length) return null;
  return (
    <Container spacing="mb-6w">
      <Row>
        <Col>
          <Title as="h3">
            Dernières mises à jour
          </Title>
        </Col>
      </Row>
      <Row gutters>
        {data.map(({ fields }) => (
          <Col n="3" key={fields.iso3}>
            <CountryCard
              title={fields.pays}
              description={(
                <>
                  Mis à jour le
                  {' '}
                  <FormattedDate
                    value={fields?.submitdate}
                    day="numeric"
                    month="long"
                    year="numeric"
                  />
                </>
              )}
              isoCode={fields.iso3}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
