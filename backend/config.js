const axios = require('axios');


const getSecret = async () => {
  try {
    const response = await axios.get('https://wfvot37zu3.execute-api.us-east-1.amazonaws.com/dev/getSecrets');
    return JSON.parse(response.data.body);
  } catch (err) {
    console.error(`Error retrieving secret: ${err.message}`);
    throw err;
  }
};

module.exports = {
  getSecret
};
