import { useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import HtmlAmbassyBloc from '../../../components/html-ambassy-bloc';

export default function CountryPolicyPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];

  const blocs = [];
  if (data.length !== 0) {
    blocs.push(data.find((el) => (el.fields.codethematique === 'A1'))?.fields || null);
    blocs.push(data.find((el) => (el.fields.codethematique === 'A2'))?.fields || null);
    blocs.push(data.find((el) => (el.fields.codethematique === 'A3'))?.fields || null);
    blocs.push(data.find((el) => (el.fields.codethematique === 'A4'))?.fields || null);
  } else {
    return (
      <div>
        - Section vide -
      </div>
    );
  }

  return (
    <>
      {blocs.map((bloc) => (
        <HtmlAmbassyBloc data={bloc} key={uuidv4()} exportView />
      ))}
    </>
  );
}
