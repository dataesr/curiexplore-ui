import { useEffect, useState } from 'react';

export default function useFetchData() {
  const [data, setData] = useState();
  const [years, setYears] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const url = `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=ccp-scimago&rows=5000&facet=year`;
        const response = await fetch(url);
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
