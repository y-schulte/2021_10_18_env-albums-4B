// * express.Router()

// From the Express docs:
// "Use express.Router" to create modular, mountable route handlers
// "A Router instance is a complete middleware and routing solution; for this reason it is often referred to as a 'mini-app'"

// We can create routes to handle all requests to a particular route. For example:

// In an imaginary project...
// In the "routes" folder...
//      * 1. We could have a "users.js" file, to handle all requests to the "/users" route...
//          Including:
//              - GET requests to "/users"
//              - POST requests to "/users"
//              - GET requests to "/users/:id"

//      * 2. We could also have a "posts.js" file, to handle all requests to the "/posts" route...
//          Including:
//              - GET requests to "/posts"
//              - POST requests to "/posts"
//              ... and so on...

// ========================================================

// * Let's try and bring our "/new-album" POST route from index.js to this file, and then export it back

import express from "express";

// * 14/10 morning - import db from index.js
import { db } from "../index.js";

// UUID generates unique ids
// "Universally Unique Identifier"
// The id generated will be represented as a 32-character string, separated by 4 dashes (-)
// If you generate 10 trillion UUIDs (10,000,000,000,000)...
// You would only have a .00000006 (0.00006%) chance of two UUIDs matching
// For more info on UUID versions: https://www.sohamkamani.com/uuid-versions-explained/
import { v4 as uuid_v4 } from "uuid";

const router = express.Router();

// Albums array
// let albums = [];

// Create a /new-album route serving POST requests
// This should receive data in the format { "band": "x", "title": "y", "year": "z" }

router.post("/", async (req, res, next) => {
    // const band = req.body.band;
    // const title = req.body.title;
    // const year = req.body.year;

    const { username, band, title, year } = req.body;

    const newAlbum = {
        id: uuid_v4(),
        band: band,
        title: title,
        year: year
    }

    // albums.push(newAlbum);

    // * 14/10 TASK 1
    // We want to find the user object in the db which matches the logged in user who sent the new album
    // 1. Find the user in the db with the same username as whoever added the new album
    let updatedUser = db.data.users.find(user => {
        // When we find the correct user object in the db
        if (user.username === username) {

            // * 14/10 TASK 2
            // Make sure that only unique (non-duplicate) albums can be added to the user's "albums" array

            // Check if an album with the same details already exists in the user's "albums"...
            const albumExists = user.albums.find(album => {
                // If the user already has the same album in their "albums" array...
                if (album.band.toLowerCase() === band.toLowerCase()
                    && album.title.toLowerCase() === title.toLowerCase() 
                    && album.year === year
                ) {
                    return album;
                } 
            })

            // * Only if the album doesn't already exist should we add it...
            // "If the albumExists variable is undefined..."
            // Then it is ok to add the album!
            if (!albumExists) {
                // Push the new album into its "albums" array
                user.albums.push(newAlbum); 
                console.log(`New album added to the albums array with id ${newAlbum.id}`);
                // Return the user object you just updated, which becomes the value of "updatedUser"
                // You can now send the up to date list of the user's albums back to the frontend to be rendered
                // * But only after the db has written the change you just made, with db.write()!
                return user;
            } else {
                // If the user already has the same album...
                // Just return the user, don't change it!
                return user;
            }
        }
    })

    await db.write();

    res.status(201).json(updatedUser.albums);
})

// This doesn't exist in our project, but is a good example of using a router, to handle more than one *related* endpoint
router.get("/", (req, res, next) => {
    // Some functionality...
})

export default router;