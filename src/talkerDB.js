const fs = require('fs').promises;
const path = require('path');
const getToken = require('./utils');

const getAll = async () => {
  const data = await fs.readFile(path.resolve('./src/talker.json'), 'utf8');
  const talkers = JSON.parse(data);
  return talkers;
};

const getById = async (id) => {
  const data = await fs.readFile(path.resolve('./src/talker.json'), 'utf8');
  const talkers = JSON.parse(data);
  return talkers.find((talker) => talker.id === id);
};

const getPostWithToken = async (email, password) => {
  let token = '';
  if (email && password) {
    token = getToken();
  }
  return token;
};

module.exports = {
  getAll,
  getById,
  getPostWithToken,
};
