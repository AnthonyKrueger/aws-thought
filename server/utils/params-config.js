const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
    const imageParams = {
      Bucket: 'user-images-36c20fec-19db-47d7-bcc1-344d42276d58',
      Key: `${uuidv4()}.${fileType}`,
      Body: fileName.buffer,
      ACL: 'public-read'
    };
    return imageParams;
  };

  module.exports = params;