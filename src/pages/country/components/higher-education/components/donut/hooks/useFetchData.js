import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';

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
        let domains = [];
        const subDomains = [];
        let brightness = [];
        const latestYear = json.records?.[0]?.fields.year;

        for (let index = 0; index < charts.length; index += 1) {
          domains.push({
            name: charts[index].domain,
            y: json?.records?.filter((el) => (el.fields.code === charts[index].code) && (el.fields.year === latestYear))
              .map((el) => Math.round(el.fields.value))
              ?.[0] || 0,
            color: charts[index].colorDomain,
          });
        }

        domains = Object.values(domains.reduce((acc, { name, color, y }) => {
          const key = `${name }_${ color}`;
          acc[key] = acc[key] || { name, color, y: 0 };
          acc[key].y += y;
          return acc;
        }, {}));

        for (let j = 0; j < charts.length; j += 1) {
          brightness = 0.1 - (j / charts.length) / 5;
          subDomains.push({
            name: charts[j].title,
            y: json?.records?.filter((el) => (el.fields.code === charts[j].code))
              .filter((el) => (el.fields.year === latestYear))
              .map((el) => Math.round(el.fields.value))
              ?.[0] || 0,
            color: Highcharts.color(charts[j].colorDomain).brighten(brightness).get(),
          });
        }

        setOptions({
          credits: {
            enabled: false,
          },
          chart: {
            type: 'pie',

          },
          legend: {
            align: 'right',
          },
          title: {
            text: "Part des diplômés en fonction du domaine d'études",
          },
          subtitle: {
            text: 'Source: <a href="https://www.unesco.org/fr">UNESCO</a>',
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
                return this.y > 5 ? this.point.name : null;
              },
              color: '#ffffff',
              distance: -30,
            },
          }, {
            name: 'Sous domaines',
            data: subDomains,
            innerSize: '60%',
            dataLabels: {
              formatter() {
                // display only if larger than 1
                return this.y > 1 ? `<b>${ this.point.name }:</b> ${
                  this.y }%` : null;
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

  return { options, isLoading, error };
}
