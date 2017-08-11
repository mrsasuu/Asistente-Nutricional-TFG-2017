var express = require("express");
var crypto = require("crypto");

var Patient = require("../models/Patient");

function PatientService() {
	this.router = express.Router();
	this.initializeRouter();
}

PatientService.prototype.initializeRouter = function() {
	var self = this;


    self.router.route('/').get(function(req, res) {
        var id_Patient = req.params.Patient_id;

        var Patient = Patient.build();

        Patient.retrieveAll().then(function(result) {
            if(result)
                res.json(result);
            else
                res.status(401).send("Patient not found");
        }, function(error) {
            res.status(404).send("Patient not found");
        });
    });

	self.router.route('/id/:Patient_id').get(function(req, res) {
		var id_Patient = req.params.Patient_id;


		var patient = Patient.build();

        patient.retrieveById(id_Patient).then(function(result) {
			if(result) 
				res.json(result);
			else
				res.status(401).send("Patient not found");
		}, function(error) {
			res.status(404).send("Patient not found");
		});
	});

    self.router.route('/login').post(function(req, res) {
        var id_Patient = req.body.id;
        var pass_Patient = req.body.password;


        var patient = Patient.build();

        console.log("Usuario ejecuta petición:  " + id_Patient + " contraseña: " + pass_Patient);

        patient.retrieveByUserName(id_Patient).then(function(result) {



            var shasum = crypto.createHash('sha1');
            shasum.update(pass_Patient);
            hashed_password = shasum.digest('hex');

            console.log("Usuario encontrado:  " + result.NAME + " contraseña con sha: " + hashed_password);

            // Correct Password
            if(hashed_password == result.PASSWORD) {


				/*// Check if is Admin
				 var isAdmin = parseInt(self.renderJson.user.ADMIN);

				 if(isAdmin) {
				 var now = moment(new Date()).format('HH:mm DD-MM-YYYY');
				 console.log('- ' + now + ': Admin ' + result.EMAIL + ' logged in');
				 page = '/backend/';
				 }*/

                console.log("Usuario encontrado " + result.USERNAME);

            }
        	if(result)
                res.json(result);
            else
                res.status(401).send("Patient not found");
        }, function(error) {
            res.status(404).send("Patient not found");
        });

    });
};

PatientService.prototype.getRouter = function() {
	var self = this;
	return self.router;
};

module.exports = PatientService;