import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';
import { useEffect, useState } from 'react';

exportingModule(Highcharts);
exportingData(Highcharts);

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line max-len
    const query = `${process.env.REACT_APP_CURIEXPLORE_API}/openalex?&filter=publication_year:${process.env.REACT_APP_OPENALEX_RANGE},institutions.country_code:${isoCode},institutions.country_code:fr&group_by=publication_year`;
    const getData = async () => {
      try {
        setIsLoading(true);
        const allData = await fetch(query).then((response) => response.json());
        setData(allData?.group_by ?? []);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    if (isoCode?.length > 0) getData();
  }, [isoCode]);

  return { data, error, isLoading };
}
