import { useEffect, useState } from 'react';

const API_ODS_ENDPOINT = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search';
const { REACT_APP_ODS_API_KEY } = process.env;
const ENDPOINT_V1 = `${API_ODS_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;

export default function useFetchDataCountries() {
  const [dataCountries, setDataCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queries = [
      `${ENDPOINT_V1}&dataset=curiexplore-pays&q=&rows=-1&facet=iso3`,
    ];

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => (fetch(query).then((response) => (response.json()))));
        const allData = await Promise.all(queriesFetch);
        const saveData = {};
        allData.forEach((dataset) => {
          saveData[dataset.parameters.dataset] = dataset.records;
        });
        setDataCountries(saveData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, []);

  return { dataCountries, isLoading, error };
}
