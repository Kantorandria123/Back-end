const employeModel = require('./EmployeModel');

const getListEmploye = async () => {
  try {
    const employes = await employeModel.find({});
    return { status: true, message: "Liste des employés récupérée avec succès", employes };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des employés" };
  }
};

module.exports = {
  getListEmploye
};
