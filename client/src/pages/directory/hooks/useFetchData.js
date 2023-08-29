import { useEffect, useState } from 'react';

const {
  REACT_APP_CATEGORY_CAMPUSFRANCE,
  REACT_APP_CATEGORY_CCI,
  REACT_APP_CATEGORY_EMBASSY,
} = process.env;

const getEndPoint = (categoryId) => `${process.env.REACT_APP_CURIEXPLORE_API}/paysage/curiexplore/actors?filters[curieCategories]=${categoryId}`;
const categories = [REACT_APP_CATEGORY_CAMPUSFRANCE, REACT_APP_CATEGORY_EMBASSY, REACT_APP_CATEGORY_CCI];
const categoriesName = ['campusFrance', 'embassy', 'CCI'];

export default function useFetchData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queries = categories.map((id) => getEndPoint(id));

    const getData = async () => {
      try {
        setIsLoading(true);
        const queriesFetch = queries.map((query) => fetch(query).then((response) => response.json()));
        const allData = await Promise.all(queriesFetch);
        const saveData = {};
        allData.forEach((categoryData, index) => { saveData[categoriesName[index]] = categoryData; });
        setData(saveData);
        setIsLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setError(err);
      }
    };
    getData();
  }, []);

  return { data, error, isLoading };
}
