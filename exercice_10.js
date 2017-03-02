// Requêtes des modules Node.js essentiels au projet
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const app = express();
// Déclaration de l'engin de gabarits pour ejs
app.set('view engine', 'ejs');
// Définition des options des modules
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
// Création de la base de données du serveur
var db;
// Connexion à la base de données MongoDB installée localement, collection carnet_adresses
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresses', (err, database) => {
	if (err) return console.log(err)
	// Récupération de la base de données sur le serveur
	db = database
	app.listen(8081, () => {
		console.log('connexion à la BD et on écoute sur le port 8081');
	})
})

// Routage de l'adresse '/' pour l'affichage de la page html du template contenant les informations de la base de données
app.get('/',  (req, res) => {
  console.log('la route route get / = ' + req.url)
  var cursor = db.collection('adresses').find().toArray(function(err, resultat){
    if (err) return console.log(err);
    // Appel de la page ejs et distribution des informations de la base de données à celle-ci
    res.render('index.ejs', {liste: resultat});
  })
})

// Routage de l'adresse '/ajouter' appelée depuis le formulaire d'ajout sur la page HTML
app.post('/ajouter', function (req, res) {
	// Création d'un document à ajouter à la base de données et récupération des informations du formulaire
	var nouvelUtilisateur = {
		nom:req.body.nom,
		prenom:req.body.prenom,
		telephone:req.body.telephone,
		ville:req.body.ville,
		codepostal:req.body.codepostal
	};
	console.log('Ajout');
	// Envoi du document à la base de données
	db.collection('adresses').save(nouvelUtilisateur, (err, result) => {
		if (err) return console.log(err);
		console.log('sauvegarder dans la BD');
		// Renvoyer à l'adresse racine
		res.redirect('/');
	});
})
// Routage de l'adresse 'modifier/ID_À_MODIFIER' appelée depuis le formulaire de modification sur la page HTML
app.post('/modifier/:id', function (req, res) {
	// Préparation d'un document à insérer dans la base de données pour remplacer un document existant
	var utilisateurModifie = {
		// Déclaration, en premier lieu, du ID
		_id: ObjectId(req.params.id),
		nom:req.body.nom,
		prenom:req.body.prenom,
		telephone:req.body.telephone,
		ville:req.body.ville,
		codepostal:req.body.codepostal
	};
	console.log('Modification');
	// Envoi des informations à un document correspondant à un id spécifique dans la collection
	db.collection('adresses').save(utilisateurModifie, (err, result) => {
		if (err) return console.log(err);
		console.log('Modifier l\'id '+req.params.id+' de la bd');
		// Renvoyer à l'adresse racine
		res.redirect('/');
	})
})
// Routage de l'adresse '/supprimer/ID_À_SUPPRIMER' appelée depuis de bouton adjacent à la rangée correspondante du tableau
app.get('/supprimer/:id', function (req, res) {
	console.log('Suppression');
	// Suppression du document correspondant à l'id fourni de la collection
	db.collection('adresses').remove({"_id": ObjectId(req.params.id)}, (err, result) => {
		if (err) return console.log(err);
		console.log('Supprimer l\'id '+req.params.id+' de la bd');
		// Renvoyer à l'adresse racine
		res.redirect('/');
	});
})