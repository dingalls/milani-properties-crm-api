const mongoose = require('mongoose');

const crmAgentSchema = new mongoose.Schema({
  publishedDate: String,
  name: String,
});

const crmAgentDB = mongoose.model('crmAgentDB', crmAgentSchema);

module.exports = crmAgentDB;