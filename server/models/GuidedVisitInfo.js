var Sequelize = require("sequelize");
var DBConnector = require("../utils/DBConnector");

// Export an anonymous function
var GuidedVisitInfo = DBConnector.connectAN().define('GUIDED_VISIT_INFO', {
	ID: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
	GUIDED_VISIT_ID: {type: Sequelize.INTEGER, allowNull: false },
	NAME: {type: Sequelize.STRING(100), allowNull: false },
	DESCRIPTION: {type: Sequelize.STRING(), allowNull: true },
	BLIND_DESCRIPTION: {type: Sequelize.STRING(), allowNull: false },
	PHOTO_ALT_TEXT: {type: Sequelize.STRING(), allowNull: false },
	LANG_ID: {type: Sequelize.INTEGER, allowNull: false }
},
{
	instanceMethods: {
		retrieveLast: function() {
			return GuidedVisitInfo.findOne({order: 'ID DESC'});
		},
		retrieveById: function(id) {
			return GuidedVisitInfo.findOne({where: {ID: id}});
		},
		retrieveByVisitId: function(visitId) {
			return GuidedVisitInfo.findAll({ where: {GUIDED_VISIT_ID: visitId}});
		},
		retrieveByVisitIdByLangId: function(visitId, langId) {
			return GuidedVisitInfo.findAll({ where: {GUIDED_VISIT_ID: visitId}, LANG_ID: langId});
		},
		retrieveByVisitIdList: function(visitIds) {
			return GuidedVisitInfo.findAll( {where: {GUIDED_VISIT_ID: {in: visitIds}}});
		},
		retrieveByVisitIdListByLangId: function(visitIds, langId) {
			return GuidedVisitInfo.findAll( {where: {GUIDED_VISIT_ID: {in: visitIds}, LANG_ID: langId}});
		},
		add: function(visitId, name, description, blindDescription, photoAltText, langId) {
			return GuidedVisitInfo.create({
				GUIDED_VISIT_ID: visitId,
				NAME: name,
				DESCRIPTION: description,
				BLIND_DESCRIPTION: blindDescription,
				PHOTO_ALT_TEXT: photoAltText,
				LANG_ID: langId
			});
		},
		updateById: function(id) {
			return GuidedVisitInfo.update({
				NAME: this.name,
				DESCRIPTION: this.description,
				BLIND_DESCRIPTION: this.blindDescription,
				PHOTO_ALT_TEXT: this.photoAltText,
			}, {where: {ID: id}});
		},
		deleteByVisitId: function(visitId) {
			return GuidedVisitInfo.destroy({where: {GUIDED_VISIT_ID: visitId}});
		}
	},
	freezeTableName: true
});

module.exports = GuidedVisitInfo;