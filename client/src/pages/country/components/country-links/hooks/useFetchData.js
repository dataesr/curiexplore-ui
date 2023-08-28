import { useEffect, useState } from 'react';

export default function useFetchData({ isoCode }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const url = `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-ressources&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}`;
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

  return { data, error, isLoading };
}
