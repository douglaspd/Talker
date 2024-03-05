/* eslint-disable no-else-return */
const express = require('express');

const talkerDB = require('./talkerDB');

const router = express.Router();

const FORMAT_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } 
  if (!FORMAT_EMAIL.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

router.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await talkerDB.getPostWithToken(email, password);
    
    res.status(200).json({ token: result });
  } catch (error) {
    console.error('Erro na solicitação:', error);
    res.status(500).json({ message: 'Erro na solicitação' });
  }
});

module.exports = router;
