const AWS = require("aws-sdk");
const fs = require('fs')
const { promisify } = require('util')
const xml2js = require('xml2js');
const uuidv4 = require('uuid/v4');

const {formatObject} = require("./util");

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const readFileAsync = promisify(fs.readFile)

console.log("Importing ebay into DynamoDB. Please wait.");
var parser = new xml2js.Parser();

(async () => {
    const data = await readFileAsync(__dirname + '/datasets/Auctions/ebay.xml'); {
        parser.parseString(data, function (err, result) {
            result.root.listing.forEach(listing => {
                formatObject(listing)

                var params = {
                    TableName: "ebay",
                    Item: {
                        "id": uuidv4(),
                        "item": listing
                    }
                };
                docClient.put(params, (err, data) => {
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("PutItem succeeded:");
                    }
                });
            })
        });
    };
})();
