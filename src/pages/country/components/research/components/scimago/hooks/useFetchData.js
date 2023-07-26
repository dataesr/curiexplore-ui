import { useEffect, useState } from 'react';

export default function useFetchData() {
  const [data, setData] = useState();
  const [years, setYears] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY } = process.env;
    const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;

    const getData = async () => {
      try {
        setIsLoading(true);
        const query = `${ENDPOINT_V1}&dataset=ccp-scimago&rows=5000&facet=year`;
        const response = await fetch(query);
        const json = await response.json();
        setData(json.records);

        const yearsData = json.facet_groups.find((facetGroup) => facetGroup.name === 'year').facets
          .map((y) => y.name)
          .sort((a, b) => b - a);

        const uniqueYears = [...new Set(yearsData)];

        setYears(uniqueYears || []);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  return { years, data, isLoading, error };
}
