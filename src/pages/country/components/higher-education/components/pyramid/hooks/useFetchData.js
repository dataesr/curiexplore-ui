import { useEffect, useState } from 'react';

export default function useFetchData({ charts, countryCode }) {
  const [options, setOptions] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY } = process.env;
    const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;
    const baseUrl = '&dataset=curiexplore-donnees-quantitatives&rows=-1&sort=year&disjunctive.code=true&disjunctive.country_code=true&facet=year';
    let query = `${ENDPOINT_V1}${baseUrl}&refine.country_code=${countryCode}`;

    // ajout des code graph du fichier de parametrage
    for (let index = 0; index < charts.length; index += 1) {
      query += `&refine.code=${charts[index].code}`;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(query);
        const json = await response.json();
        const series = [];
        const latestYear = json.records?.[0]?.fields.year;

        const total = json?.records?.filter((el) => (el.fields.year === latestYear) && (el.fields.code === '25053'))
          .map((el) => el.fields.value);

        for (let index = 0; index < charts.length; index += 1) {
          series.push({
            name: json?.records?.filter((el) => (el.fields.code === charts[index].code) && (el.fields.year === latestYear))
              .map((el) => el.fields.country_label)
              ?.[0] || countryCode,
            y: json?.records?.filter((el) => (el.fields.code === charts[index].code) && (el.fields.year === latestYear))
              .map((el) => (-(el.fields.value * 100) / total).toFixed(2))
              ?.[0] || 0,
          });
        }

        console.log(series);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, [charts, countryCode]);

  return { options, isLoading, error };
}
