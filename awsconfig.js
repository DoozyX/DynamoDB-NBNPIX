const AWS = require("aws-sdk");

const local = false;

if (local) {
    AWS.config.update({
        region: "localhost",
        endpoint: "http://localhost:8000"
    });
} else {
    AWS.config.loadFromPath('./config.json')
}