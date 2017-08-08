var crypto = require('crypto');

var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Exporto una funcion anonima
var RDA = DBConnector.connectAN().define('RDA', {
        ID: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        NUTRITIONIST_ID: { type: Sequelize.INTEGER, allowNull: false},
        TABLE_ID: { type: Sequelize.INTEGER, allowNull: false},
        NAME: { type: Sequelize.STRING(200), allowNull: false },
        MIN_AGE_RANGE: { type: Sequelize.INTEGER, allowNull: false},
        MAX_AGE_RANGE: { type: Sequelize.INTEGER, allowNull: false},
        GENDER: { type: Sequelize.INTEGER, allowNull: false},
        ACTIVITY_LEVEL: { type: Sequelize.INTEGER, allowNull: false},
    },
    {
        instanceMethods: {
            retrieveById: function(id) {
                return RDA.findOne({ where: { ID: id } });
            },
            retrieveAllByListIds: function(listIds) {
                return RDA.findAll({ where: { ID: { in: listIds } } });
            },retrieveAllByName: function(name) {
                return RDA.findAll({ where: { NAME: { like: name+"%" } } });
            },
            retrieveAll: function(id_Nutricionist) {
                return RDA.findAll({ where: { NUTRITIONIST_ID: id_Nutricionist } });
            },
            retrievePagination: function(inicio, fin){
                return RDA.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
            },
            retrieveLastAdded: function() {
                return RDA.findOne( { order: 'ID DESC' });
            },
            add: function(nutritionist_id, table_id, name, min_age_range, max_age_range,gender,activity_level) {

                return RDA.create({
                    NUTRITIONIST_ID: nutritionist_id,
                    TABLE_ID: table_id,
                    NAME: name,
                    MIN_AGE_RANGE: min_age_range,
                    MAX_AGE_RANGE: max_age_range,
                    GENDER: gender,
                    ACTIVITY_LEVEL: activity_level

                });
            },
            updateById: function(rda_id){
                return RDA.update({
                    NUTRITIONIST_ID: this.NUTRITIONIST_ID,
                    //TABLE_ID: this.TABLE_ID,
                    NAME: this.NAME,
                    MIN_AGE_RANGE: this.MIN_AGE_RANGE,
                    MAX_AGE_RANGE: this.MAX_AGE_RANGE,
                    GENDER: this.GENDER,
                    ACTIVITY_LEVEL: this.ACTIVITY_LEVEL
                }, { where: {ID: rda_id} });
            },
            removeById: function(rda_id){
                return RDA.destroy({ where: {ID: rda_id} });
            }
        },
        freezeTableName: true,
    });

module.exports = RDA;