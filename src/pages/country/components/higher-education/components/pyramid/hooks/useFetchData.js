import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';

export default function useFetchData({ charts, countryCode, countryCodeCurrent = 'FRA' }) {
  const [options, setOptions] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY } = process.env;
    const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;
    const baseUrl = '&dataset=curiexplore-donnees-quantitatives&rows=-1&sort=year&disjunctive.code=true&disjunctive.country_code=true';
    let query = `${ENDPOINT_V1}${baseUrl}&refine.country_code=${countryCode}&refine.country_code=${countryCodeCurrent}`;

    // ajout des code graph du fichier de parametrage
    for (let index = 0; index < charts.length; index += 1) {
      query += `&refine.code=${charts[index].code}`;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(query);
        const json = await response.json();
        let series = [];
        let seriesCountry = [];
        let seriesCountryCurrent = [];
        const latestYearCountry = json.records?.filter((el) => el.fields.country_code === countryCode).map((el) => el?.fields?.year)[0];
        const ID_TOTAL = '25053';
        const categories = ['cycle court', 'licence', 'master', 'doctorat'];
        setTitle(`Répartition de la part des diplômés par niveau d'études, ${latestYearCountry}`);

        const total = json?.records?.filter((el) => (el.fields.country_code === countryCode && el.fields.year === latestYearCountry && el.fields.code === ID_TOTAL))
          .map((el) => el?.fields?.value)[0];

        const totalCurrent = json?.records?.filter((el) => (el.fields.country_code === countryCodeCurrent && el.fields.year === latestYearCountry && el.fields.code === ID_TOTAL))
          .map((el) => el?.fields?.value)[0];

        for (let index = 0; index < charts.length; index += 1) {
          seriesCountry.push(json?.records?.filter((el) => (el.fields.country_code === countryCode && el.fields.code === charts[index].code && el.fields.year === latestYearCountry))
            .map((el) => Number(-(el.fields.value * 100) / total).toFixed(2))
            ?.[0] || 0);
          seriesCountryCurrent.push(json?.records?.filter((el) => (el.fields.country_code === countryCodeCurrent && el.fields.code === charts[index].code && el.fields.year === latestYearCountry))
            .map((el) => ((el.fields.value * 100) / totalCurrent).toFixed(2))
            ?.[0] || 0);
        }

        seriesCountry = seriesCountry.map((el) => parseFloat(el));
        seriesCountry.pop();
        seriesCountryCurrent = seriesCountryCurrent.map((el) => parseFloat(el));
        seriesCountryCurrent.pop();

        series = [
          {
            name: countryCode,
            data: seriesCountry,
            color: '#FFCA00',
          },
          {
            name: countryCodeCurrent,
            data: seriesCountryCurrent,
            color: 'blue-france-main-525',
          },
        ];

        setOptions({
          credits: {
            enabled: false,
          },
          chart: {
            type: 'bar',

          },
          title: {
            text: '',
          },
          accessibility: {
            point: {
              valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.',
            },
          },
          xAxis: [{
            categories,
            reversed: false,
            labels: {
              step: 1,
            },
            accessibility: {
              description: 'Part d\'étudiants par domaine en {countryCode}',
            },
          }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories,
            linkedTo: 0,
            labels: {
              step: 1,
            },
            accessibility: {
              description: 'Part d\'étudiants par domaine en {countryCodeCurrent}',
            },
          },
          ],
          yAxis: {
            title: {
              text: null,
            },
            labels: {
              formatter() {
                return `${Math.abs(this.value)} %`;
              },
            },
            accessibility: {
              description: 'Pourcentage d\'étudiants',
              rangeDescription: 'Range: 0 to 5%',
            },
          },
          plotOptions: {
            series: {
              stacking: 'normal',
            },
          },
          tooltip: {
            formatter() {
              return `<b>${this.series.name}</b><br/>`
                + `Part des étudiants en ${this.point.category} : ${Highcharts.numberFormat(Math.abs(this.point.y), 1)}%`;
            },
          },
          series,
        });
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, [charts, countryCode, countryCodeCurrent]);

  return { options, title, isLoading, error };
}
