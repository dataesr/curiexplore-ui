import { useEffect, useState } from 'react';

export default function useFetchData({ isoCode }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const url = `/api/opendatasoft?dataset=curiexplore-ressources&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}`;
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    getData();
  }, [isoCode]);

  return { data, isLoading, error };
}
