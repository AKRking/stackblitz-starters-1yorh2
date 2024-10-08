// File: lib/appwrite.js
import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6704f9f900355d2422ac');

export const databases = new Databases(client);
export const DATABASE_ID = '6704fc1b001946ed0fab';
export const COLLECTION_ID = '67059f0d000a9e93adfd';