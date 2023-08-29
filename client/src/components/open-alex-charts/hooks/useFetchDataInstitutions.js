/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';

exportingModule(Highcharts);
exportingData(Highcharts);

const { REACT_APP_OPENALEX_RANGE, REACT_APP_OPENALEX_URL } = process.env;

export default function useFetchData(isoCode) {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `${REACT_APP_OPENALEX_URL}&filter=publication_year:${REACT_APP_OPENALEX_RANGE},institutions.country_code:${isoCode},institutions.country_code:fr&group_by=authorships.institutions.id`;
    const getData = async () => {
      try {
        setIsLoading(true);
        const allData = await fetch(query).then((response) => (response.json()));
        setData(allData.group_by);
        setIsLoading(false);

        setOptions({
          lang: {
            downloadPNG: 'Télécharger en format PNG',
            downloadCSV: 'Télécharger en format CSV',
          },
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: true,
            menuItemDefinitions: {
              downloadPNG: {},
              downloadCSV: {},
            },
            buttons: {
              contextButton: {
                menuItems: ['downloadCSV', 'downloadPNG'],
              },
            },
          },
        });
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [isoCode]);

  return { options, data, isLoading, error };
}
