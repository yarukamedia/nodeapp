/**
 * This file contains all applicaion route handlers
 */

 // Dependancies


 const handlers = module.exports = {};

 handlers.home = function (data, callback){
     callback(200, {'Message': 'Home'});
 }