// import {S3} from "@aws-sdk/client-s3";
// const AWS = require('aws-sdk')
// const uuid = require('uuid')
// const { v4: uuidv4 } = require('uuid');
// // 
// // import { fromEnv } from "@aws-sdk/credential-providers";


// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCES_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY
//   })

//   const s3 = new S3.S3Client({
//     region: process.env.AWS_REGION
//   })

// const photoUpload = async (image) => {



//     let imageLocation;

//     const params = {
//         Bucket: 'artbeat-media',
//         Key: `${uuidv4()}`, // Specify the file name in S3
//         Body: image
//       };
    
//      await s3.upload(params, async (err, data) => {
//         if (err) {
//           console.error(err);
//           return err;
//         } else {
//             console.log('File uploaded successfully:', data.Location);
//             imageLocation = data.Location
//         }
    
//         // File uploaded successfully
//         console.log('File uploaded successfully:', data.Location);
//         imageLocation = data.Location

//       })

//       console.log(imageLocation)
    
// }

// export default photoUpload

import AWS from 'aws-sdk/dist/aws-sdk-react-native';

const s3 = new AWS.S3({
    region: 'us-west-1',
    credentials: {
        accessKeyId: 'AKIAQ3EGUVDX32FGXG7H',
        secretAccessKey: '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'
    }
  });