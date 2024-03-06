const express = require('express');

const talkerDB = require('./talkerDB');

const router = express.Router();

const DATA_REGEX = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk && typeof talk !== 'object') {
    return res.status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.watchedAt) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!DATA_REGEX.test(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.rate && talk.rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

const validateTalkwithRate = (req, res, next) => {
  const { talk } = req.body;
  if (!Number.isInteger(talk.rate) || talk.rate === 0) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const validateToken = (req, res, next) => {
  const autToken = req.headers.authorization;
  if (!autToken) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (autToken.length !== 16 || typeof autToken !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

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

router.post('/', validateName, validateToken, validateAge, validateTalk,
  validateWatchedAt, validateTalkRate, validateTalkwithRate, async (req, res) => {
    try {
      const result = await talkerDB.addTalker(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error('Erro na solicitação:', error);
      res.status(500).json({ message: 'Erro na solicitação' });
    }
  });

router.put('/:id', validateName, validateToken, validateAge, validateTalk,
  validateWatchedAt, validateTalkRate, validateTalkwithRate, async (req, res) => {
    const { id } = req.params;
    const person = req.body;
    try {
      const result = await talkerDB.putTalker(person, id);
      if (result === null) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      return res.status(200).json(result[5]);
    } catch (error) {
      console.error('Erro na solicitação:', error);
      res.status(500).json({ message: 'Erro na solicitação' });
    }
  });

module.exports = router;
