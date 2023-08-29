import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';

exportingModule(Highcharts);
exportingData(Highcharts);

const { REACT_APP_OPENALEX_RANGE } = process.env;
const API_OPEN_ALEX_ENDPOINT = 'https://api.openalex.org/works?mailto=bso@recherche.gouv.fr';

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `${API_OPEN_ALEX_ENDPOINT}&filter=publication_year:${REACT_APP_OPENALEX_RANGE},institutions.country_code:${isoCode},institutions.country_code:fr&group_by=publication_year`;

    const getData = async () => {
      try {
        setIsLoading(true);
        const allData = await fetch(query).then((response) => (response.json()));
        setData(allData.group_by);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [isoCode]);

  return { data, isLoading, error };
}