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
};

FoodService.prototype.getRouter = function() {
	var self = this;
	return self.router;
};

module.exports = FoodService;