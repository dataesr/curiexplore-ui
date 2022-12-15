import { useOutletContext } from 'react-router-dom';
import HtmlAmbassyBloc from '../../../components/HtmlAmbassyBloc';

export default function CountryHigherEducationPage() {
  const contextData = useOutletContext();
  const data = contextData['curiexplore-analyse'];

  const dataES = data.find((el) => (el.fields.thematique === 'Enseignement supérieur')).fields || null;

  return (
    <HtmlAmbassyBloc data={dataES} />
  );
}
