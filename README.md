# DynamoDB-NBNPIX

DynamoDb installation:

1. install docker
2. ➜ docker run -p 8000:8000 --name dynamodb -d amazon/dynamodb-local

Scripts:
"yarn" to instal deps;
"yarn create-tables" : creates all the tables on the local dynamodb 
"yarn load:ebay" : loads ebay data from xml to db
"yarn read:ebay" : prints data from ebay table
