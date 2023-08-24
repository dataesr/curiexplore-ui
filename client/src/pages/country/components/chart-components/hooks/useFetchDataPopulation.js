import { useEffect, useState } from 'react';

import formatNumber from '../../../../../utils/formatNumber';

export default function useFetchData(data) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastYearData, setLastYearData] = useState(null);
  const [evolution, setEvolution] = useState({ label: null, data: null });
  const [lastYear, setLastYear] = useState(null);

  const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY } = process.env;
  const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;
  const baseUrl = '&dataset=curiexplore-donnees-quantitatives&rows=-1&disjunctive.code=true&disjunctive.country_code=true';
  const query = `${ENDPOINT_V1}${baseUrl}&refine.code=${data.code}&sort=${data.sort}&refine.country_code=${data.countryCode}`;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch(query);
      const json = await response.json();

      setLastYear(json.records[json.records.length - 1].fields.year);
      setLastYearData(formatNumber(json.records[json.records.length - 1].fields.value, 2).toLocaleString());
      const value = Math.round((json.records[json.records.length - 1].fields.value * 100) / json.records[0].fields.value - 100);
      let valueToPrint = '';
      valueToPrint = `${(value > 0) ? '+' : ''}${value.toString()} %`;
      setEvolution({
        label: `${json.records[0].fields.year} -> ${json.records[json.records.length - 1].fields.year}`,
        data: valueToPrint,
      });
      setIsLoading(false);
    };

    getData();
  }, [query]);

  return { lastYearData, evolution, lastYear, isLoading };
}
