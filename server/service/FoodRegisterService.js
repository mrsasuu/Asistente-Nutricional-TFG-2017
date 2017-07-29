var express = require("express");
var FoodRegister = require("../models/FoodRegister");

// Constructor for FoodRegisterService
function FoodRegisterService() {
	this.router = express.Router();
	this.initializeRouter();
}

FoodRegisterService.prototype.initializeRouter = function() {
	var self = this;

	self.router.route('/id/:id').get(function(req, res) {
		var patient_id = req.params.id;
		console.log(patient_id);
		var foodRegister = FoodRegister.build();

		foodRegister.retrieveByPatientId(patient_id).then(function(result) {
			if(result)
				res.json(result);
			else
				res.status(401).send("Patient register Log not found");
		}, function(error) {
				res.send("No se ha podido completar su solicitud");
		});
	});
};

FoodRegisterService.prototype.getRouter = function() {
	var self = this;
	return self.router;
};

module.exports = FoodRegisterService;