const getToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const length = 16;
  // eslint-disable-next-line no-plusplus, no-restricted-globals, no-undef
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
};

module.exports = getToken;