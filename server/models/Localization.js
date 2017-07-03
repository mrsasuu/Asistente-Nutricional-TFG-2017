var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Export an anonymous function
var Localization = DBConnector.connectAN().define('LOCALIZATION', {
	ID: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
	DESCRIPTION: {type: Sequelize.STRING(500), allowNull: false},
	NFC: {type: Sequelize.STRING(500), allowNull: true},
	QR: {type: Sequelize.STRING(500), allowNull: true},
	COORDINATES: {type: Sequelize.STRING(500), allowNull: true}
},
{
	instanceMethods: {
		retrieve: function(code) {
			return Localization.findOne({where: {$or: [{ID: code}, {NFC: code}, {QR: code}]}});
		},
		retrieveAll: function() {
			return Localization.findAll();
		},
		retrieveById: function(id) {
			return Localization.findOne({where: {ID: id}});
		},
		retrieveByCode: function(code) {
			return Localization.findOne({where: {$or: [{NFC: code}, {QR: code}]}});
		},
		retrieveAllByListIds: function(listIds) {
			return Localization.findAll({where: {ID: {in: listIds}}});
		},
		retrievePagination: function(inicio, fin){
			return Localization.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
		},
		add: function(description, nfc, qr, coordinates) {
			return Localization.create({
				DESCRIPTION: description,
				NFC: nfc,
				QR: qr,
				COORDINATES: coordinates
			});
		},
		updateById: function(localization_id) {
			return Localization.update({
				DESCRIPTION: this.description,
				NFC: this.nfc,
				QR: this.qr,
				COORDINATES: this.coordinates
			}, {where: {ID: localization_id}});
		},
		removeById: function(localization_id) {
			return Localization.destroy({where: {ID: localization_id}});
		}
	},
	freezeTableName: true
});

module.exports = Localization;
