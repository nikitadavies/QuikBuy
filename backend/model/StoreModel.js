// models/storeModel.js
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.logger = console;

let docClient;
let s3;

const init = (services) => {
  docClient = services.docClient;
  s3 = services.s3;
};

const TABLE_NAME = 'Stores';

const uploadImageToS3 = async (image) => {
  const imageBuffer = Buffer.from(image, 'base64');
  const imageKey = `store-images/${uuidv4()}.jpg`;

  const params = {
    Bucket: "quikbuy-bucket",
    Key: imageKey,
    Body: imageBuffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};

const createStore = async (store, image) => {
  store.storeId = uuidv4();

  if (image) {
    const imageUrl = await uploadImageToS3(image);
    store.imageUrl = imageUrl;
  }

  const params = {
    TableName: TABLE_NAME,
    Item: store,
  };

  await docClient.put(params).promise();
  return store;
};

const getStores = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const result = await docClient.scan(params).promise();
  return result.Items;
};

module.exports = {
  createStore,
  getStores,
  init
};
