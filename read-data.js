const AWS = require("aws-sdk");

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB();
var params = {
    TableName: 'ebay',
    Select: 'ALL_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | 
    //           SPECIFIC_ATTRIBUTES | COUNT)
    ConsistentRead: false, // optional (true | false)
};
docClient.scan(params, function (err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(JSON.stringify(data)); // successful response
});