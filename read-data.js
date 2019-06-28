const AWS = require("aws-sdk");

require("./awsconfig");

const docClient = new AWS.DynamoDB();
(async () => {
    try {
        {
            const params = {
                TableName: 'ebay',
                Select: 'ALL_ATTRIBUTES',
                ConsistentRead: false,
                Limit: 5,
            };
            const start = process.hrtime.bigint();
            const data = await docClient.scan(params).promise();
            console.log(JSON.stringify(data)); // successful response
            const end = process.hrtime.bigint();
            console.log(`Scan1 took ${(end - start) / 1000000n} ms`)
        }
        {
            const params = {
                TableName: 'ebay',
                AttributesToGet: ["item"],
                Key: {
                    id: {
                        S: "31e8e3a0-63da-4bad-8f15-cb7d34f99eeb"
                    }
                }
            };
            const start = process.hrtime.bigint();
            const data = await docClient.getItem(params).promise();
            console.log(JSON.stringify(data)); // successful response
            const end = process.hrtime.bigint();
            console.log(`Scan2 took ${(end - start) / 1000000n} ms`)
        }
    } catch (e) {
        console.log(e);
    }
})();