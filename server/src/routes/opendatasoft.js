import express from 'express';

const router = new express.Router();

router.route('/opendatasoft')
  .get(async (req, res) => {
    try {
      const query = req?.query;
      if (query) {
        let url = `${process.env.REACT_APP_ODS_API_URL}/?apikey=${process.env.REACT_APP_ODS_API_KEY}`;
        let codes = query?.['refine.code'];
        delete query['refine.code'];
        let countries = query?.['refine.country_code'];
        delete query['refine.country_code'];
        url += `&${new URLSearchParams(query).toString()}`;
        if (codes) {
          codes = Array.isArray(codes) ? codes : [codes];
          codes.forEach((code) => {
            url += `&refine.code=${code}`;
          });
        }
        if (countries) {
          countries = Array.isArray(countries) ? countries : [countries];
          countries.forEach((country) => {
            url += `&refine.country_code=${country}`;
          });
        }
        const response = await fetch(url);
        const jsonData = await response.json();
        res.status(200).json(jsonData);
      } else {
        res.status(200).json({});
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });

export default router;
