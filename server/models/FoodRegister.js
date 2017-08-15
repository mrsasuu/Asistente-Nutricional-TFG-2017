var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('');
};

// Export an anonymous function
var FoodRegister = DBConnector.connectAN().define('FOODREGISTER', {
	REGISTERID: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
	PATIENTID: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: false},
	FOODID: {type: Sequelize.INTEGER, allowNull: false},
	FOODHOUR: {type: Sequelize.STRING(45), allowNull: false},
	DATE: {type: Sequelize.DATE, allowNull: false},
	AMOUNT: {type: Sequelize.DOUBLE, allowNull: false},
	CREATETIME: {type: Sequelize.DATE, allowNull: false}
},
{
	instanceMethods: {
		retrieveById: function(id) {
			return FoodRegister.findOne({where: {REGISTERID: id}});
		},
        retrieveByPatientId: function(patientId) {
            return FoodRegister.findAll({where: {PATIENTID: patientId}});
        },
		retrieveByPatientIdLastWeek: function(patientId) {

            return FoodRegister.findAll({where: {PATIENTID: patientId},order: 'CREATETIME DESC'});
        },
        retrieveByPatientIdAndDate: function(patientId,date) {
            return FoodRegister.findOne({where: {PATIENTID: patientId,DATE: date}});
        },
		retrieveLastAdded: function(patientId) {
            return FoodRegister.findOne( { where:{PATIENTID: patientId },order: 'DATE DESC' });
        },
        retrieveByIdAndFoodHour: function(patientId,foodhour) {
            return FoodRegister.findOne({where: {PATIENTID: patientId,FOODHOUR: foodhour}});
        },
		retrieveAllByListIds: function(listIds) {
			return FoodRegister.findAll({where: {REGISTERID: {in: listIds}}});
		},
		retrievePagination: function(inicio, fin){
			return FoodRegister.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
		},
		add: function(patientId, foodId, foodHour,date,amount,time) {
			return FoodRegister.create({
				PATIENTID: patientId,
				FOODID: foodId,
                FOODHOUR: foodHour,
				DATE: date,
				AMOUNT: amount,
				CREATETIME: time
			});
		},
        removeById: function(food_registry_id){
            return FoodRegister.destroy({ where: {REGISTERID: food_registry_id} });
        }
	},
	freezeTableName: true
});

module.exports = FoodRegister;