const express = require('express');
const fs = require('fs').promises;

const talkerDB = require('./talkerDB');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await talkerDB.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro na solicitação:', error);
    res.status(500).json({ message: 'Erro na solicitação' });
  }
});

module.exports = router;
