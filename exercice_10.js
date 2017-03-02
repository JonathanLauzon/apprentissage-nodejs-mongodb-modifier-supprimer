// Requêtes des modules Node.js essentiels au projet
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
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
	nouvelUtilisateur = {
		nom:req.body.nom,
		prenom:req.body.prenom,
		telephone:req.body.telephone,
		ville:req.body.ville,
		codepostal:req.body.codepostal
	};
	console.log('reponse');
	// Envoi du document à la base de données
	db.collection('adresses').save(nouvelUtilisateur, (err, result) => {
		if (err) return console.log(err);
		console.log('sauvegarder dans la BD');
		// Renvoyer à la page '/'
		res.redirect('/');
	});
})