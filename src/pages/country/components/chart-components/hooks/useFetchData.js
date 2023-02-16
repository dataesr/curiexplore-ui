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
    let query = `${ENDPOINT_V1}${baseUrl}&refine.code=${data.code}&sort=${data.sort}&refine.country_code=${data.countryCode}`;

    // ajout des isoCode demandés par l'utilisateur
    for (let index = 0; index < data.otherCodes.length; index += 1) {
      query += `&refine.country_code=${data.otherCodes[index]}`;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(query);
        const json = await response.json();
        const s = [];

        // Ajout des données du pays en cours
        const countryYears = [];
        const dataSerieCurrentCountry = json?.records?.filter((el) => el.fields.country_code === data.countryCode)
          .sort((a, b) => a.fields.year - b.fields.year)
          .map((el) => {
            countryYears.push(el.fields.year);
            return ({
              x: Number(el.fields.year),
              y: el.fields.value,
            });
          });

        s.push({
          name: getLabel(data.countryCode),
          // data: countrySerie,
          data: dataSerieCurrentCountry,
          color: '#FFCA00',
        });

        // Ajout des données des autres pays (comparaison) en fonction des années du pays en cours
        for (let index = 0; index < data.otherCodes.length; index += 1) {
          const dataSerie = json?.records?.filter((el) => el.fields.country_code === data.otherCodes[index] && countryYears.includes(el.fields.year))
            .sort((a, b) => a.fields.year - b.fields.year)
            .map((el) => ({
              x: Number(el.fields.year),
              y: el.fields.value,
            }));

          const obj = {
            name: getLabel(data.otherCodes[index]),
            // data: countrySerie,
            data: dataSerie,
          };
          if (data.otherCodes[index] === 'FRA') obj.color = '#000091';
          s.push(obj);
        }
        setSeries(s);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, [data.code, data.otherCodes, data.countryCode, data.sort]);

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
