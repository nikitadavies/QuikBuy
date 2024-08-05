// models/orderModel.js
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Orders';

const createOrder = async (order) => {
  order.orderId = uuidv4();
  const params = {
    TableName: TABLE_NAME,
    Item: order,
  };
  await docClient.put(params).promise();
  return order;
};

const getOrdersByUserId = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'UserIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };
  const result = await docClient.query(params).promise();
  return result.Items;
};

module.exports = {
  createOrder,
  getOrdersByUserId,
};
