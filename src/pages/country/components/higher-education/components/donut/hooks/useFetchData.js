import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';

export default function useFetchData({ charts, countryCode }) {
  const [options, setOptions] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null);

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
        const subDomains = [];
        let brightness = [];
        const latestYear = json.records?.[0]?.fields.year;
        setTitle(`Répartition des diplômés par domaine d'études, ${latestYear}`);

        const domains = Object.values(charts.map((el) => (
          {
            name: el.domain,
            y: json?.records?.filter((item) => (item.fields.code === el.code) && (item.fields.year === latestYear))
              .map((item) => Math.round(item.fields.value))
              ?.[0] || 0,
            color: el.colorDomain,
          }
        )).reduce((acc, { name, color, y }) => {
          const key = `${name}_${color}`;
          acc[key] = acc[key] || { name, color, y: 0 };
          acc[key].y += y;
          return acc;
        }, {}));

        for (let j = 0; j < charts.length; j += 1) {
          brightness = 0.1 - (j / charts.length) / 7;
          subDomains.push({
            name: charts[j].title,
            y: json?.records?.filter((el) => (el.fields.code === charts[j].code))
              .filter((el) => (el.fields.year === latestYear))
              .map((el) => Math.round(el.fields.value))
              ?.[0] || 0,
            color: Highcharts.color(charts[j].colorDomain).brighten(brightness).get(),
          });
        }

        const sciences = domains.find((el) => el.name === 'Sciences, Technologies, Ingénierie et Mathématiques').y;

        setOptions({
          credits: {
            enabled: false,
          },
          chart: {
            type: 'pie',

          },
          title: {
            text: '',
          },
          legend: {
            align: 'right',
          },
          plotOptions: {
            pie: {
              shadow: false,
              center: ['50%', '50%'],
            },
          },
          series: [{
            name: 'Domaines',
            data: domains,
            size: '60%',
            dataLabels: {
              formatter() {
                return this.y ? `<b>${this.point.name}: ${this.y} % </b>` : null;
              },
              distance: '60%',
            },
          }, {
            name: 'Part des étudiants diplômés',
            data: subDomains,
            innerSize: '60%',
            dataLabels: {
              formatter() {
                // display only if around Sciences share
                return this.y >= sciences - 1 ? `<b>${this.point.name}: ${this.y} % </b>` : null;
              },
            },
          }],
        });
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, [charts, countryCode]);

  return { options, title, isLoading, error };
}
