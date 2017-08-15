var express = require("express");
var crypto = require("crypto");

var Food = require("../models/Food");

function FoodService() {
	this.router = express.Router();
	this.initializeRouter();
}

FoodService.prototype.initializeRouter = function() {
	var self = this;


    self.router.route('/').get(function(req, res) {
        var id_food = req.params.food_id;

        var food = Food.build();

        food.retrieveAll().then(function(result) {
            if(result)
                res.json(result);
            else
                res.status(401).send("Food not found");
        }, function(error) {
            res.status(404).send("Food not found");
        });
    });

    self.router.route('/app').get(function(req, res) {

        var food = Food.build();

        food.retrieveAll().then(function(result) {
            if(result){
                var response = [];

                for(var i = 0; i < result.length; i++){
                    response.push({
                        FOODID: result[i].ID,
                        NAME: result[i].NAME,
                        PHOTO: result[i].PHOTO,
                        MINPHOTO: result[i].MIN_PHOTO,
                        MEDPHOTO: result[i].MED_PHOTO,
                        MAXPHOTO: result[i].MAX_PHOTO,
                        MINAMOUNT: result[i].MIN_AMOUNT,
                        MEDAMOUNT: result[i].MED_AMOUNT,
                        MAXAMOUNT: result[i].MAX_AMOUNT,
                        CREATETIME: result[i].CREATETIME
                    });
                }

                console.log("Se envian los alimentos: " + response);
                res.json(response);
            }
            else
                res.status(401).send("Food not found");
        }, function(error) {
            res.status(404).send("Food not found");
        });
    });

    self.router.route('/count').post(function(req, res) {


        console.log("Se ha llamado a count");

        var food = Food.build();

        food.retrieveAll().then(function(result) {
            if(result){
                console.log("Numero de alimentos post: " + result.length)

                var respuesta = result.length;
                res.json({ROWS: respuesta});
            }
            else
                res.status(401).send("Food not found");
        }, function(error) {
            res.status(404).send("Food not found");
        });
    });

    self.router.route('/count').get(function(req, res) {


        console.log("Se ha llamado a count");

        var food = Food.build();

        food.retrieveAllOrdered().then(function(result) {
            if(result){
                console.log("Numero de alimentos get etgretgv4e : " + result.length)

                var respuesta = result.length;
                var milisec = new Date(result[0].CREATETIME).getTime();
                res.json({ROWS: respuesta,TIME: milisec,ERROR:null});
            }
            else {
                res.json({ROWS: null,TIME: null,ERROR:"FOOD ERROR"});
                res.status(401).send("Food not found");
            }
        }, function(error) {
            res.status(404).send("Food not found");
        });
    });

	self.router.route('/id/:food_id').get(function(req, res) {
		var id_food = req.params.food_id;

		var food = Food.build();
		
		food.retrieveById(id_food).then(function(result) {
			if(result) 
				res.json(result);
			else
				res.status(401).send("Food not found");
		}, function(error) {
			res.status(404).send("Food not found");
		});
	});

    self.router.route('/name/:food_name').get(function(req, res) {
        var name_food = req.params.food_name;

        var food = Food.build();

        food.retrieveAllByName(name_food).then(function(result) {
            if(result)
                res.json(result);
            else
                res.status(401).send("Food not found");
        }, function(error) {
            res.status(404).send("Food not found");
        });
    });
};

FoodService.prototype.getRouter = function() {
	var self = this;
	return self.router;
};

module.exports = FoodService;