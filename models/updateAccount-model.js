const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

export async function changeUsername(oldUsername, newUsername) { }

export async function changeEmail(username, newEmail) { }

export async function changeName(username, newName) { }

export async function changePassword(username, oldPassword, newPassword) { }
