var crypto = require('crypto');

var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Exporto una funcion anonima
var RDATable = DBConnector.connectAN().define('rdatable', {
        TABLE_ID: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        KCAL: { type: Sequelize.DOUBLE, allowNull: false},
        PROTEINS: { type: Sequelize.DOUBLE, allowNull: false},
        LIPIDS: { type: Sequelize.DOUBLE, allowNull: false},
        CARBON_HYDRATES: { type: Sequelize.DOUBLE, allowNull: false},
        PROTEINS_PERCENTAGE: { type: Sequelize.DOUBLE, allowNull: false},
        LIPIDS_PERCENTAGE: { type: Sequelize.DOUBLE, allowNull: false},
        CARBON_HYDRATES_PERCENTAGE: { type: Sequelize.DOUBLE, allowNull: false},
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
    },
    {
        instanceMethods: {
            retrieveById: function(id) {
                return RDATable.findOne({ where: { TABLE_ID: id } });
            },
            retrieveAllByListIds: function(listIds) {
                return RDATable.findAll({ where: { TABLE_ID: { in: listIds } } });
            },retrieveAllByName: function(name) {
                return RDATable.findAll({ where: { NAME: { like: name+"%" } } });
            },
            retrieveAll: function() {
                return RDATable.findAll();
            },
            retrievePagination: function(inicio, fin){
                return RDATable.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
            },
            retrieveLastAdded: function() {
                return RDATable.findOne( { order: 'ID DESC' });
            },
            add: function(kcal, proteins, lipids, carbon_hydrates, proteins_percentage, lipids_percentage, carbon_hydrates_percentage, v_a, v_d, v_e, v_c, calcium, iron, magnesium, phosphorus, potassium, sodium, cholesterol, saturated) {

                return RDATable.create({
                    KCAL: kcal,
                    PROTEINS: proteins,
                    LIPIDS: lipids,
                    CARBON_HYDRATES: carbon_hydrates,
                    PROTEINS_PERCENTAGE: proteins_percentage,
                    LIPIDS_PERCENTAGE: lipids_percentage,
                    CARBON_HYDRATES_PERCENTAGE: carbon_hydrates_percentage,
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
                    SATURATED: saturated

                });
            },
            updateById: function(rdatable_id){
                return RDATable.update({
                    KCAL: this.KCAL,
                    PROTEINS: this.PROTEINS,
                    LIPIDS: this.LIPIDS,
                    CARBON_HYDRATES: this.CARBON_HYDRATES,
                    PROTEINS_PERCENTAGE: this.PROTEINS_PERCENTAGE,
                    LIPIDS_PERCENTAGE: this.LIPIDS_PERCENTAGE,
                    CARBON_HYDRATES_PERCENTAGE: this.CARBON_HYDRATES_PERCENTAGE,
                    V_A: this.V_A,
                    V_D: this.V_D,
                    V_E: this.V_E,
                    V_C: this.V_C,
                    CALCIUM: this.CALCIUM,
                    IRON: this.IRON,
                    MAGNESIUM: this.MAGNESIUM,
                    PHOSPHORUS: this.PHOSPHORUS,
                    POTASSIUM: this.POTASSIUM,
                    SODIUM: this.SODIUM,
                    CHOLESTEROL: this.CHOLESTEROL,
                    SATURATED: this.SATURATED
                }, { where: {ID: rdatable_id} });
            },
            removeById: function(rdatable_id){
                return RDATable.destroy({ where: {TABLE_ID: rdatable_id} });
            }
        },
        freezeTableName: true,
    });

module.exports = RDATable;