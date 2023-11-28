import { useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import HtmlAmbassyBloc from '../../../components/html-ambassy-bloc';
import { useTitle } from '../../../hooks/usePageTitle';

export default function InternationalCooperationPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];
  useTitle('Coopération internationale - Curiexplore');

  const blocs = [];
  if (data.length === 0) {
    return (
      <div>
        - Aucune donnée disponible -
      </div>
    );
  }

  blocs.push(data.find((el) => (el.fields.codethematique === 'A7'))?.fields || null);
  blocs.push(data.find((el) => (el.fields.codethematique === 'A8'))?.fields || null);

  return (
    <>
      {blocs.map((bloc) => (
        <HtmlAmbassyBloc data={bloc} key={uuidv4()} />
      ))}
    </>
  );
}
