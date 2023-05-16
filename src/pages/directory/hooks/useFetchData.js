import { useEffect, useState } from 'react';

const {
  REACT_APP_PAYSAGE_API_KEY,
  REACT_APP_PAYSAGE_API_ENDPOINT,
  REACT_APP_CATEGORY_CAMPUSFRANCE,
  REACT_APP_CATEGORY_EMBASSY,
  REACT_APP_CATEGORY_CCI,
} = process.env;

const getEndPoint = (categoryId) => `${REACT_APP_PAYSAGE_API_ENDPOINT}?filters[curieCategories]=${categoryId}`;
const categories = [REACT_APP_CATEGORY_CAMPUSFRANCE, REACT_APP_CATEGORY_EMBASSY, REACT_APP_CATEGORY_CCI];
const categoriesName = ['campusFrance', 'embassy', 'CCI'];

export default function useFetchData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queries = categories.map((id) => getEndPoint(id));

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => (fetch(query).then((response) => (response.json()))));
        const allData = await Promise.all(queriesFetch);
        const saveData = {};
        allData.forEach((categoryData, index) => { saveData[categoriesName[index]] = categoryData; });
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
