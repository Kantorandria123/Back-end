const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  duree: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
});

const ServiceModel = mongoose.model('Service', serviceSchema);

module.exports = ServiceModel;
