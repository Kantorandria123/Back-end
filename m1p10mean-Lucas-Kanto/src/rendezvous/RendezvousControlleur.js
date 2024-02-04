const rendezvousService = require('./RendezvousService');

const listeRendezvousControllerFn = async (req, res) => {
  try {
    const result = await rendezvousService.getListRendezvous();
    if (result.status) {
      res.send({ status: true, message: result.message, rendezvousList: result.rendezvousList });
    } else {
      res.send({ status: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Erreur lors de la récupération de la liste des rendez-vous" });
  }
};

var creerRendevousControlleur = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var result = await rendezvousService.creerRendezVous(req.body);
    console.log(result);
    if (result) {
        res.send({ "status": true, "message": "Rendezvous created successfully","id":result.id});
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}
catch(err)
{
    console.log(err);
}
}
module.exports = {
  listeRendezvousControllerFn,creerRendevousControlleur
};
