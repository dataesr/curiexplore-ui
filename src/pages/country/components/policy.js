import { useOutletContext } from 'react-router-dom';
import HtmlAmbassyBloc from '../../../components/HtmlAmbassyBloc';

export default function CountryPolicyPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];

  const blocs = [];
  blocs.push(data.find((el) => (el.fields.thematique === 'Orientations stratégiques')).fields || null);
  blocs.push(data.find((el) => (el.fields.thematique === 'Financement')).fields || null);
  blocs.push(data.find((el) => (el.fields.thematique === 'Evaluations')).fields || null);
  blocs.push(data.find((el) => (el.fields.thematique === 'Politique francophone')).fields || null);

  return (
    <>
      {blocs.map((bloc) => (
        <HtmlAmbassyBloc data={bloc} />
      ))}
    </>
  );
}
