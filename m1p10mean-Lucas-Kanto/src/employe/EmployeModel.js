const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  horaireTravail: {
    type: String, 
    required: true,
  },
});

const EmployeModel = mongoose.model('Employe', employeSchema);

module.exports = EmployeModel;
