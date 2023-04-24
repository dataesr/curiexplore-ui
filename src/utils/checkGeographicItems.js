export default function checkGeographicItems(fields) {
  const items = [];

  if (fields.sub_saharan_africa === 'True') {
    items.push({ label: 'Afrique et Océan Indien', code: 'sub_saharan_africa' });
  }
  if (fields.middle_east_north_africa === 'True') {
    items.push({ label: 'Afrique du Nord et Moyen-Orient', code: 'middle_east_north_africa' });
  }
  if (fields.central_america_caraibes === 'True') {
    items.push({ label: 'Amérique centrale et Caraïbes', code: 'central_america_caraibes' });
  }
  if (fields.asia_oceania === 'True') {
    items.push({ label: 'Asie-Océanie', code: 'asia_oceania' });
  }
  if (fields.european_union === 'True') {
    items.push({ label: 'Union européenne', code: 'european_union' });
  }
  if (fields.continental_europe === 'True') {
    items.push({ label: 'Europe continentale', code: 'continental_europe' });
  }
  if (fields.south_america === 'True') {
    items.push({ label: 'Amérique du sud', code: 'south_america' });
  }
  if (fields.north_america === 'True') {
    items.push({ label: 'Amérique du nord', code: 'north_america' });
  }

  return items;
}
