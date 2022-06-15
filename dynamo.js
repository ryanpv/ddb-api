const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient(); //DocumentClient() to covert responses to native JS types instead of DDB "AttributeValue" (ie. string vs "S")
const TABLE_NAME = "ddb-api";


const getCharacters = async () => {
    const params = { // params of what we are searching
        TableName: TABLE_NAME
    };
    const characters = await dynamoClient.scan(params).promise(); // uses defined params with scan method, which returns all items
    // for aws-sdk, the query will start the request. however, must chain .promise() to return the promise 
    return characters; // return results, which is stored in this variable
}

const getCharacterbyId = async (id) => { // pass in id parameter because it is the argument we need to pass in for the specific piece of data we need 
    // (parameter defines what the argument value should be - and we also define the parameter in this function) 
    // the value to be returned after the db query is stored in the getCharacterbyId(). 
    // when this function is called by app.js, the argument passed in will be a req.params.id (number).
    // this query function will knonw to use that argument to query the db
    // essentially, it is awaiting for the call and we're passing "id" because we know that is what we are looking for specifically
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id // this params will specify the "location"/search parameters for the query method below
        }
    }
    return await dynamoClient.get(params).promise(); // pass in the params we defined above into the get method to let it know what we want to query
    // and we return the promise by using .promise() to specify that this function is a promise - aws-sdk syntax
}

const addOrUpdateCharacter = async (character) => { // 
    const params = {
        TableName: TABLE_NAME,
        Item: character
    }
    return await dynamoClient.put(params).promise();
}

const deleteCharacter = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};
console.log("testing...");
module.exports = {
    dynamoClient,
    getCharacters,
    getCharacterbyId,
    addOrUpdateCharacter,
    deleteCharacter
}