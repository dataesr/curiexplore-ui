import { useParams } from 'react-router-dom';
import CountryMap from '../../../components/country-map';

export default function CountryProfilePage() {
  const { isoCode } = useParams();
  return <CountryMap isoCode={isoCode} />;
}
