/* eslint-disable max-len */
import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';
import { useEffect, useState } from 'react';

exportingModule(Highcharts);
exportingData(Highcharts);

const { REACT_APP_OPENALEX_RANGE, REACT_APP_OPENALEX_URL } = process.env;

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const query = `${REACT_APP_OPENALEX_URL}&filter=publication_year:${REACT_APP_OPENALEX_RANGE},institutions.country_code:${isoCode},institutions.country_code:fr&group_by=authorships.institutions.id`;
    const getData = async () => {
      try {
        setIsLoading(true);
        const allData = await fetch(query).then((response) => (response.json()));
        setData(allData.group_by);

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
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [isoCode]);

  return { data, error, isLoading, options };
}
