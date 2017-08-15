var express = require("express");
var crypto = require("crypto");

var Patient = require("../models/Patient");

var patientToken;

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




                crypto.randomBytes(64, function(err, buffer) {
                    patientToken = buffer.toString('hex');

                    patient = Patient.build();

                    patient.token = patientToken;

                    patient.updateToken(result.ID).then(function(result2) {

                        if(result)
                        {
                            var response = {
                                ID: result.ID,
                                NAME: result.NAME,
                                SURNAME: result.SURNAME,
                                USERNAME: result.USERNAME,
                                NEWS: result.NEWS,
                                NUTRITIONIST_ID: result.NUTRITIONIST_ID,
                                TOKEN: patientToken
                            };

                            console.log("Respuesta: " + response.ID + " " + response.USERNAME + " " + response.TOKEN);
                            res.json(response);
                        }
                        else
                            res.status(401).send("Patient not found");
                        console.log("Usuario encontrado " + result.USERNAME);

                    }, function(error) {
                        res.status(404).send("Patient not logged in");
                    });

                });


				/*// Check if is Admin
				 var isAdmin = parseInt(self.renderJson.user.ADMIN);

				 if(isAdmin) {
				 var now = moment(new Date()).format('HH:mm DD-MM-YYYY');
				 console.log('- ' + now + ': Admin ' + result.EMAIL + ' logged in');
				 page = '/backend/';
				 }*/


            }

        }, function(error) {
            res.status(404).send("Patient not found");
        });

    });

    self.router.route('/news').post(function(req, res) {
        var id_Patient = req.body.id;
        var token = req.body.token;


        var patient = Patient.build();

        patient.retrieveById(id_Patient).then(function(result) {
            if(result)
            {
                if(result.TOKEN == token){

                    patient = Patient.build();

                    patient.news = 0;

                    patient.updateNews(id_patient).then(function(result2) {
                        console.log("Se han actualizado las novedades del paciente");
                        res.json({NEWS: result.NEWS,ERROR: null});
                    }, function(error) {
                        console.log(error);
                        self.renderJson.error = 'Se ha producido un error interno';
                        res.redirect('/backend/patients');
                    });



                }else{
                    res.json({NEWS:null,ERROR: "INVALID TOKEN"});
                }
            }
            else
                res.status(401).send("Patient not found");
        }, function(error) {
            res.status(404).send("Patient not found");
        });
    });



    self.router.route('/login').post(function(req, res) {
        var id_Patient = req.body.id;
        var token = req.body.password;


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