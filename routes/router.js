const express = require('express');
const contacts = require('../controller/contacts');
const agents = require('../controller/agents');
const route = express.Router();
const cors = require('cors');

var allowlist = ['http://localhost:8080/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// Contact routes
route.get('/api/contacts', contacts.find);
route.get('/api/contact/:id', contacts.find);
route.post('/api/contact', contacts.create);
route.put('/api/contact/:id', contacts.update);
route.delete('/api/contact/:id', contacts.delete);

// Agent routes
route.get('/api/agents', agents.find);
route.get('/api/agent/:id', agents.find);
route.post('/api/agent', agents.create);
route.put('/api/agent/:id', agents.update);
route.delete('/api/agent/:id', agents.delete);

module.exports = route;