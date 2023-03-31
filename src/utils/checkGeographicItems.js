export default function checkGeographicItems(fields) {
  const items = [];

  if (fields.sub_saharan_africa === 'True') {
    items.push('Afrique et Océan Indien');
  }
  if (fields.middle_east_north_africa === 'True') {
    items.push('Afrique du Nord et Moyen-Orient');
  }
  if (fields.central_america_caraibes === 'True') {
    items.push('Amérique centrale et Caraïbes');
  }
  if (fields.asia_oceania === 'True') {
    items.push('Asie-Océanie');
  }
  if (fields.european_union === 'True') {
    items.push('Union européenne');
  }
  if (fields.continental_europe === 'True') {
    items.push('Europe continentale');
  }
  if (fields.south_america === 'True') {
    items.push('Amérique du sud');
  }
  if (fields.north_america === 'True') {
    items.push('Amérique du nord');
  }

  return items;
}
