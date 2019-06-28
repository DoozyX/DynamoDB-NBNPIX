const AWS = require("aws-sdk");

require("./awsconfig");

const docClient = new AWS.DynamoDB();
let params = {
    TableName: 'ebay',
    Select: 'ALL_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | 
    //           SPECIFIC_ATTRIBUTES | COUNT)
    ConsistentRead: false, // optional (true | false)
};
let start = process.hrtime.bigint();
docClient.scan(params, function (err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(JSON.stringify(data)); // successful response
    const end = process.hrtime.bigint();
    console.log(`Scan1 took ${(end-start) / 1000000n} ms`)
});

params = {
    TableName: 'ebay',
    Select: 'ALL_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | 
    //           SPECIFIC_ATTRIBUTES | COUNT)
    ConsistentRead: false, // optional (true | false)
};
start = process.hrtime.bigint();
docClient.scan(params, function (err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(JSON.stringify(data)); // successful response
    const end = process.hrtime.bigint();
    console.log(`Scan1 took ${(end-start) / 1000000n} ms`)
});