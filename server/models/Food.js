var crypto = require('crypto');

var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Exporto una funcion anonima
var Food = DBConnector.connectAN().define('FOOD', {
        ID: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        NAME: { type: Sequelize.STRING(200), allowNull: false },
        PHOTO: {type: Sequelize.STRING(500), allowNull: true},
        PROTEINS: { type: Sequelize.INTEGER, allowNull: false },
        CARBON_HYDRATES: { type: Sequelize.INTEGER, allowNull: false },
        LIPIDS: { type: Sequelize.INTEGER, allowNull: false },
    },
    {
        instanceMethods: {
            retrieveById: function(id) {
                return Food.findOne({ where: { ID: id } });
            },
            retrieveAllByListIds: function(listIds) {
                return Food.findAll({ where: { ID: { in: listIds } } });
            },retrieveAll: function() {
                return Food.findAll();
            },
            retrievePagination: function(inicio, fin){
                return Food.findAll({order: 'ID DESC', offset: parseInt(inicio) - 1, limit: parseInt(fin) });
            },
            retrieveLastAdded: function() {
                return Food.findOne( { order: 'ID DESC' });
            },
            add: function(proteins, carbon_hydrates, name, lipids, photo) {
                var shasum = crypto.createHash('sha1');
                shasum.update(carbon_hydrates);
                carbon_hydrates = shasum.digest('hex');

                return Food.create({
                    PROTEINS: proteins,
                    CARBON_HYDRATES: carbon_hydrates,
                    NAME: name,
                    SURNAME: lipids,
                    PHOTO: photo
                });
            },
            updateById: function(user_id){
                return Food.update({
                    PROTEINS: this.proteins,
                    CARBON_HYDRATES: this.carbon_hydrates,
                    NAME: this.name,
                    LIPIDS: this.lipids,
                    PHOTO: this.photo,
                }, { where: {ID: user_id} });
            },
            removeById: function(user_id){
                return Food.update({ where: {ID: user_id} });
            }
        },
        freezeTableName: true,
    });

module.exports = Food;