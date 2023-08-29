import { useEffect, useState } from 'react';

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnknownCountry, setIsUnknownCountry] = useState(false);

  useEffect(() => {
    const queries = [
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-pays&q=&rows=-1&facet=iso3`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=ccp-survey-information-generale&q=&rows=-1&refine.isoalpha3=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=ccp-survey-politique-francophone&q=&rows=-1&facet=isoalpha3&refine.isoalpha3=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-analyse&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-policy-ocde&q=&rows=-1&sort=startdate&facet=iso3&refine.iso3=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-ressources&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=mobilite-internationale-etudiants&q=&rows=-1&sort=year&facet=country_code&refine.country_code=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-timestamp&q=&rows=-1&sort=submitdate&facet=isoalpha3&refine.iso3=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/paysage/curiexplore/actors?filters[iso3]=${isoCode}`,
      `${process.env.REACT_APP_CURIEXPLORE_API}/opendatasoft?dataset=curiexplore-donnees-quantitatives&q=&rows=-1&facet=country_code&refine.country_code=${isoCode}`,
    ];

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => fetch(query).then((response) => response.json()));
        const allData = await Promise.all(queriesFetch);
        const saveData = {};
        allData.forEach((dataset) => {
          if (dataset?.parameters?.dataset) saveData[dataset.parameters.dataset] = dataset.records;
          else saveData['actors-data'] = dataset;
          if (dataset?.parameters?.dataset === 'curiexplore-pays') {
            setIsUnknownCountry(!dataset.records.map((el) => el.fields.iso3).includes(isoCode));
          }
        });
        setData(saveData);
        setIsLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setError(err);
      }
    };

    getData();
  }, [isoCode]);

  return { data, isLoading, isUnknownCountry, error };
}
