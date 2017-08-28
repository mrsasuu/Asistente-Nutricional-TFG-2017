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

    self.router.route('/week/:id').get(function(req, res) {
        var patient_id = req.params.id;
        console.log(patient_id);
        var objetive = Objetive.build();

        objetive.retrieveByPatientId(patient_id).then(function(result2) {

            var response = [];


            var Today = new Date();
            var msToday = Today.getTime();
            var yesterday = new Date();

            yesterday.setDate(Today.getDate()-1);
            var msYesterday= yesterday.getTime();
            var beforeyesterday = new Date();


            beforeyesterday.setDate(yesterday.getDate()-1);
            var msbeforeyesterday = beforeyesterday.getTime();


            for(var i = 0; i < result2.length; i++){
                var msStart = new Date(result2[i].START_DATE).getTime();
                var msEnd = new Date(result2[i].END_DATE).getTime();

                if((msStart <= msToday) &&(msToday <= msEnd)){
                    response.push({
                        FOODID: result2[i].FOOD_ID,
                        FOODNAME: "",
                        FOODHOUR: result2[i].FOODHOUR,
                        PHOTO: "",
                        AMOUNT: result2[i].AMOUNT,
                        STARTDATE: new Date(result2[i].START_DATE).getTime(),
                        ENDATE: new Date(result2[i].END_DATE).getTime(),
                        PROGRESS: result2[i].PROGRESS
                    });

                }
            }

            res.json(response);
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