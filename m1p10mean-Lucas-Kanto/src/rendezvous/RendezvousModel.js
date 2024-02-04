const mongoose = require('mongoose');

const rendezvousSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  daty: {
    type: String,
    required: true,
  },
  horaire: {
    type: String, 
    required: true,
  },
  employee_id: {
    type: Number,
    required: true,
  },
  service_id: {
    type: Number,
    required: true,
  },
  client_id: {
    type: Number,
    required: true,
  },
});

const RendezvousModel = mongoose.model('Rendezvous', rendezvousSchema);

module.exports = RendezvousModel;
