// Import dotenv
import dotenv from "dotenv";
dotenv.config();

// const express = require("express");
import express from "express";

//const cors = require("cors");
import cors from "cors";

// Morgan logging middleware
//const morgan = require("morgan");
import morgan from "morgan";

// Import our custom logging middleware
import logger from "./middleware/logger.js";

// Import our new route to handle requests to the "/new-album" endpoint
import newAlbum from "./routes/newAlbum.js";

// Import our new route to handle requests to the "/login" endpoint
import login from "./routes/login.js";

// * 14/10 morning - import lowdb
import { Low, JSONFile } from "lowdb";

// lowdb uses adapters for reading and writing JSON files
// "An adapter is a simple class that just needs to expose two methods: read and write"
const adapter = new JSONFile("./data/db.json");
export const db = new Low(adapter);

// Wait for lowdb to read the contents of the db.json file before continuing
await db.read();

// If there's already some data in db.json, that's cool!
// If db.json has nothing in it, create starting data ---> { users: [], albums: [] }
db.data ||= { users: [] };

// ! Deprecated
//const bodyParser = require("body-parser");

const app = express();

// * NEW: Register our custom middleware
// Using app.use() globally enables our middleware to run for every request
// app.use() is expecting a function that will take in req, res, and next
app.use(logger);

// * NEW: Register morgan as middleware in our server
// Morgan will log some basic details about the request we received
app.use(morgan("tiny"));

// To quickly revise CORS, we need to remind ourselves of the Same Origin Policy...
// "The Same Origin Policy is a web browser security mechanism to prevent websites attacking each other!"
// It stops scripts on one origin from accessing data on another origin
// CORS (Cross-Origin Resource Sharing) was designed as a "controlled relaxation" of SOP
// It is a security measure built into all modern browsers
// It uses a range of headers in a HTTP request that define *trusted* web origins, and what kinds of access are permitted

// The current use of cors allows ALL cors requests to all our routes
app.use(cors());

// ! Deprecated
// app.use(bodyParser.json());

// Instead of body-parser, we can use express's .json() method to parse JSON data
app.use(express.json());

// Register our new route for the "/new-album" endpoint.
app.use("/new-album", newAlbum);

// Register our new route for the "/login" endpoint.
app.use("/login", login);

console.log("The current db.data object:", db.data)

// printenv | grep PORT -> grep is a feature for searching through large pieces of text.
app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started on port", process.env.PORT);
})