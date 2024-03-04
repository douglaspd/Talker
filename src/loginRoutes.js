const express = require('express');

const talkerDB = require('./talkerDB');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await talkerDB.getPostWithToken(email, password);
    if (email && password) {
      res.status(200).json({ token: result });
    }
  } catch (error) {
    console.error('Erro na solicitação:', error);
    res.status(500).json({ message: 'Erro na solicitação' });
  }
});

module.exports = router;