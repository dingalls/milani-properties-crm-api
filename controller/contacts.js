const crmContactDB = require('../model/contacts');

exports.create = (req, res) => {
  if(!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
    return;
  }

  const currentDate = new Date(Date.now()).toISOString();
  // new user
  const newContact = new crmContactDB({
    publishedDate: currentDate,
    leadAssigned: req.body.leadAssigned,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    inquiredProperty: req.body.inquiredProperty,
    timeline: req.body.timeline,
    budget: req.body.budget,
    leadSource: req.body.leadSource,
    notes: req.body.notes,
  });

  // save user to the DB
  newContact
    .save(newContact)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "An error occurred while adding a new contact"
      });
    })
};

exports.find = (req, res) => {
  if(req.params.id) {
    const contactId = req.params.id;
    crmContactDB.findById(contactId)
      .then(data => {
        if(!data) {
          res.status(404).send({ message: `Contact with ${contactId} was not found.`});
        } else {
          res.send(data);
        }
      })
      .catch(error => {
        res.status(500).send({ message: `Error retreiving ${contactId} id.`})
      })
  } else {
    crmContactDB.find()
    .then(contact => {
      res.status(200).send(contact)
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Error"
      })
    });
  }
};

exports.update = (req, res) => {
  const contactId = req.params.id;
  crmContactDB.findByIdAndUpdate(contactId, req.body)
    .then(data => {
      if(!data) {
        res.status(404).send({ message: `Contact with ${contactId} was not found.`});
      } else {
        res.send(data);
      }
    })
    .catch(error => {
      res.status(500).send({ message: `Error updating ${contactId} id.`})
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  crmContactDB.findByIdAndDelete(id)
    .then(data => {
      if(!data) {
        res.status(404).send({ message: `Cannot Delete the item with id: ${id}.`});
      } else {
        res.send({
          message: `Contact deleted successfully`,
        });
      }
    });
};