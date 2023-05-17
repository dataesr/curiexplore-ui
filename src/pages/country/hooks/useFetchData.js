import { useEffect, useState } from 'react';

const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY, REACT_APP_PAYSAGE_API_ENDPOINT } = process.env;
const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isUnknownCountry, setIsUnknownCountry] = useState(false);

  useEffect(() => {
    const queries = [
      `${ENDPOINT_V1}&dataset=curiexplore-pays&q=&rows=-1&facet=iso3`,
      `${ENDPOINT_V1}&dataset=ccp-survey-information-generale&q=&rows=-1&refine.isoalpha3=${isoCode}`,
      `${ENDPOINT_V1}&dataset=ccp-survey-politique-francophone&q=&rows=-1&facet=isoalpha3&refine.isoalpha3=${isoCode}`,
      `${ENDPOINT_V1}&dataset=curiexplore-analyse&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}`,
      `${ENDPOINT_V1}&dataset=curiexplore-policy-ocde&q=&rows=-1&sort=startdate&facet=iso3&refine.iso3=${isoCode}`,
      `${ENDPOINT_V1}&dataset=curiexplore-ressources&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}`,
      `${ENDPOINT_V1}&dataset=mobilite-internationale-etudiants&q=&rows=-1&sort=year&facet=country_code&refine.country_code=${isoCode}`,
      `${ENDPOINT_V1}&dataset=curiexplore-timestamp&q=&rows=-1&sort=submitdate&facet=isoalpha3&refine.iso3=${isoCode}`,
      `${REACT_APP_PAYSAGE_API_ENDPOINT}?filters[iso3]=${isoCode}`,
      `${ENDPOINT_V1}&dataset=curiexplore-donnees-quantitatives&q=&rows=-1&facet=country_code&refine.country_code=${isoCode}`,
    ];

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => (fetch(query).then((response) => (response.json()))));
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
        setError(err);
      }
    };

    getData();
  }, [isoCode]);

  return { data, isLoading, error, isUnknownCountry };
}
