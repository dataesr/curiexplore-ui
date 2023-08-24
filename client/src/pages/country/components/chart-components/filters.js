import { useState } from 'react';
import PropTypes from 'prop-types';
import { Title, Tag, TagGroup, Button } from '@dataesr/react-dsfr';
import { v4 as uuidV4 } from 'uuid';
import countriesList from '../../../../assets/data/countriesList.json';
import getLabel from '../../../../utils/getLabel';

function ListCountries({ isoCodes, selectedIsoCodes, title, onChangeFilters }) {
  const [max, setMax] = useState(10);

  const updateCountryFilter = (iso) => {
    const newselectedIsoCodes = [...selectedIsoCodes];
    const index = selectedIsoCodes.indexOf(iso);
    if (index > -1) {
      newselectedIsoCodes.splice(index, 1);
    } else {
      newselectedIsoCodes.push(iso);
    }
    onChangeFilters(newselectedIsoCodes);
  };
  let bt = null;
  if (isoCodes.length > max) {
    bt = <Button onClick={() => setMax(isoCodes.length)}>... Voir tous les pays</Button>;
  }
  if (isoCodes.length <= max && max !== 10) {
    bt = <Button onClick={() => setMax(10)}>... Réduire la liste</Button>;
  }
  return (
    <>
      <Title as="h3">{title}</Title>
      <TagGroup>
        {
          isoCodes.map((iso3, i) => {
            const label = getLabel(iso3);
            if (i <= max) {
              return (
                <Tag
                  colorFamily="yellow-tournesol"
                  key={uuidV4}
                  onClick={() => updateCountryFilter(iso3)}
                  selected={selectedIsoCodes.includes(iso3)}
                >
                  {label}
                </Tag>
              );
            }
            return null;
          })
        }
      </TagGroup>
      {bt}
    </>
  );
}

ListCountries.propTypes = {
  isoCodes: PropTypes.array.isRequired,
  selectedIsoCodes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onChangeFilters: PropTypes.func.isRequired,
};

export default function Filters({ bordersIsoCodes, currentIsoCode, selectedIsoCodes, onChangeFilters }) {
  return (
    <>
      <ListCountries
        isoCodes={['FRA', 'OED', 'WLD', 'EUU']}
        selectedIsoCodes={selectedIsoCodes}
        title="France & groupes"
        onChangeFilters={onChangeFilters}
      />
      <hr />
      <ListCountries
        isoCodes={bordersIsoCodes}
        selectedIsoCodes={selectedIsoCodes}
        title="Pays limitrophes"
        onChangeFilters={onChangeFilters}
      />
      <hr />
      <ListCountries
        isoCodes={countriesList.filter((country) => (
          country.hasData === 'TRUE'
          && country.ISO_alpha3 !== currentIsoCode))
          .map((el) => (el.ISO_alpha3))}
        selectedIsoCodes={selectedIsoCodes}
        title="Tous les pays"
        onChangeFilters={onChangeFilters}
      />
    </>
  );
}

Filters.propTypes = {
  bordersIsoCodes: PropTypes.array.isRequired,
  currentIsoCode: PropTypes.string.isRequired,
  selectedIsoCodes: PropTypes.array.isRequired,
  onChangeFilters: PropTypes.func.isRequired,
};
