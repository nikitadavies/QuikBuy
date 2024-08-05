// models/userModel.js
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

let docClient;

const init = (services) => {
  docClient = services.docClient;
};

const TABLE_NAME = 'RegisteredUsers';

const createUser = async (user) => {
  user.userId = uuidv4();
  const params = {
    TableName: TABLE_NAME,
    Item: user,
  };
  await docClient.put(params).promise();
  return user;
};

const getUserByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };
  const result = await docClient.query(params).promise();
  return result.Items[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  init
};
