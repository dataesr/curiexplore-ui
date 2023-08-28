import express from 'express';

const router = new express.Router();

router.route('/opendatasoft')
  .get(async (req, res) => {
    try {
      const query = req?.query;
      if (query) {
        const response = await fetch(
          `${process.env.REACT_APP_ODS_API_URL}/?apikey=${process.env.REACT_APP_ODS_API_KEY}&${new URLSearchParams(query).toString()}`,
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
