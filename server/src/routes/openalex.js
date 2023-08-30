import express from 'express';
import fetch from 'node-fetch';

const router = new express.Router();

router.route('/openalex')
  .get(async (req, res) => {
    let urlParams = req?.query ?? {};
    if (process.env.REACT_APP_OPENALEX_API_KEY) {
      urlParams = { api_key: process.env.REACT_APP_OPENALEX_API_KEY, ...urlParams };
    } else {
      urlParams = { mailto: 'unknown@github.com', ...urlParams };
    }
    const url = `${process.env.REACT_APP_OPENALEX_API_URL}?${new URLSearchParams(urlParams)}`;
    try {
      let response = await fetch(url, { method: 'GET' });
      response = await response.json();
      res.status(200).json(response);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });

export default router;
