var express = require("express");
var FoodRegister = require("../models/FoodRegister");

function getWeek(d,dowOffset) {
    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 1; //default dowOffset to zero
    var newYear = new Date(d.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((d.getTime() - newYear.getTime() -
            (d.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(d.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
			/*if the next year starts before the middle of
			 the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
}

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

    self.router.route('/lastweek/:id').get(function(req, res) {
        var patient_id = req.params.id;
        console.log(patient_id);
        var foodRegister = FoodRegister.build();

        foodRegister.retrieveByPatientIdLastWeek(patient_id).then(function(result) {
            if(result)
                res.json(result);
            else
                res.status(401).send("Patient register Log not found");
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });
    });

    self.router.route('/week_number').post(function(req, res) {
        var patient_id = req.body.id;
        var date= getWeek(new Date(req.body.date),1);

        var response = [];



        console.log("Id paciente: " + patient_id + " fecha: " + req.body.date + " numero de semana: " + date);


        var foodRegister = FoodRegister.build();

        foodRegister.retrieveByPatientIdLastWeek(patient_id).then(function(result) {
            if(result)
			{
				for(var i = 0; i < result.length; i++){
                    console.log("num semana: " + date + " fecha a buscar: " + getWeek(new Date(result[i].DATE),1));
                    if(date == getWeek(new Date(result[i].DATE),1)){
                    	response.push(result[i]);
					}
				}



                console.log("numero de registros: " + response.length);

                res.json({ROWS: response.length, TIME: result[0].CREATETIME ,ERROR: null});
			}
            else {
                res.json({ROWS: null.length, ERROR: "ERROR FOODREGISTER"});
                res.status(401).send("Patient register Log not found");
            }
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });
    });

    self.router.route('/id/last_register/:id').get(function(req, res) {
        var patient_id = req.params.id;
        console.log(patient_id);
        var foodRegister = FoodRegister.build();

        foodRegister.retrieveLastAdded(patient_id).then(function(result) {
            if(result)
                res.json(result.DATE);
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