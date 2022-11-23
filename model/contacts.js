const mongoose = require('mongoose');

const crmContactSchema = new mongoose.Schema({
  publishedDate: String,
  leadAssigned: String,
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  inquiredProperty: String,
  timeline: String,
  budget: String,
  leadSource: String,
  notes: String,
});

const crmContactDB = mongoose.model('crmContactDB', crmContactSchema);

module.exports = crmContactDB;