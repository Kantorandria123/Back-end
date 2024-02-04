const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  horaireTravail: {
    type: Number, // Vous pouvez ajuster le type en fonction de vos besoins
    required: true,
  },
});

const EmployeModel = mongoose.model('Employe', employeSchema);

module.exports = EmployeModel;
