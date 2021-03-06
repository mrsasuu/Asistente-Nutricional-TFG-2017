var config = require("../config/config").api;

var express = require("express");
var cors = require("cors");

var UserService = require('../service/UserService');
var FoodService = require('../service/FoodService');
var PatientService = require('../service/PatientService');
var ActivityLogService = require('../service/ActivityLogService');
var FoodRegisterLogService = require('../service/FoodRegisterService');
var ObjetiveService = require('../service/ObjetiveService');


function ApiRest() {
	this.publicTokenList = [];
	this.activePublicToken = '';
	this.timeout = 10 * 60 * 1000;

	this.opened_apis = ['user'];

	this.serviceRouter = express.Router();
	this.validateApiKey();
	this.defineApiServices();

	this.router = express.Router();
	this.router.use(cors());

	// Serve REST API resources
	this.router.use('/api', this.serviceRouter);

	// Serve static resources
	this.router.use('/static', express.static(__dirname + '/../public/static'));
}

// Validate the API Key to increase the security
ApiRest.prototype.validateApiKey = function() {
	var self = this;

};

// Define API Services
ApiRest.prototype.defineApiServices = function() {
	var self = this;

	this.serviceRouter.use('/user', new UserService().getRouter());
    this.serviceRouter.use('/food', new FoodService().getRouter());
    this.serviceRouter.use('/patient', new PatientService().getRouter());
    this.serviceRouter.use('/food_register', new FoodRegisterLogService().getRouter());
    this.serviceRouter.use('/objetive', new ObjetiveService().getRouter());
	this.serviceRouter.use('/activity_log', new ActivityLogService().getRouter());
};

// Get Router of API Rest
ApiRest.prototype.getRouter = function() {
	return this.router;
};

module.exports = ApiRest;
