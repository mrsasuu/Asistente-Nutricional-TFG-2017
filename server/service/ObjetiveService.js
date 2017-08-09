var express = require("express");
var Objetive = require("../models/Objetive");

// Constructor for FoodRegisterService
function ObjetiveService() {
	this.router = express.Router();
	this.initializeRouter();
}

ObjetiveService.prototype.initializeRouter = function() {
	var self = this;

	self.router.route('/id/:id').get(function(req, res) {
		var patient_id = req.params.id;
		console.log(patient_id);
		var objetive = Objetive.build();

		objetive.retrieveByPatientId(patient_id).then(function(result) {
			if(result)
				res.json(result);
			else
				res.status(401).send("Patient register Log not found");
		}, function(error) {
				res.send("No se ha podido completar su solicitud");
		});
	});

    self.router.route('/id/last_register/:id').get(function(req, res) {
        var patient_id = req.params.id;
        console.log(patient_id);
        var objetive = Objetive.build();

        objetive.retrieveLastAdded(patient_id).then(function(result) {
            if(result)
                res.json(result.DATE);
            else
                res.status(401).send("Patient register Log not found");
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });
    });

    self.router.route('/ide/').post(function(req, res) {
        var objetive_id = req.params.id;
        var progress = req.params.progress;

        //console.log(patient_id);
        var objetive = Objetive.build();

        objetive.progress = progress;

        objetive.updateProgress(objetive_id).then(function(result) {
            if(result)
                res.json("Progreso actualizado");
            else
                res.status(401).send("Progress not found");
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });

    });
};

ObjetiveService.prototype.getRouter = function() {
	var self = this;
	return self.router;
};

module.exports = ObjetiveService;