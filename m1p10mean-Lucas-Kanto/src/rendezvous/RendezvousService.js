const RendezvousModel = require('./RendezvousModel');
const rendezvousModel = require('./RendezvousModel');

const getListRendezvous = async () => {
  try {
    const rendezvousList = await rendezvousModel.find({});
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous" };
  }
};
const creerRendezVous = (rendezvous) => {
    return new Promise((resolve, reject) => {
        var rendezvousData = new RendezvousModel();
        rendezvousData.daty = rendezvous.daty;
        rendezvousData.horaire = rendezvous.horaire;
        rendezvousData.description = rendezvous.description;
        rendezvousData.employee_id = rendezvous.employee_id;
        rendezvousData.service_id = rendezvous.service_id;
        rendezvousData.client_id = rendezvous.client_id;

        rendezvousData.save()
            .then(result => {
                console.log('Save successful');
                
                const insertedId = result._id;
                console.log('insertedId '+insertedId);
                resolve({ success: true, id: insertedId });
            })
            .catch(error => {
                console.error('Save failed', error);
                reject({ success: false, error: error });
            });
    });
}

const listeRendezvousByClient = async (clientId) => {
  try {
    console.log("clientId : "+clientId);
    const rendezvousList = await RendezvousModel.aggregate([
      {
        $match: {
          client_id: clientId
        }
      },
      {
        $addFields: {
          employee_id: { $toObjectId: "$employee_id" },
          service_id: { $toObjectId: "$service_id" }
        }
      },
      {
        $lookup: {
          from: "employes",
          localField: "employee_id",
          foreignField: "_id",
          as: "employe_info"
        }
      },
      {
        $unwind: "$employe_info"
      },
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "_id",
          as: "service_info"
        }
      },
      {
        $unwind: "$service_info"
      },
      {
        $project: {
          "employe_info.nom": 1,
          "employe_info.horaireTravail": 1,
          "employe_info.image": 1,
          "service_info.nom": 1,
          "service_info.duree": 1,
          "service_info.prix": 1,
          "service_info.commission": 1,
          "service_info.image": 1,
          _id: 1,
          daty: 1,
          horaire: 1,
          description: 1,
          client_id: 1
        }
      }
    ]);
    console.log("rendezvousList.length : "+rendezvousList);
    return { status: true, message: "Liste des rendez-vous récupérée avec succès", rendezvousList };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Erreur lors de la récupération de la liste des rendez-vous par client" };
  }
};


module.exports = {
  getListRendezvous,creerRendezVous,listeRendezvousByClient
};
