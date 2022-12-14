import { useEffect, useState } from 'react';

const API_ODS_ENDPOINT = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search';
const { REACT_APP_ODS_API_KEY } = process.env;
const ENDPOINT_V1 = `${API_ODS_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;

export default function useFetchData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queries = [
      { 'annuaire-ambassade': `${ENDPOINT_V1}&dataset=curiexplore-annuaire-ambassade&q=&rows=-1` },
      { 'annuaire-campusfrance': `${ENDPOINT_V1}&dataset=curiexplore-annuaire-campusfrance&q=&rows=-1` },
      { 'annuaire-cci': `${ENDPOINT_V1}&dataset=curiexplore-annuaire-cci&q=&rows=-1` },
      { timestamp: `${ENDPOINT_V1}&dataset=curiexplore-timestamp&q=&rows=-1&sort=submitdate&facet=isoalpha3` },
    ];

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => (fetch(Object.values(query)[0]).then(async (response) => ({ [Object.keys(query)[0]]: await response.json() }))));
        const allData = await Promise.all(queriesFetch);
        setData(allData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, []);

  return { data, isLoading, error };
}
