const fs = require('fs').promises;
const path = require('path');

const getAll = async () => {
  const data = await fs.readFile(path.resolve('./src/talker.json'), 'utf8');
  const talkers = JSON.parse(data);
  return talkers;
};
   
module.exports = {
  getAll,
};
