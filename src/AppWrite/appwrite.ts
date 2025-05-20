import { Client, Storage } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('682bbed0003783876a49');

const storage = new Storage(client);

export { storage };
export default client;
