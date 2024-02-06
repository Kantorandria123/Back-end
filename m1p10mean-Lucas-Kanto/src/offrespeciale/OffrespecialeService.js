const OffrespecialeModel = require('./OffrespecialeModel');

const getListOffrespecial = async () => {
    try{
        const offrespecialList = await OffrespecialeModel.find({});
        return {status: true, message: "Listes des offres spécial récupérée avec succès", offrespecialList};

    } catch (error) {
        console.error(error);
        return {status: false, message: "Erreur lors de la récupération de la liste des offres spécial"};
    }
};

const creerOffrespecial = (offrespecial) => {
    return new Promise((resolve, reject) => {
        var offrespecialData = new OffrespecialeModel();
        offrespecialData.titre = offrespecial.titre;
        offrespecialData.description = offrespecial.description;
        offrespecialData.datedebut = offrespecial.datedebut;
        offrespecialData.datefin = offrespecial.datefin;
        offrespecialData.service_id = offrespecial.service_id;

        offrespecialData.save()
            .then(result => {
                console.log('Save successful');

                const insertedId = result._id;
                console.log('insertedId' +insertedId);
                resolve({success: true, id: insertedId});
            })
            .catch(error => {
                console.error('Save failed', error);
                reject({success: false, error: error});
            });
    });
}

module.exports = {
    getListOffrespecial,creerOffrespecial
}