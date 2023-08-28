import { useEffect, useState } from 'react';

export default function useFetchData({ charts, countryCode }) {
  const [options, setOptions] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-donnees-quantitatives&rows=-1&disjunctive.code=true&disjunctive.country_code=true&facet=year`;
    let url = `${baseUrl}&refine.country_code=${countryCode}`;
    for (let index = 0; index < charts.length; index += 1) {
      url += `&refine.code=${charts[index].code}`;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        const series = [];
        const yearsData = json.facet_groups.find((facetGroup) => facetGroup.name === 'year').facets
          .map((y) => y.name)
          .sort((a, b) => a - b);
        const categories = [...new Set(yearsData)]; // années uniques triées ASC

        for (let index = 0; index < charts.length; index += 1) {
          series.push({
            name: charts[index].title,
            data: json?.records?.filter((el) => (el.fields.code === charts[index].code))
              .sort((a, b) => a.fields.year - b.fields.year)
              .map((el) => {
                if (categories.includes(el.fields.year)) {
                  return (Math.round(el.fields.value));
                }
                return 0;
              }),
          });
        }

        setOptions({
          credits: {
            enabled: false,
          },
          chart: {
            type: 'streamgraph',

          },
          legend: {
            align: 'right',
          },
          title: {
            text: "Evolution de la part des diplômés en fonction du domaine d'études",
          },
          subtitle: {
            text: 'Source : <a href="https://www.unesco.org/fr">UNESCO</a>',
          },
          xAxis: {
            type: 'category',
            categories,

          },
          yAxis: {
            visible: false,
            startOnTick: false,
            endOnTick: false,
          },
          plotOptions: {
            series: {
              label: {
                minFontSize: 5,
                maxFontSize: 15,
                style: {
                  color: 'rgba(255,255,255,0.75)',
                },
              },
              accessibility: {
                exposeAsGroupOnly: true,
              },
            },
          },
          series,
          exporting: {
            sourceWidth: 800,
            sourceHeight: 600,
          },
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
