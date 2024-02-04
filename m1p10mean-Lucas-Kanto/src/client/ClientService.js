var clientModel = require('./ClientModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createClientDBService = (clientDetails) => {


   return new Promise(function myFn(resolve, reject) {

       var clientModelData = new ClientModel();

       clientModelData.nom = clientDetails.nom;
       clientModelData.email = clientDetails.email;
       clientModelData.phone = clientDetails.phone;
       clientModelData.password = clientDetails.password;
       var encrypted = encryptor.encrypt(clientDetails.mdp);
       clientModelData.mdp = encrypted;
       clientModelData.argent = clientDetails.argent;
      //  clientModelData.save(function resultHandle(error, result) {

      //      if (error) {
      //          reject(false);
      //      } else {
      //          resolve(true);
      //      }
      //  });


      const saveClient = () => {
         return clientModelData.save()
             .then(result => {
                 return Promise.resolve(true);
             })
             .catch(error => {
                 return Promise.reject(false);
             });
     };
     
     // Usage
     saveClient()
         .then(success => {
             console.log('Save successful');
         })
         .catch(error => {
             console.error('Save failed');
         });
     

   });

}

module.exports.loginUserDBService = (clientDetails) => {
   return new Promise((resolve, reject) => {
     clientModel.findOne({ email: clientDetails.email })
       .then(result => {
         console.log("email : " + clientDetails.email);
         console.log("id : " + result.id);
 
         if (result !== undefined && result !== null) {
           var decrypted = encryptor.decrypt(result.mdp);
           if (decrypted == clientDetails.mdp) {
             now = getCurrentDateTime();
             newToken = encryptor.encrypt(now + decrypted);
             console.log("now : " + now);
             clientModel.findOneAndUpdate(
               { id: result.id },
               { $set: { token: newToken } },
               { new: true }
             ).then(resulttoken => {
               console.log("resulttoken.token = " + resulttoken.token);
               clientModel.findOne(
                  { email: resulttoken.email,token:resulttoken.token })
                  .then(resultfinal=> {
                     console.log("resultfinal = "+resultfinal);
                     resolve({
                        status: true,
                        message: "client validé avec succès!",
                        client: resultfinal
                      });
                  });
             });
           } else {
             reject({
               status: false,
               message: "Validation de client échouée"
             });
           }
         } else {
           reject({
             status: false,
             message: "Détails d'erreur de client"
           });
         }
       })
       .catch(error => {
         reject({ status: false, message: "Données invalides" });
       });
   });
 }
 
 module.exports.getClientByToken = (clientDetails) => {
   return new Promise((resolve, reject) => {
     clientModel.findOne({ email: clientDetails.email,token:clientDetails.token})
       .then(result => {
         console.log("email : " + clientDetails.email);
         console.log("token : " + clientDetails.token);
         console.log("result "+result);
         resolve({
            status: true,
            message: "client trouver!",
            client: result
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

