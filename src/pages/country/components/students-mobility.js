import { useParams } from 'react-router-dom';
import { Callout, CalloutText, CalloutTitle } from '@dataesr/react-dsfr';
import useFetchData from '../hooks/useFetchData';

export default function StudentsMobilityPage() {
  const { isoCode } = useParams();
  const { data, isLoading, error } = useFetchData(isoCode);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error ...</div>;

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

  if (!dataMobilite) return null;
  return (
    <Callout hasInfoIcon={false}>
      <CalloutTitle>
        La mobilité étudiante du pays en&nbsp;
        {latestYear}
      </CalloutTitle>
      <CalloutText>
        <p>
          En&nbsp;
          {latestYear}
          , on compte&nbsp;
          {sumStudents}
          &nbsp;étudiants internationaux soit [X]% des étudiants aux Etats-Unis
        </p>
        {orderedData.map((el) => (
          <ul>
            {el.fields.origin_country_fr}
            &nbsp;:&nbsp;
            {el.fields.value}
            &nbsp;étudiants
          </ul>
        ))}
      </CalloutText>
    </Callout>
  );
}
