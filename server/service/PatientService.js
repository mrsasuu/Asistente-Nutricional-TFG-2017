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
};

PatientService.prototype.getRouter = function() {
	var self = this;
	return self.router;
};

module.exports = PatientService;