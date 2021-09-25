const express = require('express'),
  router = express.Router(),
  RegisterController = require('./controllers/registerController');


module.exports = (app) => {
  
  router.post('/register', RegisterController.register);
  router.post('/login', RegisterController.login);

  app.use('/api', router);
}
