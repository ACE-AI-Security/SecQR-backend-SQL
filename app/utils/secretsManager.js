const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
require('dotenv').config();

const client = new SecretsManagerClient({
    region: process.env.AWS_REGION
});

async function getSecretValue(secretName) {
    try {
        const command = new GetSecretValueCommand({ SecretId: secretName });
        const data = await client.send(command);
        if ('SecretString' in data) {
            return JSON.parse(data.SecretString);
        }
    } catch (err) {
        throw new Error(`Failed to retrieve secret: ${err.message}`);
    }
}

module.exports = { getSecretValue };
