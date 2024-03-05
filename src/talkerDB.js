const fs = require('fs').promises;
const path = require('path');
const getToken = require('./utils');

let token = '';

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
  if (email && password) {
    token = getToken();
  }
  return token;
};

const addTalker = async (requestBody) => {
  const data = await fs.readFile(path.resolve('./src/talker.json'), 'utf8');
  const talkers = JSON.parse(data);
  const newTalker = {
    id: talkers.length + 1,
    ...requestBody,
  };
  talkers.push(newTalker);
  await fs.writeFile(path.resolve('./src/talker.json'), JSON.stringify(talkers));
  return newTalker;
};

module.exports = {
  getAll,
  getById,
  getPostWithToken,
  token,
  addTalker,
};
