import { useEffect, useState } from 'react';

const { REACT_APP_ODS_API_KEY, REACT_APP_ODS_API_ENDPOINT } = process.env;
const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;

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
