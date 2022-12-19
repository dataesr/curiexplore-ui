import { Col, Row } from '@dataesr/react-dsfr';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { MapContainer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import CountryMap from '../../../components/country-map';
import { GraphContainer, GraphTitle } from '../../../components/graph';
import useFetchData from '../hooks/useFetchData';

export default function CountryProfilePage() {
  const { isoCode } = useParams();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const { data } = useFetchData(isoCode);

  const options = {
    credits: {
      enabled: false,
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'middle',
    },
    series: [{
      name: data['curiexplore-pays']?.[0]?.fields?.name_fr,
      data: series,
    }],
    title: {
      text: 'Produit intérieur brut, à prix courants ($PPA)',
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: {
        text: null,
      },
    },
  };

  useEffect(() => {
    const API_ODS_ENDPOINT = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search';
    const { REACT_APP_ODS_API_KEY } = process.env;
    const ENDPOINT_V1 = `${API_ODS_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;
    const query = `${ENDPOINT_V1}&dataset=curiexplore-donnees-quantitatives&q=&rows=-1&refine.country_code=${isoCode}&refine.code=NY.GDP.MKTP.PP.CD&sort=-year`;

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(query);
        const json = await response.json();
        setCategories(json?.records?.reduce(
          (accumulator, currentValue) => [...accumulator, currentValue?.fields?.year],
          [],
        ));
        setSeries(json?.records?.reduce(
          (accumulator, currentValue) => [...accumulator, currentValue?.fields?.value],
          [],
        ));
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, [categories, data, isoCode]);

  return (
    <Row gutters>
      <Col n="12">
        <MapContainer
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
          style={{
            height: '400px',
            backgroundColor: '#FFCA00',
            position: 'relative',
          }}
        >
          <CountryMap isoCode={isoCode} />
        </MapContainer>
      </Col>
      <Col n="12">
        <GraphContainer>
          <GraphTitle>
            <span>
              Evolution du produit intérieur brut
            </span>
          </GraphTitle>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </GraphContainer>
      </Col>
    </Row>
  );
}
