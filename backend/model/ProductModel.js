// models/productModel.js
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

let docClient;
let s3;

const init = (services) => {
  docClient = services.docClient;
  s3 = services.s3;
};

const TABLE_NAME = 'Products';

const createProduct = async (product) => {
  product.productId = uuidv4();
  const params = {
    TableName: TABLE_NAME,
    Item: product,
  };
  await docClient.put(params).promise();
  return product;
};

const getProductsByStoreId = async (storeId) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'StoreIndex',
    KeyConditionExpression: 'storeId = :storeId',
    ExpressionAttributeValues: {
      ':storeId': storeId,
    },
  };
  const result = await docClient.query(params).promise();
  return result.Items;
};

module.exports = {
  createProduct,
  getProductsByStoreId,
  init
};
