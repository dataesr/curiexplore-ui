import { useEffect, useState } from 'react';

const { REACT_APP_OPENALEX_RANGE, REACT_APP_OPENALEX_URL } = process.env;

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = `${REACT_APP_OPENALEX_URL}&filter=publication_year:${REACT_APP_OPENALEX_RANGE},institutions.country_code:${isoCode},institutions.country_code:fr&group_by=concepts.id`;

    const getData = async () => {
      try {
        setIsLoading(true);
        const allData = await fetch(query).then((response) => response.json());
        setData(allData.group_by);
        setIsLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setError(err);
      }
    };
    getData();
  }, [isoCode]);

  return { data, error, isLoading };
}
