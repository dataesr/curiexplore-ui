import { useEffect, useState } from 'react';

const { REACT_APP_PAYSAGE_API_KEY } = process.env;
const getEndPoint = (categoryId) => `https://api.paysage.staging.dataesr.ovh/relations?filters[relationTag]=structure-categorie&filters[relatedObjectId]=${categoryId}&limit=10000`;
const campusFrance = 'yP0pO';
const embassy = 'ydmvQ';
const CCI = 'OuHFD';
const categories = [campusFrance, embassy, CCI];
const categoriesName = ['campusFrance', 'embassy', 'CCI'];

export default function useFetchData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queries = categories.map((id) => getEndPoint(id));
    const options = {
      headers: { 'X-API-KEY': REACT_APP_PAYSAGE_API_KEY },
    };

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => (fetch(query, options).then((response) => (response.json()))));
        const allData = await Promise.all(queriesFetch);
        const saveData = {};
        allData.forEach((category, index) => { saveData[categoriesName[index]] = category.data.map((el) => el.resource); });
        setData(saveData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, []);

  return { data, isLoading, error };
}
