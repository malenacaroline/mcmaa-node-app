const MAX_NUM_CITIZENS = 200;
const FILE = "super-secret-data.txt";
const DECRYPT_URL = process.env.API_PALPATINE_URL;
const DECRYPT_KEY = process.env.API_PALPATINE_KEY;

module.exports = {
  FILE,
  MAX_NUM_CITIZENS,
  DECRYPT_URL,
  DECRYPT_KEY
};
