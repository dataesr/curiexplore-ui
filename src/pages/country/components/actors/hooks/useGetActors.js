import { useEffect, useState } from 'react';

export default function useGetActors(data, category) {
  const [actors, setActors] = useState(data);

  useEffect(() => {
    if (category) {
      const l = data.filter((el) => el.membershipCategories.includes(category));
      setActors(l);
    } else {
      setActors(data);
    }
  }, [data, category]);

  return actors;
}
