import { useParams, useOutletContext } from 'react-router-dom';
import { Container, Col, Row, Callout, CalloutText, CalloutTitle, Text } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import ChartComponents from '../chart-components';

import HtmlAmbassyBloc from '../../../../components/html-ambassy-bloc';
import charts from './charts.json';

export default function StudentsMobilityPage() {
  const { isoCode } = useParams();
  const { data } = useFetchData(isoCode);
  const contextData = useOutletContext();
  const analyse = contextData['curiexplore-analyse'];

  const blocs = [];
  if (analyse.length !== 0) {
    blocs.push(analyse.find((el) => (el.fields.thematique === 'Mobilité entrante')).fields || null);
    blocs.push(analyse.find((el) => (el.fields.thematique === 'Mobilité sortante')).fields || null);
  }

  const dataMobilite = data['mobilite-internationale-etudiants'];
  const latestYear = data['mobilite-internationale-etudiants']?.[0]?.fields.year;

  let filteredData = [];
  if (dataMobilite && dataMobilite?.length > 0) {
    filteredData = dataMobilite.filter((country) => country.fields.year === latestYear);
  }

  let orderedData = [];
  if (filteredData && filteredData?.length > 0) {
    orderedData = filteredData.sort((a, b) => b.fields.value - a.fields.value).slice(0, 5);
  }

  const students = filteredData.map((el) => (
    el.fields.value
  ));

  const sumStudents = students.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  return (
    <Container>
      <Row>
        <Col>
          <Callout hasInfoIcon={false}>
            <CalloutTitle>
              {`Top 5 de la mobilité étudiante du pays en ${latestYear}`}
            </CalloutTitle>
            <CalloutText>
              <Text>
                En&nbsp;
                {latestYear}
                , on compte&nbsp;
                {sumStudents.toLocaleString()}
                &nbsp;étudiants internationaux soit [X]% des étudiants
              </Text>
              <ol>
                {orderedData.map((el) => (
                  <li key={uuidv4()}>
                    {`${el.fields.origin_country_fr} : ${el.fields.value.toLocaleString()} étudiants`}
                  </li>
                ))}
              </ol>
            </CalloutText>
          </Callout>
        </Col>
      </Row>
      <Row>
        <Col>
          {blocs.map((bloc) => (
            <HtmlAmbassyBloc data={bloc} />
          ))}
        </Col>
      </Row>
      <Row>
        <Col n="12">
          <ChartComponents charts={charts} />
        </Col>
      </Row>
    </Container>
  );
}
