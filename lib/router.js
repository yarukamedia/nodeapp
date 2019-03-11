/**
 * this is the application router
 */

 // Depenancies 
 const crud = require('./crud');
 const handlers = require('./handlers');

  // application router
  const router = {
    'users': handlers.users,
    'home': handlers.home

 };

 module.exports = router;
