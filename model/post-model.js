import admin from "firebase-admin";
import serviceAccount from "../byu-i-hack-1729303048043-firebase-adminsdk-aid2e-6f88b9989e.json";
import { getKeyByUsername } from "./accounts-model";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://byu-i-hack-1729303048043-default-rtdb.firebaseio.com/",
    });
}

const db = admin.database();

export async function createDbPost(post, username) {
    // Pushing the post to the database
    const postRef = db.ref("posts").push();
    await postRef.set(post);
    // Adding the post to the user's post list
    const userKey = await getKeyByUsername(username);
    const userPostRef = db.ref(`users/${userKey}/posts`);
    await userPostRef.push(postRef.key);
    // Returning the post key
    return postRef.key;
}