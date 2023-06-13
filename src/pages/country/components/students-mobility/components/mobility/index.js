import { useParams } from 'react-router-dom';
import { Col, Row, Text, Callout, CalloutText, CalloutTitle } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';
import useFetchData from '../../../../hooks/useFetchData';

export default function MobilityCallOut() {
  const { isoCode } = useParams();
  const { data } = useFetchData(isoCode);

  const dataMobilite = data['mobilite-internationale-etudiants'];
  const latestYear = data['mobilite-internationale-etudiants']?.[0]?.fields.year;
  let totalStudents = data['curiexplore-donnees-quantitatives'];

  if (totalStudents && totalStudents?.length > 0) {
    totalStudents = totalStudents.find((country) => (country.fields.code === '25053')
    && (country.fields.year === latestYear))?.fields?.value;
  }

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

  const shareMobiliteStudents = (sumStudents * 100) / totalStudents;

  return (
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
              {Math.floor(sumStudents).toLocaleString()}
                &nbsp;étudiants internationaux soit&nbsp;
              {shareMobiliteStudents.toFixed(2)}
              &nbsp;% des étudiants en enseignement supérieur
            </Text>
            <ol>
              {orderedData.map((el) => (
                <li key={uuidv4()}>
                  {`${el.fields.origin_country_fr} : ${Math.floor(el.fields.value).toLocaleString()} étudiants`}
                </li>
              ))}
            </ol>
          </CalloutText>
        </Callout>
      </Col>
    </Row>
  );
}

MobilityCallOut.propTypes = {

};
