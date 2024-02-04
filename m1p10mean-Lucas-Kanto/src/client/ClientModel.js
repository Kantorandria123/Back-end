const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  argent: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const ClientModel = mongoose.model('Client', clientSchema);

module.exports = ClientModel;
