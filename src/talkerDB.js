const fs = require('fs').promises;
const path = require('path');
const getToken = require('./utils');

let token = '';

const PATH = './src/talker.json';

const getAll = async () => {
  const data = await fs.readFile(path.resolve(PATH), 'utf8');
  const talkers = JSON.parse(data);
  return talkers;
};

const getById = async (id) => {
  const data = await fs.readFile(path.resolve(PATH), 'utf8');
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
  const data = await fs.readFile(path.resolve(PATH), 'utf8');
  const talkers = JSON.parse(data);
  const newTalker = {
    id: talkers.length + 1,
    ...requestBody,
  };
  talkers.push(newTalker);
  await fs.writeFile(path.resolve(PATH), JSON.stringify(talkers));
  return newTalker;
};

const putTalker = async (person, id) => {
  const data = await fs.readFile(path.resolve(PATH), 'utf8');
  const talkers = JSON.parse(data);
  const update = talkers.findIndex((talker) => talker.id === Number(id));
  if (update === -1) {
    return null;
  }
  talkers[update] = { ...talkers[update], ...person, id: Number(id) };
  await fs.writeFile(path.resolve(PATH), JSON.stringify(talkers));
  return talkers;
};

const deleteTalker = async (id) => {
  const data = await fs.readFile(path.resolve(PATH), 'utf8');
  const talkers = JSON.parse(data);
  const delTalker = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(path.resolve(PATH), JSON.stringify(delTalker));
  return delTalker;
};

const getSearchTerm = async (searchTerm) => {
  const data = await fs.readFile(path.resolve(PATH), 'utf8');
  const talkers = JSON.parse(data);
  const search = talkers.filter((talker) => talker.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));
  return search;
};

module.exports = {
  getAll,
  getById,
  getPostWithToken,
  token,
  addTalker,
  putTalker,
  deleteTalker,
  getSearchTerm,
};
