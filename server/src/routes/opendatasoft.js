import express from 'express';

const router = new express.Router();

router.route('/opendatasoft')
  .get(async (req, res) => {
    try {
      const query = req?.query;
      let paramsCode = '';
      const codes = query['refine.code'];
      if (typeof codes === 'object') {
        delete query['refine.code'];

        let i = 0;
        while (i < codes.length) {
          paramsCode += `&refine.code=${codes[i]}`;
          i += 1;
        }
      } else {
        paramsCode = '';
      }

      let paramsCountry = '';
      const countries = query['refine.country_code'];
      if (typeof countries === 'object') {
        delete query['refine.country_code'];

        let i = 0;
        while (i < codes.length) {
          paramsCountry += `&refine.code=${countries[i]}`;
          i += 1;
        }
      } else {
        paramsCountry = '';
      }

      if (query) {
        const response = await fetch(
          // eslint-disable-next-line max-len
          `${process.env.REACT_APP_ODS_API_URL}/?apikey=${process.env.REACT_APP_ODS_API_KEY}&${new URLSearchParams(query).toString()}${paramsCountry}${paramsCode}`,
        );
        const jsonData = await response.json();
        res.status(200).json(jsonData);
      } else {
        res.status(200).json({});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });

export default router;
