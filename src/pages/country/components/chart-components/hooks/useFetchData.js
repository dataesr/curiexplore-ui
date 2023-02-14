import { useEffect, useState } from 'react';
import countriesList from '../../../../../assets/data/countriesList.json';

// TODO: Mettre dans utils
const getLabel = (isoCode) => countriesList.find((el) => el.ISO_alpha3 === isoCode).Pays;

export default function useFetchData(data) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const { REACT_APP_ODS_API_ENDPOINT, REACT_APP_ODS_API_KEY } = process.env;
    const ENDPOINT_V1 = `${REACT_APP_ODS_API_ENDPOINT}/?apikey=${REACT_APP_ODS_API_KEY}`;
    const baseUrl = '&dataset=curiexplore-donnees-quantitatives&rows=-1&disjunctive.code=true&disjunctive.country_code=true';
    let query = `${ENDPOINT_V1}${baseUrl}&refine.code=${data.code}&sort=${data.sort}&refine.country_code=FRA`;

    // ajout des isoCode demandés par l'utilisateur
    for (let index = 0; index < data.isoCodes.length; index += 1) {
      query += `&refine.country_code=${data.isoCodes[index]}`;
    }

    // ajout des codes graphs du fichier de parametrage
    // for (let index = 0; index < data.code.length; index += 1) {
    //   query += `&refine.code=${data.code[index]}`;
    // }

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(query);
        const json = await response.json();
        const s = [];
        const years = new Set();

        for (let index = 0; index < data.isoCodes.length; index += 1) {
          // Liste exhausive des années
          json?.records?.forEach((el) => years.add(el.fields.year));
          setCategories(Array.from(years));

          const countrySerie = json?.records?.filter((el) => el.fields.country_code === data.isoCodes[index])
            .reduce(
              (accumulator, currentValue) => [...accumulator, currentValue?.fields?.value],
              [],
            );
          const obj = {
            name: getLabel(data.isoCodes[index]),
            data: countrySerie,
          };
          if (data.isoCodes[index] === 'FRA') obj.color = '#000091';
          if (index === (data.isoCodes.length - 1)) obj.color = '#FFCA00';
          s.push(obj);
        }
        setSeries(s);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: data.type,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 0,
    },
    series,
    title: {
      text: data.title,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: {
        text: null,
      },
    },
  };

  return { options, isLoading, error };
}
