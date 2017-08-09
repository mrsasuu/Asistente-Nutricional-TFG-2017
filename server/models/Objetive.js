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
var Objetive = DBConnector.connectAN().define('OBJETIVE', {
	ID: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
	NUTRITIONIST_ID: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: false},
	PATIENT_ID: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: false},
	FOOD_ID: {type: Sequelize.INTEGER, allowNull: false},
	AMOUNT: {type: Sequelize.DOUBLE, allowNull: false},
	FOODHOUR: {type: Sequelize.STRING(45), allowNull: true},
	START_DATE: {type: Sequelize.DATE, allowNull: false},
	END_DATE: {type: Sequelize.DATE, allowNull: false},
	COMPLETED: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: false},
	PROGRESS: {type: Sequelize.DOUBLE, allowNull: false},
},
{
	instanceMethods: {
		retrieveById: function(id) {
			return Objetive.findOne({where: {ID: id}});
		},
        retrieveByPatientId: function(patientId) {
            return Objetive.findAll({where: {PATIENT_ID: patientId}});
        },
		retrieveByPatientIdLastWeek: function(patientId) {

            return Objetive.findAll({where: {PATIENT_ID: patientId}});
        },
        retrieveByPatientIdAndDate: function(patientId,date_S) {
            return Objetive.findOne({where: {PATIENT_ID: patientId,START_DATE: date_S}});
        },
		retrieveLastAdded: function(patientId) {
            return Objetive.findOne( { where:{PATIENT_ID: patientId },order: 'DATE DESC' });
        },
        retrieveByIdAndFoodHour: function(patientId,foodhour) {
            return Objetive.findOne({where: {PATIENT_ID: patientId,FOODHOUR: foodhour}});
        },
		retrieveAllByListIds: function(listIds) {
			return Objetive.findAll({where: {ID: {in: listIds}}});
		},
		retrievePagination: function(inicio, fin){
			return Objetive.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
		},
		add: function(nutritionistId,patientId, foodId, amount, foodHour,start_date,end_date) {
			return Objetive.create({
                NUTRITIONIST_ID: nutritionistId,
				PATIENT_ID: patientId,
				FOOD_ID: foodId,
				AMOUNT: amount,
                FOODHOUR: foodHour,
				START_DATE: start_date,
                END_DATE: end_date,
				COMPLETED: 0,
				PROGRESS: 0
			});
		},
		updateProgress: function (objetive_id) {
            return Objetive.update({
                PROGRESS: this.progress
            }, { where: {ID: objetive_id} });
        },
		updateComplete: function (objetive_id) {
            return Objetive.update({
                COMPLETED: this.completed
            }, { where: {ID: objetive_id} });
        },
		updateProgressAndComplete: function (objetive_id) {
            return Objetive.update({
                PROGRESS: this.progress,
                COMPLETED: this.completed
            }, { where: {ID: objetive_id} });
        },
        removeById: function(food_registry_id){
            return Objetive.destroy({ where: {ID: food_registry_id} });
        }
	},
	freezeTableName: true
});

module.exports = Objetive;