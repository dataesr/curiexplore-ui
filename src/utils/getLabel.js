import countriesList from '../assets/data/countriesList.json';

export default function getLabel(isoCode) {
  return countriesList.find((el) => el.ISO_alpha3 === isoCode).Pays;
}
