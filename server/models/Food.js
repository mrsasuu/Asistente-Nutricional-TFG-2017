var crypto = require('crypto');

var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Exporto una funcion anonima
var Food = DBConnector.connectAN().define('FOOD', {
        ID: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        NAME: { type: Sequelize.STRING(200), allowNull: false },
        PHOTO: {type: Sequelize.STRING(500), allowNull: false},
        MIN_PHOTO: {type: Sequelize.STRING(500), allowNull: false},
        MED_PHOTO: {type: Sequelize.STRING(500), allowNull: false},
        MAX_PHOTO: {type: Sequelize.STRING(500), allowNull: false},
        PROTEINS: { type: Sequelize.DOUBLE, allowNull: false },
        CARBON_HYDRATES: { type: Sequelize.DOUBLE, allowNull: false },
        LIPIDS: { type: Sequelize.DOUBLE, allowNull: false },
        KCAL: { type: Sequelize.DOUBLE, allowNull: false},
        V_A: { type: Sequelize.DOUBLE, allowNull: false},
        V_D: { type: Sequelize.DOUBLE, allowNull: false},
        V_E: { type: Sequelize.DOUBLE, allowNull: false},
        V_C: { type: Sequelize.DOUBLE, allowNull: false},
        CALCIUM: { type: Sequelize.DOUBLE, allowNull: false},
        IRON: { type: Sequelize.DOUBLE, allowNull: false},
        MAGNESIUM: { type: Sequelize.DOUBLE, allowNull: false},
        PHOSPHORUS: { type: Sequelize.DOUBLE, allowNull: false},
        POTASSIUM: { type: Sequelize.DOUBLE, allowNull: false},
        SODIUM: { type: Sequelize.DOUBLE, allowNull: false},
        CHOLESTEROL: { type: Sequelize.DOUBLE, allowNull: false},
        SATURATED: { type: Sequelize.DOUBLE, allowNull: false},
        MIN_AMOUNT: { type: Sequelize.DOUBLE, allowNull: false },
        MED_AMOUNT: { type: Sequelize.DOUBLE, allowNull: false },
        MAX_AMOUNT: { type: Sequelize.DOUBLE, allowNull: false },
    },
    {
        instanceMethods: {
            retrieveById: function(id) {
                return Food.findOne({ where: { ID: id } });
            },
            retrieveAllByListIds: function(listIds) {
                return Food.findAll({ where: { ID: { in: listIds } } });
            },retrieveAllByName: function(name) {
                return Food.findAll({ where: { NAME: { like: name+"%" } } });
            },
            retrieveAll: function() {
                return Food.findAll();
            },
            retrievePagination: function(inicio, fin){
                return Food.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
            },
            retrieveLastAdded: function() {
                return Food.findOne( { order: 'ID DESC' });
            },
            add: function(name, photo,minphoto,medphoto,maxphoto, proteins, carbon_hydrates, lipids,kcal,v_a, v_d, v_e, v_c, calcium, iron, magnesium, phosphorus, potassium, sodium, cholesterol, saturated,minamount,medamount,maxamount) {

                return Food.create({
                    NAME: name,
                    PHOTO: photo,
                    MIN_PHOTO: minphoto,
                    MED_PHOTO: medphoto,
                    MAX_PHOTO: maxphoto,
                    PROTEINS: proteins,
                    CARBON_HYDRATES: carbon_hydrates,
                    LIPIDS: lipids,
                    KCAL: kcal,
                    V_A: v_a,
                    V_D: v_d,
                    V_E: v_e,
                    V_C: v_c,
                    CALCIUM: calcium,
                    IRON: iron,
                    MAGNESIUM: magnesium,
                    PHOSPHORUS: phosphorus,
                    POTASSIUM: potassium,
                    SODIUM: sodium,
                    CHOLESTEROL: cholesterol,
                    SATURATED: saturated,
                    MIN_AMOUNT: minamount,
                    MED_AMOUNT: medamount,
                    MAX_AMOUNT: maxamount

                });
            },
            updateById: function(food_id){
                return Food.update({
                    NAME: this.name,
                    PHOTO: this.photo,
                    MIN_PHOTO: this.min_photo,
                    MED_PHOTO: this.med_photo,
                    MAX_PHOTO: this.max_photo,
                    PROTEINS: this.proteins,
                    CARBON_HYDRATES: this.carbon_hydrates,
                    LIPIDS: this.lipids,
                    KCAL: this.kcal,
                    V_A: this.v_a,
                    V_D: this.v_d,
                    V_E: this.v_e,
                    V_C: this.v_c,
                    CALCIUM: this.calcium,
                    IRON: this.iron,
                    MAGNESIUM: this.magnesium,
                    PHOSPHORUS: this.phosphorus,
                    POTASSIUM: this.potassium,
                    SODIUM: this.sodium,
                    CHOLESTEROL: this.cholesterol,
                    SATURATED: this.saturated,
                    MIN_AMOUNT: this.minamount,
                    MED_AMOUNT: this.medamount,
                    MAX_AMOUNT: this.maxamount
                }, { where: {ID: food_id} });
            },
            removeById: function(food_id){
                return Food.destroy({ where: {ID: food_id} });
            }
        },
        freezeTableName: true,
    });

module.exports = Food;