/* Bradford Smith
 * CS 554 Lab 1 data.js
 * 09/05/2017
 */

var MongoClient = require('mongodb').MongoClient,
    runStartup = require('./dbStartup.js'),
    settings = require('./dbConfig.js'),
    Guid = require('guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

runStartup().then(function(allTodos) {
    console.log("DB setup has completed with the following todos:");
    console.log(allTodos);
});

/**
 * task object:
 *      {
 *          "id": uuid,
 *          "title": string,
 *          "description": string,
 *          "hoursEstimated": number,
 *          "completed": boolean,
 *          "comments": comment[]
 *      }
 *
 * comment object:
 *      {
 *          "id": uuid,
 *          "name": string,
 *          "comment": string
 *      }
 */
MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var todoCollection = db.collection("todos");

        //get all todo items
        exports.getAllTodos = function() {
            return todoCollection.find().toArray();
        };

        //get todo by id
        exports.getTodo = function(id) {
            if (!id) return Promise.reject("You need to provide an ID");

            return todoCollection.find({ _id: id }).limit(1).toArray().then(function(listOfTodos) {
                if (listOfTodos.length === 0) throw "Could not find todo with id of " + id;

                return listOfTodos[0];
            });
        };

        //create todo item
        exports.createTodo = function() {
        };
    });
