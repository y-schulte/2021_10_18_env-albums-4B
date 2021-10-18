import express from "express";

// * 14/10 morning - import db from index.js
import { db } from "../index.js";

const router = express.Router();

// ! Replaced by lowdb Create currentUser object
// const currentUser = {
//     username: "",
//     password: ""
// }

// Handle POST request to /login endpoint
router.post("/", async (req, res, next) => {
    const {username, password} = req.body;
    
    // * 14/10 morning - 1. Question: does the user trying to log in already exist in the database?
    let currentUser = db.data.users.find(user => user.username === username && user.password === password);

    // If the user is already in the database, go straight on to the response
    if (currentUser) {
        console.log("User found!");
    // Else if the user is not already in the database:
    //  1. Write them to the database (in the "users" array)
    //  2. Wait for the db.json file to be updated by lowdb
    //  3. Then go on to send the response
    } else {
        console.log("New user!");
        currentUser = { username: username, password: password, albums: [] };
        db.data.users.push(currentUser);
        await db.write();
    }

    res.json( { username: username, albums: currentUser.albums } );
})

// Export the router to be registered in index.js
export default router;