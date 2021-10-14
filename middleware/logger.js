// * NEW: Custom logging middleware
// If we make a POST request, we will see two logs - one for a "OPTIONS" request, and one afterwards for a "POST" request
// * Why?
// An OPTIONS request is automatically sent by the browser before the POST request
// It is asking the server "Can you accept cross-origin POST requests which include JSON data?"
// The POST request will then only be sent if the server allows it
// This is called a CORS preflight
// More details: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests
const logger = (req, res, next) => {
    console.log(`A new ${req.method} request was received on the ${req.url} endpoint!`);

    // If you are not sending a response, make sure to call next()!
    next();
}

export default logger;

// Make a default export using require...
// (If we are using "require" to import modules...)
// module.exports = logger;