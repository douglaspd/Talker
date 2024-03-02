const express = require('express');

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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await talkerDB.getById(Number(id));
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
