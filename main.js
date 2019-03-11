/***
 * Main entry file to the application
 */

 // Dependancies
 const http = require('http');
 const url = require('url');
 const StringDecoder = require('string_decoder').StringDecoder;
 const crud = require('./lib/crud');
 const router = require('./lib/router');
 const handlers = require('./lib/handlers');

 // create application HTTP server
 const app = http.createServer((req, res)=>{

    // get application meta data
    const headers = req.headers;
    const path = url.parse(req.url, true);
    const requestedPath = path.pathname;
    const trimmedPath = requestedPath.replace(/^\/+|\/+$/g, '');
    const method = req.method;

    // get the payload and decode it to a string
    const decoder = new StringDecoder;
    let payload = '';
    req.on('data', function(){
        payload += decoder.write(data);
    });
    req.on('end', function(){
        payload += decoder.end();
    });

    let data = payload;

    // figure out which route to use
    let chosenRoute = '';

    chosenRoute = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    chosenRoute(data, function(statusCode, payload){
        statusCode = typeof(statusCode) == 'number' ? statusCode : 500;
        payload = typeof(payload) == 'object' ? payload : 'Error'

        const payloadString = JSON.stringify(payload);
        res.end(payloadString)
    });
 });

 // listen on server
 app.listen(3000, ()=>{
     console.log('Aplication running on port: 3000...');
 });

 handlers.notFound = function(data, callback){
    callback(404);
 }

//  crud.delete('users', 'testfile1', function(err){
//     console.log(err)
//  });

module.exports = app;