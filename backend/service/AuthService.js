// services/authService.js
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../model/USerModel');
const config = require('../config');

let cognito;
let clientId;

const init = ({ cognito: cognitoInstance, clientId: clientIdValue }) => {
  cognito = cognitoInstance;
  clientId = clientIdValue;
};

const register = async (user) => {
  const params = {
    ClientId: clientId,
    Username: user.email,
    Password: user.password,
    UserAttributes: [
      {
        Name: 'email',
        Value: user.email,
      },
    ],
  };

  await cognito.signUp(params).promise();

  user.password = undefined; // Remove password before storing in DynamoDB
  return await createUser(user);
};

const confirmUser = async (email, confirmationCode) => {
  const params = {
    ClientId: clientId,
    Username: email,
    ConfirmationCode: confirmationCode,
  };

  await cognito.confirmSignUp(params).promise();
};


const login = async (email, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const response = await cognito.initiateAuth(params).promise();

  const token = response.AuthenticationResult.IdToken;

  return { token };
};

module.exports = {
  register,
  login,
  confirmUser,
  init
};
