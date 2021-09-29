const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2"
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";

router.get('/', (req, res) => {
    const params = {
        TableName: table
    }

    dynamodb.scan(params, (err, data) => {
        if(err) {
            res.status(500).json(err);
        }
        else {
            res.json(data.Items)
        }
    })
})

router.get('/:username', (req, res) => {
    const params = {
        TableName: table,
        KeyConditionExpression: "#un = :user",
        ExpressionAttributeNames: {
          "#un": "username",
          "#ca": "createdAt",
          "#th": "thought"
        },
        ExpressionAttributeValues: {
          ":user": req.params.username
        },
        ProjectionExpression: "#th, #ca, #un",
        ScanIndexForward: false
      };
      dynamodb.query(params, (err, data) => {
        if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          res.status(500).json(err); // an error occurred
        } else {
          console.log("Query succeeded.");
          res.json(data.Items)
        }
      });
})

router.post('/', (req, res) => {
    const params = {
      TableName: table,
      Item: {
        "username": req.body.username,
        "createdAt": Date.now(),
        "thought": req.body.thought
      }
    };
    dynamodb.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          res.status(500).json(err); // an error occurred
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          res.json({"Added": JSON.stringify(data, null, 2)});
        }
      });
  });

module.exports = router;