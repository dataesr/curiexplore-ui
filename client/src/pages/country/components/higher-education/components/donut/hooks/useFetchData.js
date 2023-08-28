import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';

exportingModule(Highcharts);
exportingData(Highcharts);

export default function useFetchData({ charts, countryCode }) {
  const [options, setOptions] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const baseUrl = '/api/opendatasoft?dataset=curiexplore-donnees-quantitatives&rows=-1&sort=year&disjunctive.code=true&disjunctive.country_code=true&facet=year';
    let url = `${baseUrl}&refine.country_code=${countryCode}`;
    for (let index = 0; index < charts.length; index += 1) {
      url += `&refine.code=${charts[index].code}`;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
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

        const temp = subDomains.map((el) => (
          el.y
        ));

        const sum = temp.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );

        setOptions({
          lang: {
            downloadPNG: 'Télécharger en format PNG',
            downloadCSV: 'Télécharger en format CSV',
          },
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: true,
            menuItemDefinitions: {
              downloadPNG: {},
              downloadCSV: {},
            },
            buttons: {
              contextButton: {
                menuItems: ['downloadCSV', 'downloadPNG'],
              },
            },
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
          sum,
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
