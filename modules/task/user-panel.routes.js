const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Access = require(path.resolve('./middleware/access')),
    TaskController = require('./controllers/taskController');

module.exports = (app) => {

    router.get('/user', Access.verifyUser, TaskController.getUser);
    router.post('/create-task', Access.verifyUser, TaskController.createTask);
    router.get('/list-tasks', Access.verifyUser, TaskController.getTaskList);

    app.use('/api', router);
}
