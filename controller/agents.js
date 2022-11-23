const crmAgentDB = require('../model/agents');

exports.create = (req, res) => {
  if(!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
    return;
  }

  const currentDate = new Date(Date.now()).toISOString();
  // new user
  const newAgent = new crmAgentDB({
    publishedDate: currentDate,
    name: req.body.name,
  });

  // save user to the DB
  newAgent
    .save(newAgent)
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
    const agentId = req.params.id;
    crmAgentDB.findById(agentId)
      .then(data => {
        if(!data) {
          res.status(404).send({ message: `Agent with ${agentId} was not found.`});
        } else {
          res.send(data);
        }
      })
      .catch(error => {
        res.status(500).send({ message: `Error retreiving ${agentId} id.`})
      })
  } else {
    crmAgentDB.find()
    .then(agent => {
      res.status(200).send(agent)
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Error"
      })
    });
  }
};

exports.update = (req, res) => {
  const agentId = req.params.id;
  crmAgentDB.findByIdAndUpdate(agentId, req.body)
    .then(data => {
      if(!data) {
        res.status(404).send({ message: `Agent with ${agentId} was not found.`});
      } else {
        res.send(data);
      }
    })
    .catch(error => {
      res.status(500).send({ message: `Error updating ${agentId} id.`})
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  crmAgentDB.findByIdAndDelete(id)
    .then(data => {
      if(!data) {
        res.status(404).send({ message: `Cannot Delete the Agent with id: ${id}.`});
      } else {
        res.send({
          message: `Agent deleted successfully`,
        });
      }
    });
};