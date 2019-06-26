const AWS = require("aws-sdk");
const fs = require('fs')
const { promisify } = require('util')
const xml2js = require('xml2js');
const uuidv4 = require('uuid/v4');

const { formatObject } = require("./util");

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const readFileAsync = promisify(fs.readFile)

console.log("Importing ebay into DynamoDB. Please wait.");
var parser = new xml2js.Parser();

(async () => {
    const readData = async (path, tableName) => {
        const data = await readFileAsync(__dirname + path); {
            parser.parseString(data, async (err, result) => {
                console.log("Loading data for", tableName)
                const listings = result.root.listing.map((listing) => {
                    return formatObject(listing);
                })
                const start = process.hrtime.bigint();
                for (listing of listings) {
                    var params = {
                        TableName: tableName,
                        Item: {
                            "id": uuidv4(),
                            "item": listing
                        }
                    };
                    try {
                        await docClient.put(params).promise();
                        console.log("PutItem succeeded.");                        
                    } catch {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    }
                }
                const end = process.hrtime.bigint();
                console.log(`Data loaded - ${tableName} in ${(end-start) / 1000000n} ms`);
            });
        };
    };

    readData('/datasets/Auctions/321gone.xml', 't321gone');
    readData('/datasets/Auctions/ebay.xml', 'ebay');
    readData('/datasets/Auctions/ubid.xml', 'ubid');
    readData('/datasets/Auctions/yahoo.xml', 'yahoo');
})();
