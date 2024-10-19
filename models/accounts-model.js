const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

export async function getUserByEmail(email) { }

export async function getUserByKey(uid) { }

export async function getUsernameByKey(uid) { }

export async function getKeyByUsername(username) { }

export async function getNameByUsername(username) { }

export async function getUserRefByUsername(username) { }

export async function getUserKeyByEmail(email) { }

export async function createUser(email, username, name, password) { }

export async function addUserPost(username, postKey) { }

export async function removeUserPost(username, postKey) { }
