import { useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import HtmlAmbassyBloc from '../../../components/html-ambassy-bloc';

export default function CountryPolicyPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];

  const blocs = [];
  if (data.length !== 0) {
    blocs.push(data.find((el) => (el.fields.thematique === 'Orientations stratégiques')).fields || null);
    blocs.push(data.find((el) => (el.fields.thematique === 'Financement')).fields || null);
    blocs.push(data.find((el) => (el.fields.thematique === 'Evaluations')).fields || null);
    blocs.push(data.find((el) => (el.fields.thematique === 'Politique francophone')).fields || null);
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
        <HtmlAmbassyBloc data={bloc} key={uuidv4()} />
      ))}
    </>
  );
}
