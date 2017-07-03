var config = require('../config/config.json');
var Sequelize = require("sequelize");

function DBConnector() {
	this.sequelize_AN = undefined;

	this.host_AN = config.db.host;
	this.port_AN = config.db.port;
	this.database_AN = config.db.database;
	this.username_AN = config.db.username;
	this.password_AN = config.db.password;
	this.driver_AN = config.db.driver;

	this.initialize();

	this.testConnection();
}

DBConnector.prototype.initialize = function() {
	var self = this;

	self.sequelize_AN = new Sequelize(self.database_AN, self.username_AN, self.password_AN, {
		host: self.host_AN,
		port: self.port_AN,
		protocol: 'tcp',
		maxConcurrentQueries: 40,
		dialect: self.driver_AN,
		//logging: console.log,         // Uncomment this line and comment next to log SQL Queries
		logging: false,
		define: { timestamps: false },
		query: { raw: true }
	});
};

DBConnector.prototype.connectAN = function() {
	return this.sequelize_AN;
};

DBConnector.prototype.testConnection = function() {
	var self = this;
	self.sequelize_AN.authenticate()
		.then(function(err) {
		console.log('Connection has been established successfully with AN.');
	})
	.catch(function (err) {
		console.log('Unable to connect to the database AN:', err);
	});
};

DBConnector.prototype.closeConnection = function() {
	this.sequelize_AN.close().then(function(err) {
		console.log('Connection closed to the database AN.');
	})
	.close(function(err) {
		console.log('Unable to close to the database AN', err);
	});
};

module.exports = new DBConnector();