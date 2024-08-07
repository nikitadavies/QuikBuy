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

const uploadImageToS3 = async (image, store) => {
  const imageBuffer = Buffer.from(image, 'base64');
  const imageKey = `product-images/${store}/${uuidv4()}.jpg`;

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

const createProduct = async (product) => {
  product.productId = uuidv4();
  if (product.image) {
    const imageUrl = await uploadImageToS3(product.image, product.storeId);
    product.imageUrl = imageUrl;
    delete product.image;
  }

  const params = {
    TableName: TABLE_NAME,
      Item: {
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        stock: product.stock,
        productDescription: product.description,
        storeId: product.storeId,
        imageUrl: product.imageUrl
      }
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

const BUCKET_NAME = 'quikbuy-bucket';

const getProductById = async (productId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      productId: productId,
    },
  };
  try {
    const result = await docClient.get(params).promise();
    const product = result.Item;

    // Generate pre-signed URL for the product image
    if (product && product.imageUrl) {
      const imageKey = product.imageUrl.split('/').pop();
      console.log(imageKey);
      const urlParams = {
        Bucket: BUCKET_NAME,
        Key: `product-images/${product.storeId}/${imageKey}`,
        Expires: 60 * 60 // URL expiration time in seconds
      };
      const imageUrl = s3.getSignedUrl('getObject', urlParams);
      product.imageUrl = imageUrl;
    }

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Could not fetch product by ID");
  }
};


module.exports = {
  createProduct,
  getProductsByStoreId,
  getProductById,
  init
};
