import { useEffect, useState } from 'react';

export default function useFetchData({ isoCode }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY } = process.env;
    const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;
    const baseUrl = '&dataset=curiexplore-ressources';
    const query = `${ENDPOINT_V1}${baseUrl}&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}`;

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(query);
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
