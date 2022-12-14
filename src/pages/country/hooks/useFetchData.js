import { useEffect, useState } from 'react';

const API_ODS_ENDPOINT = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search';
// const API_ODS_ENDPOINT_V2 = 'https://data.enseignementsup-recherche.gouv.fr/api/v2/catalog/datasets';
const { REACT_APP_ODS_API_KEY } = process.env;
const ENDPOINT_V1 = `${API_ODS_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;

export default function useFetchData(isoCode) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queries = [
      { 'ccp-survey-information-generale': `${ENDPOINT_V1}&dataset=ccp-survey-information-generale&q=&rows=-1&refine.isoalpha3=${isoCode}` },
      { 'ccp-survey-politique-francophone': `${ENDPOINT_V1}&dataset=ccp-survey-politique-francophone&q=&rows=-1&facet=isoalpha3&refine.isoalpha3=${isoCode}` },
      { analyse: `${ENDPOINT_V1}&dataset=curiexplore-analyse&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}` },
      { 'annuaire-ambassade': `${ENDPOINT_V1}&dataset=curiexplore-annuaire-ambassade&q=&rows=-1&refine.iso3=${isoCode}` },
      { 'annuaire-campusfrance': `${ENDPOINT_V1}&dataset=curiexplore-annuaire-campusfrance&q=&rows=-1&refine.iso3=${isoCode}` },
      { 'annuaire-cci': `${ENDPOINT_V1}&dataset=curiexplore-annuaire-cci&q=&rows=-1&refine.iso3=${isoCode}` },
      { pays: `${ENDPOINT_V1}&dataset=curiexplore-pays&q=&rows=-1&facet=iso3&refine.iso3=${isoCode}` },
      { 'policy-ocde': `${ENDPOINT_V1}&dataset=curiexplore-policy-ocde&q=&rows=-1&sort=startdate&facet=iso3&refine.iso3=${isoCode}` },
      { ressources: `${ENDPOINT_V1}&dataset=curiexplore-ressources&q=&rows=-1&facet=isoa3&refine.iso3=${isoCode}` },
      { timestamp: `${ENDPOINT_V1}&dataset=curiexplore-timestamp&q=&rows=-1&sort=submitdate&facet=isoalpha3&refine.iso3=${isoCode}` },
    ];

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => (fetch(Object.values(query)[0]).then(async (response) => ({ [Object.keys(query)[0]]: await response.json() }))));
        const allData = await Promise.all(queriesFetch);
        setData(allData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [isoCode]);

  return { data, isLoading, error };
}
