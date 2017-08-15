var crypto = require('crypto');

var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Exporto una funcion anonima
var Patient = DBConnector.connectAN().define('PATIENT', {
	ID: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
	DNI: { type: Sequelize.STRING(50), unique: true, allowNull: false },
	NAME: { type: Sequelize.STRING(200), allowNull: false },
	SURNAME: { type: Sequelize.STRING(400), allowNull: false },
	AGE: { type: Sequelize.INTEGER, allowNull: false },
	GENDER: { type: Sequelize.INTEGER, allowNull: false },
	ADDRESS: { type: Sequelize.STRING(300), allowNull: false },
	PHONE: { type: Sequelize.INTEGER, unique: true, allowNull: false },
	EMAIL: { type: Sequelize.STRING(190), unique: true, allowNull: false },
	USERNAME: { type: Sequelize.STRING(100), unique: true, allowNull: false },
	PASSWORD: { type: Sequelize.STRING(500), allowNull: false },
	WEIGHT: { type: Sequelize.INTEGER, allowNull: false },
	HEIGHT: { type: Sequelize.INTEGER, allowNull: false },
	ACTIVITY_LEVEL: { type: Sequelize.INTEGER, allowNull: false },
	RESET_TOKEN: { type: Sequelize.STRING(500), allowNull: true },
	NEWS: { type: Sequelize.INTEGER, allowNull: true },
	NUTRICIONIST_ID: { type: Sequelize.INTEGER, allowNull: false },
	PHOTO: { type: Sequelize.STRING(500), allowNull: true },
	TOKEN: { type: Sequelize.STRING(1000), allowNull: true },
},
{
	instanceMethods: {
		retrieveById: function(id) {
			return Patient.findOne({ where: { ID: id } });
		},
        retrieveAll: function(id_Nutricionist) {
            return Patient.findAll({ where: { NUTRICIONIST_ID: id_Nutricionist } });
        },
		retrieveAllByListIds: function(listIds) {
			return Patient.findAll({ where: { ID: { in: listIds } } });
		},
        retrieveByUserName: function(username){
            return Patient.findOne({ where: { USERNAME: username } });
        },
		retrieveByEmail: function(email){
			return Patient.findOne({ where: { EMAIL: email } });
		},
		retrievePagination: function(inicio, fin){
			return Patient.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
		},
		retrieveLastAdded: function() {
			return Patient.findOne( { order: 'ID DESC' });
		},
		searchUsers: function(username) {
			return Patient.findAll({ where: { $or: [ { NAME: { $like: '%'+username+'%'} }, { SURNAME: { $like: '%'+username+'%'} } ] } });
		},
		add: function(dni,name,surname,age,gender,address,phone,email,username, password, weight, height, activity_level,nutricionist_id,photo) {
			var shasum = crypto.createHash('sha1');
			shasum.update(password);
			password = shasum.digest('hex');

			return Patient.create({
                DNI: dni,
                NAME: name,
                SURNAME:surname,
                AGE: age,
                GENDER: gender,
                ADDRESS: address,
                PHONE: phone,
                EMAIL: email,
                USERNAME: username,
                PASSWORD: password,
                WEIGHT: weight,
                HEIGHT: height,
                ACTIVITY_LEVEL: activity_level,
                RESET_TOKEN: '',
                NEWS: 0,
				NUTRICIONIST_ID: nutricionist_id,
				PHOTO: photo
			});
		},
		updateById: function(user_id){
			return Patient.update({
                DNI: this.dni,
                NAME: this.name,
                SURNAME: this.surname,
                AGE: this.age,
                GENDER: this.gender,
                ADDRESS: this.address,
                PHONE: this.phone,
                EMAIL: this.email,
                USERNAME: this.username,
                PASSWORD: this.password,
                WEIGHT: this.weight,
                HEIGHT: this.height,
                ACTIVITY_LEVEL: this.activity_level,
				PHOTO: this.photo
			}, { where: {ID: user_id} });
		},
		updateNews: function(id) {
			return Patient.update({NEWS: this.news},{ where: {ID: id} });
		},
        updateToken: function(id) {
            return Patient.update({TOKEN: this.token},{ where: {ID: id} });
        },
		removeById: function(user_id){
			return Patient.destroy({ where: {ID: user_id} });
		}
	},
	freezeTableName: true,
});

module.exports = Patient;