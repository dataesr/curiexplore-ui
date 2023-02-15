import { useEffect, useState } from 'react';
import getLabel from '../../../../../utils/getLabel';

export default function useFetchData(data) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY } = process.env;
    const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;
    const baseUrl = '&dataset=curiexplore-donnees-quantitatives&rows=-1&disjunctive.code=true&disjunctive.country_code=true';
    let query = `${ENDPOINT_V1}${baseUrl}&refine.code=${data.code}&sort=${data.sort}`;

    // ajout des isoCode demandés par l'utilisateur
    for (let index = 0; index < data.isoCodes.length; index += 1) {
      query += `&refine.country_code=${data.isoCodes[index]}`;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(query);
        const json = await response.json();
        const s = [];

        for (let index = 0; index < data.isoCodes.length; index += 1) {
          const dataSerie = json?.records?.filter((el) => el.fields.country_code === data.isoCodes[index])
            .sort((a, b) => a.fields.year - b.fields.year)
            .map((el) => ({
              x: Number(el.fields.year),
              y: el.fields.value,
            }));

          const obj = {
            name: getLabel(data.isoCodes[index]),
            // data: countrySerie,
            data: dataSerie,
          };
          if (data.isoCodes[index] === 'FRA') obj.color = '#000091';
          if (index === (data.isoCodes.length - 1)) obj.color = '#FFCA00';
          s.push(obj);
        }
        setSeries(s);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, [data.code, data.isoCodes, data.sort]);

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: data.type,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 0,
    },
    series,
    title: {
      text: data.title,
    },
    xAxis: {
      type: 'category',
      allowDecimals: false,
      labels: {
        step: 1,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
  };

  return { options, isLoading, error };
}
