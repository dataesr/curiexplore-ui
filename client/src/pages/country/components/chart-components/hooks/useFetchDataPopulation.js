import { useEffect, useState } from 'react';

import formatNumber from '../../../../../utils/formatNumber';

export default function useFetchData(data) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastYearData, setLastYearData] = useState(null);
  const [evolution, setEvolution] = useState({ label: null, data: null });
  const [lastYear, setLastYear] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const baseUrl = `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-donnees-quantitatives&rows=-1&disjunctive.code=true&disjunctive.country_code=true`;
      const url = `${baseUrl}&refine.code=${data.code}&sort=${data.sort}&refine.country_code=${data.countryCode}`;
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.records.length === 0) { return null; }
        setLastYear(json?.records[json.records.length - 1].fields.year);
        setLastYearData(formatNumber(json.records[json.records.length - 1].fields.value, 2).toLocaleString());
        const value = Math.round((json.records[json.records.length - 1].fields.value * 100) / json.records[0].fields.value - 100);
        const valueToPrint = `${(value > 0) ? '+' : ''}${value.toString()} %`;
        setEvolution({
          label: `${json.records[0].fields.year} -> ${json.records[json.records.length - 1].fields.year}`,
          data: valueToPrint,
        });
        return {};
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return {};
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [data.code, data.countryCode, data.sort]);

  return { lastYearData, evolution, lastYear, isLoading };
}
