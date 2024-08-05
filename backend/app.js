// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const { getSecret } = require('./config');
const AWS = require('aws-sdk');
const storeModel = require('./model/StoreModel');
const userModel = require('./model/USerModel');
const authService = require("./service/AuthService");

const app = express();
 // Enable CORS
 app.use(cors());

const initializeApp = async () => {
  try {
    const secrets = await getSecret('quikbuy-secrets'); 
 
    const { accessKeyId, secretAccessKey, sessionToken,  clientId, bucketName, region } = secrets;
  
      // Configure AWS SDK with retrieved secrets
      AWS.config.update({
        region,
        accessKeyId,
        secretAccessKey,
        sessionToken,
      });

      const s3 = new AWS.S3();
      const docClient = new AWS.DynamoDB.DocumentClient();
      const cognito = new AWS.CognitoIdentityServiceProvider();
    
// Pass AWS services to models
storeModel.init({ s3, docClient });
userModel.init({  docClient });
authService.init({cognito, clientId});


    // Your application setup (middlewares, routes, etc.)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));    

    // Define routes
    app.use('/api/auth', authRoutes);
    app.use('/api/seller', sellerRoutes);
    app.use('/api/buyer', buyerRoutes);

    // Start the server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Error during app initialization:', err);
    process.exit(1); // Exit the process with an error code
  }
};

// Call the initialization function
initializeApp();