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
        const firstValueCurrentCountry = json?.records?.filter((el) => el.fields.country_code === data.countryCode)
          .sort((a, b) => a.fields.year - b.fields.year)
          .find((el) => el.fields.value)
          .fields.value;
        const firstYearCurrentCountry = json?.records?.filter((el) => el.fields.country_code === data.countryCode)
          .sort((a, b) => a.fields.year - b.fields.year)
          .find((el) => el.fields.year)
          .fields.year;

        const dataSerieCurrentCountry = json?.records?.filter((el) => el.fields.country_code === data.countryCode)
          .sort((a, b) => a.fields.year - b.fields.year)
          .map((el) => {
            countryYears.push(el.fields.year);
            return ({
              x: Number(el.fields.year),
              y: (data.base100 === true) ? (el.fields.value / firstValueCurrentCountry) * 100 : el.fields.value,
              value: Math.fround(el.fields.value).toLocaleString(),
              unit: data.unit,
              ref: firstYearCurrentCountry,
            });
          });

        s.push({
          name: getLabel(data.countryCode),
          data: dataSerieCurrentCountry,
          color: '#FFCA00',
        });

        // Ajout des données des autres pays (comparaison) en fonction des années du pays en cours
        for (let index = 0; index < data.otherCodes.length; index += 1) {
          const firstValue = json?.records?.filter((el) => el.fields.country_code === data.otherCodes[index] && countryYears.includes(el.fields.year))
            .sort((a, b) => a.fields.year - b.fields.year)
            .find((el) => el.fields.value)
            .fields.value;
          const firstYear = json?.records?.filter((el) => el.fields.country_code === data.countryCode)
            .sort((a, b) => a.fields.year - b.fields.year)
            .find((el) => el.fields.year)
            .fields.year;

          const dataSerie = json?.records?.filter((el) => el.fields.country_code === data.otherCodes[index] && countryYears.includes(el.fields.year))
            .sort((a, b) => a.fields.year - b.fields.year)
            .map((el) => ({
              x: Number(el.fields.year),
              y: (data.base100 === true) ? (el.fields.value / firstValue) * 100 : el.fields.value,
              value: (el.fields.value.toFixed(2)).toLocaleString(),
              unit: data.unit,
              ref: firstYear,
            }));

          const obj = {
            name: getLabel(data.otherCodes[index]),
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
  }, [data.code, data.otherCodes, data.countryCode, data.sort, data.base100, data.unit]);

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
    subtitle: {
      text: `Source: ${data.source}`,
    },
    tooltip: {
      enabled: true,
      formatter() {
        return `<p><b>${this.point.x}</b> : ${this.point.value} ${this.point.unit}</p>`;
      },
    },
    series,
    title: {
      text: `${data.title} ${(data.base100 === true) ? '(base 100)' : ''}`,
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
