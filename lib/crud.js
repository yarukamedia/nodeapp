/**
 * This file contains all application route handlers
 */

 // Dependancies 
 const fs = require('fs');
 const path = require('path');

 // base dir path
 const baseDir = path.join(__dirname, `../.data`);

 const crud = (function async (){
    return {
        create : function(dir, filename, data, callback){
            // open file for writing data
            fs.open(`${baseDir}/${dir}/${filename}.json`, 'wx', async function(err, fileDescriptor){
               // convert payload data to json
               let stringData = JSON.stringify(data);
               if(err) return console.log(err.message);
               fs.writeFile(fileDescriptor, stringData, (err)=>{
                   if(err) return console.log(err.message);
                   fs.close(fileDescriptor, (err)=>{
                    if(err) return console.log(err.message);
                    console.log(`File with the name: ${filename}.json has been successfully created.`)
                   });
               });  
            });
        },
        read : function(dir, filename, callback){
            // open file for reading
            fs.open(`${baseDir}/${dir}/${filename}.json`, 'r', (err, fileDescriptor)=>{
                if(err) return console.log(err.message);
                fs.readFile(fileDescriptor, 'utf-8', (err, info)=>{
                    if(err) return console.log(err.message);
                    // console.log(info);
                    fs.close(fileDescriptor, (err)=>{
                        if(err) return console.log(err.message);
                        console.log(`Successfully read data from ${filename}: ${info}`)
                    });
                });
            });
        },
        update : function(dir, filename, data, callback){
            // open file for updating
            fs.open(`${baseDir}/${dir}/${filename}.json`, 'a+', (err, fileDescriptor)=>{
                if(err) return console.log(err.message);
                let stringData = JSON.stringify(data)
                fs.appendFile(fileDescriptor, stringData, (err, info)=>{
                    if(err) return console.log(err.message);
                    fs.close(fileDescriptor, (err)=>{
                        if(err) return console.log(err.message);
                        console.log(`Successfully updated file ${filename}.json`);
                    });
                });
            });
        },
        delete : function(dir, filename, callback){
            fs.open(`${baseDir}/${dir}/${filename}.json`, (err, fileDescriptor)=>{
                if(err) return console.log(err.message);
                fs.unlink(fileDescriptor, (err)=>{
                    if(err) return console.log(err.message);
                    console.log(`${filename}.json was deleted`);
                });
            });
        }
    };
 })();

 module.exports = crud;