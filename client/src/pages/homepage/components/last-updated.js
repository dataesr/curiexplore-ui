import { Col, Container, Row, Title } from '@dataesr/react-dsfr';
import { useEffect, useState } from 'react';
import { FormattedDate } from 'react-intl';

import CountryCard from '../../../components/country-card';

function useLastUpdates() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const query = `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-timestamp&q=&rows=8&sort=submitdate&facet=isoalpha3`;

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

  return { data, error, isLoading };
}

export default function LastUpdated() {
  const { data, error, isLoading } = useLastUpdates();

  if (!data) return null;
  if (isLoading) return <p>Chargement</p>;
  if (error) return <p>Erreur</p>;
  if (!data?.length) return null;

  return (
    <Container spacing="mb-6w">
      <Row>
        <Col>
          <Title as="h2" title="dernière mise à jour">
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
                <p>
                  Mis à jour le
                  {' '}
                  <FormattedDate
                    value={fields?.submitdate}
                    day="numeric"
                    month="long"
                    year="numeric"
                    aria-labelledby="last-updates-heading"
                  />
                </p>
              )}
              isoCode={fields.iso3}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
