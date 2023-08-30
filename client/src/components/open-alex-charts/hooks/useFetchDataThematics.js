import { useEffect, useState } from 'react';

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line max-len
    const query = `${process.env.REACT_APP_CURIEXPLORE_API}/openalex?filter=publication_year:${process.env.REACT_APP_OPENALEX_RANGE},institutions.country_code:${isoCode},institutions.country_code:fr&group_by=concepts.id`;

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
