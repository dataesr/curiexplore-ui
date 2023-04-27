import { useEffect, useState } from 'react';

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
        const latestYear = json.records?.[0]?.fields.year;
        setTitle(`Répartition des étudiants diplômés par domaine d'études, ${latestYear}`);

        for (let j = 0; j < charts.length; j += 1) {
          subDomains.push({
            name: charts[j].title,
            y: json?.records?.filter((el) => (el.fields.code === charts[j].code))
              .filter((el) => (el.fields.year === latestYear))
              .map((el) => Math.round(el.fields.value))
              ?.[0] || 0,
            color: charts[j].colorDomain,
            legend: charts[j].legend,
          });
        }

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
            },
          },
          tooltip: {
            enabled: true,
            formatter() {
              return this.point.legend;
            },
          },
          series: [{
            name: 'Part des étudiants diplômés',
            data: subDomains,
            dataLabels: {
              formatter() {
                // display only if not null
                return this.y > 0 ? `<b>${this.point.name}, ${this.y} % </b>` : null;
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
