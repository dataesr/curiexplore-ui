import express from 'express';

const router = new express.Router();

router.route('/paysage/*')
  .get(async (req, res) => {
    try {
      const url = `${process.env.REACT_APP_PAYSAGE_API_URL}${req.url.replace('/paysage', '')}`;
      const response = await fetch(
        url,
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_PAYSAGE_API_KEY },
        },
      );
      const jsonData = await response.json();
      res.status(200).json(jsonData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });

export default router;
