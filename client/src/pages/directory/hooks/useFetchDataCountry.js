import { useEffect, useState } from 'react';

export default function useFetchDataCountries() {
  const [dataCountries, setDataCountries] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queries = [
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-pays&q=&rows=-1&facet=iso3`,
    ];

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => fetch(query).then((response) => response.json()));
        const allData = await Promise.all(queriesFetch);
        const saveData = {};
        allData.forEach((dataset) => {
          saveData[dataset.parameters.dataset] = dataset.records;
        });
        setDataCountries(saveData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    getData();
  }, []);

  return { dataCountries, error, isLoading };
}
