import countriesList from '../assets/data/countriesList.json';

export default function getLabel(isoCode, en = false) {
  if (en) return countriesList.find((el) => el?.ISO_alpha3 === isoCode)?.Pays_eng;
  return countriesList?.find((el) => el?.ISO_alpha3 === isoCode)?.Pays;
}
