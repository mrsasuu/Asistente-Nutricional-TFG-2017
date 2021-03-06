var config = require('../config/config.json').http;
var express = require('express');
var session = require('express-session');

var IndexController = require('./IndexController');
var UserController = require('./UserController');
var PatientController = require('./PatientController');
var FoodController = require('./FoodController');
var RDAController = require('./RDAController');
var ActivityLogController = require('./ActivityLogController');


function Views(app) {
	this.expressContext = app;
	this.expressContext.set('views', __dirname + '/../public/templates');
	this.expressContext.set('view engine', 'ejs');

	this.routerBackend = express.Router();
	this.routerFrontend = express.Router();

	this.renderJson = {};

	this.initPages();
}

Views.prototype.initPages = function() {
	var self = this;

	// Initialize controllers
	var indexC = new IndexController(self.renderJson);
	var activityLogC = new ActivityLogController(self.renderJson);
	var userC = new UserController(self.renderJson, activityLogC);

    var foodC = new FoodController(self.renderJson, activityLogC);
    var rdaC = new RDAController(self.renderJson, activityLogC);
    var patientC = new PatientController(self.renderJson, activityLogC);

	activityLogC.setUserController(userC);



	// -- BACKEND VIEWS --
	self.routerBackend.use(indexC.getRouterBackend());
	self.routerBackend.use('/users', userC.getRouterBackend());
    self.routerBackend.use('/foods', foodC.getRouterBackend());
    self.routerBackend.use('/rda', rdaC.getRouterBackend());
    self.routerBackend.use('/patients', patientC.getRouterBackend());


	self.routerBackend.use('/activityLogs', activityLogC.getRouterBackend());

	// -- FRONTEND VIEWS --
	self.routerFrontend.use(indexC.getRouterFrontend());
	self.routerFrontend.use('/user', userC.getRouterFrontend());
    //self.routerFrontend.use('/food', foodC.getRouterFrontend());

	// Attach both Views to Express Context.
	self.expressContext.use('/backend', self.routerBackend);
	self.expressContext.use('/', self.routerFrontend);
};

module.exports = Views;
