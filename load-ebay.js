const AWS = require("aws-sdk");
const fs = require('fs')
const { promisify } = require('util')
const xml2js = require('xml2js');
const uuidv4 = require('uuid/v4');

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const readFileAsync = promisify(fs.readFile)

console.log("Importing ebay into DynamoDB. Please wait.");
var parser = new xml2js.Parser();

const isObject = val =>
    typeof val === 'object' && !Array.isArray(val);

const format = (value) => {
    if (typeof value == "string") {
        let trimmed = value.trim();
        if (trimmed === "") {
            return "EMPTY"
        }
        return trimmed;
    }
    return value;
}

const formatObject = (obj = {}) => {
    if (isObject(obj)) {
        Object.entries(obj)
            .forEach(
                ([key, value]) => {
                    console.log("key", key, "--value", value)
                    if (isObject(value)) {
                        obj[key] = formatObject(value)
                    } else if (Array.isArray(value)) {
                        obj[key] = value.map(el => formatObject(el));
                    } else {
                        obj[key] = format(value)
                    }
                    console.log(obj[key]);
                }
            );
    } else {
        obj = format(obj);
    }
    return obj;
}

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
