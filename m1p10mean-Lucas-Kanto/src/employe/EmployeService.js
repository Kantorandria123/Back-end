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

module.exports.createEmployeeDBService = (employeetDetails) => {


  return new Promise(function myFn(resolve, reject) {

      var employeeModelData = new employeModel();

      employeeModelData.nom = employeetDetails.nom;
      employeeModelData.email = employeetDetails.email;
      employeeModelData.mdp = employeetDetails.mdp;
      var encrypted = encryptor.encrypt(employeetDetails.mdp);
      employeeModelData.mdp = encrypted;
      employeeModelData.image = employeetDetails.image;
      employeeModelData.horaireTravail = employeetDetails.horaireTravail;
      employeeModelData.role_id = employeetDetails.role_id;
      employeeModelData.token = employeetDetails.token;
     

      employeeModelData.save()
           .then(result => {
               console.log('Save successful');
               
               const insertedId = result._id;
               console.log('insertedId '+insertedId);
               resolve({ status: true, id: insertedId });
           })
           .catch(error => {
               console.error('Save failed', error);
               reject({ status: false, error: error });
           });
    
  });

}



module.exports.loginEmployeerDBService = (employeetDetails) => {
  return new Promise((resolve, reject) => {
    employeModel.findOne({ email: employeetDetails.email })
      .then(result => {
        if (result !== undefined && result !== null) {
          var decrypted = encryptor.decrypt(result.mdp);
          if (decrypted == employeetDetails.mdp) {
            now = getCurrentDateTime();
            newToken = encryptor.encrypt(now + decrypted);
            employeModel.findOneAndUpdate(
              { _id: result._id },
              { $set: { token: newToken } },
              { new: true }
            ).then(resulttoken => {
              employeModel.findOne(
                 { email: resulttoken.email,token:resulttoken.token,role_id: resulttoken.role_id })
                 .then(resultfinal=> {
                    resolve({
                       status: true,
                       message: "employee validé avec succès!",
                       employee: resultfinal
                     });
                 });
            });
          } else {
            reject({
              status: false,
              message: "Validation de l'employee échouée"
            });
          }
        } else {
          reject({
            status: false,
            message: "Détails d'erreur de l'employee"
          });
        }
      })
      .catch(error => {
        reject({ status: false, message: "Données invalides" });
      });
  });
}

module.exports.getEmployeeByToken = (employeetDetails) => {
  return new Promise((resolve, reject) => {
    employeModel.findOne({ email: employeetDetails.email,token:employeetDetails.token,role_id: resulttoken.role_id})
      .then(result => {
        console.log("email : " + employeetDetails.email);
        console.log("token : " + employeetDetails.token);
        console.log("result "+result);
        resolve({
           status: true,
           message: "employee trouver!",
           employee: result
         });
      })

      .catch(error => {
        reject({ status: false, message: "Données invalides" });
      });
  });
}


function getCurrentDateTime() {
  const currentDateTime = new Date();
  const date = currentDateTime.toISOString().split('T')[0];
  const time = currentDateTime.toLocaleTimeString();
  const dateTimeString = `${date} ${time}`;
  return dateTimeString;
}

module.exports = {
  getListEmploye
};
