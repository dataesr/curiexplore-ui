import { useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import HtmlAmbassyBloc from '../../../components/html-ambassy-bloc';

export default function InternationalCooperationPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];

  const blocs = [];
  if (data.length === 0) {
    return (
      <div>
        - Aucune donnée disponible -
      </div>
    );
  }

  blocs.push(data.find((el) => (el.fields.thematique === "Politique d'attractivité")).fields || null);
  blocs.push(data.find((el) => (el.fields.thematique === 'Partenariats étrangers')).fields || null);

  return (
    <>
      {blocs.map((bloc) => (
        <HtmlAmbassyBloc data={bloc} key={uuidv4()} />
      ))}
    </>
  );
}
