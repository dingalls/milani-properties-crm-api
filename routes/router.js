const express = require('express');
const contacts = require('../controller/contacts');
const agents = require('../controller/agents');
const route = express.Router();

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