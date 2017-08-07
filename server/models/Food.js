var crypto = require('crypto');

var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Exporto una funcion anonima
var Food = DBConnector.connectAN().define('FOOD', {
        ID: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        NAME: { type: Sequelize.STRING(200), allowNull: false },
        PHOTO: {type: Sequelize.STRING(500), allowNull: true},
        PROTEINS: { type: Sequelize.DOUBLE, allowNull: false },
        CARBON_HYDRATES: { type: Sequelize.DOUBLE, allowNull: false },
        LIPIDS: { type: Sequelize.DOUBLE, allowNull: false },
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
            add: function(name, photo, proteins, carbon_hydrates, lipids) {

                return Food.create({
                    NAME: name,
                    PHOTO: photo,
                    PROTEINS: proteins,
                    CARBON_HYDRATES: carbon_hydrates,
                    LIPIDS: lipids

                });
            },
            updateById: function(food_id){
                return Food.update({
                    NAME: this.name,
                    PHOTO: this.photo,
                    PROTEINS: this.proteins,
                    CARBON_HYDRATES: this.carbon_hydrates,
                    LIPIDS: this.lipids,
                }, { where: {ID: food_id} });
            },
            removeById: function(food_id){
                return Food.destroy({ where: {ID: food_id} });
            }
        },
        freezeTableName: true,
    });

module.exports = Food;