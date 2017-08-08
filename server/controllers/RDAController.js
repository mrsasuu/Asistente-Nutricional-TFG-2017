var express = require('express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/static/upload'});
var fs = require('fs');
var path = require('path');
var moment = require('moment');

var Utils = require('../utils/Util');
var RDA = require('../models/RDA');
var RDATable = require('../models/RDATable');
var ContentInformation = require('../models/ContentInformation');
var Image = require('../models/Image');
var AltImage = require('../models/AltImage');
var Video = require('../models/Video');

// Constructor for ContentController
function RDAController(json, activityLogC) {
    this.renderJson = json;

   /* this.uploadpath = path.join(__dirname, '..', 'public', 'static', 'upload') + '/';
    this.uploadimgpath = path.join(__dirname, '..', 'public', 'static', 'img', 'content_images') + '/';
    //this.uploadvideopath = path.join(__dirname, '..', 'public', 'static', 'video', 'content_videos') + '/';
    //this.uploadsubtitlepath = path.join(__dirname, '..', 'public', 'static', 'video', 'content_videos_subtitles') + '/';*/

    this.uploadpath = path.join(__dirname, '..', 'public', 'static', 'upload') +'/';
    this.uploadimgpath = path.join(__dirname, '..', 'public', 'static', 'img', 'foods')+'/';

    this.activityLogController = activityLogC;

    /*this.contentTypeController = contentTypeC;
    this.localizationController = localizationC;
    this.langController = langC;
*/
    this.routerBackend = express.Router();
    //this.routerFrontend = express.Router();
    this.initBackend();
}

// Method for initFrontend
RDAController.prototype.initFrontend = function() {
    var self = this;
};

// Method for initBackend
RDAController.prototype.initBackend = function() {
    var self = this;

    self.routerBackend.route('/').get(function(req, res) {
        self.renderJson.breadcrumb = { 'LINK': '/backend/rda/', 'SECTION': 'Tablas cantidades recomendadas' };
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var rdas = RDA.build();

            rdas.retrieveAll(self.renderJson.user.ID).then(function(result) {
                self.renderJson.rdas = result;

                res.render('pages/backend/rda', self.renderJson);
                self.clearMessages();
            }, function(error) {
                self.renderJson.error = 'Se ha producido un error interno recuperando las tablas de recomendaciones diarias.';
                console.log(error);
                res.redirect('/backend');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/add').post(upload.array('add_photo_food', 1), function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var nutritionist_id = self.renderJson.user.ID;

            var name = req.body.add_name_rda;
            var min_age = req.body.add_min_age_table;
            var max_age = req.body.add_max_age_table;
            var activity_level = req.body.add_activity_level_table;
            var gender = req.body.add_gender_table;

            var kcal = req.body.add_kcal_table;
            var proteins = req.body.add_proteins_table;
            var lipids = req.body.add_lipids_table;
            var carbon_hydrates = req.body.add_carbon_hydrates_table;
            var percentage_proteins = req.body.add_percentage_proteins_table;
            var percentage_lipids = req.body.add_percentage_lipids_table;
            var percentage_carbon_hydrates = req.body.add_percentage_carbon_hydrates_table;
            var v_a = req.body.add_v_a_table;
            var v_c = req.body.add_v_c_table;
            var v_d = req.body.add_v_d_table;
            var v_e = req.body.add_v_e_table;
            var calcium = req.body.add_calcium_table;
            var iron = req.body.add_iron_table;
            var magnesium = req.body.add_magnesium_table;
            var phosphorus = req.body.add_phosphorus_table;
            var sodium = req.body.add_sodium_table;
            var cholesterol = req.body.add_cholesterol_table;
            var saturated = req.body.add_saturated_table;
            var potassium = req.body.add_potassium_table;



            var rda = RDA.build();
            var rdaTable = RDATable.build();

            rdaTable.add(
                kcal,
                proteins,
                lipids,
                carbon_hydrates,
                percentage_proteins,
                percentage_lipids,
                percentage_carbon_hydrates,
                v_a,
                v_c,
                v_d,
                v_e,
                calcium,
                iron,
                magnesium,
                phosphorus,
                potassium,
                sodium,
                cholesterol,
                saturated
            ).then(function(result) {
                self.renderJson.msg = 'Tabla añadida correctamente';

                // Add the event to a new Activity Log
                var ct = "Inserción";
                var desc = "Se ha añadido la tabla " + result.TABLE_ID;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                rda.add(
                    self.renderJson.user.ID,
                    result.TABLE_ID,
                    name,
                    min_age,
                    max_age,
                    gender,
                    activity_level
                ).then(function(result2) {
                    self.renderJson.msg = 'CDR añadida correctamente';

                    // Add the event to a new Activity Log
                    var ct = "Inserción";
                    var desc = "Se ha añadido la tabla CDR " + result2.ID;
                    var date = new Date();
                    var uid = self.renderJson.user.ID;
                    self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                    res.redirect('/backend/rda');
                }, function(error) {
                    console.log(error);
                    self.renderJson.error = 'Se ha producido un error interno insertando la tabla CDR';
                    res.redirect('/backend/rda');
                });

                res.redirect('/backend/rda');
            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno con la tabla de datos';
                res.redirect('/backend/rda');
            });

        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/get').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var id_rda = req.body.id_rda;





            var rda = RDA.build();
            var rdaTable = RDATable.build();



            rda.retrieveById(id_rda).then(function(result) {



                rdaTable.retrieveById(result.TABLE_ID).then(function(result2) {



                    var response ={
                        NAME: result.NAME,
                        MIN_AGE: result.MIN_AGE_RANGE,
                        MAX_AGE: result.MAX_AGE_RANGE,
                        GENDER: result.GENDER,
                        ACTIVITY_LEVEL: result.ACTIVITY_LEVEL,

                        KCAL: result2.KCAL,
                        PROTEINS: result2.PROTEINS,
                        LIPIDS: result2.LIPIDS,
                        CARBON_HYDRATES: result2.CARBON_HYDRATES,
                        PROTEINS_PERCENTAGE: result2.PROTEINS_PERCENTAGE,
                        LIPIDS_PERCENTAGE: result2.LIPIDS_PERCENTAGE,
                        CARBON_HYDRATES_PERCENTAGE: result2.CARBON_HYDRATES_PERCENTAGE,
                        V_A: result2.V_A,
                        V_D: result2.V_D,
                        V_E: result2.V_E,
                        V_C: result2.V_C,
                        CALCIUM: result2.CALCIUM,
                        IRON: result2.IRON,
                        MAGNESIUM: result2.MAGNESIUM,
                        PHOSPHORUS: result2.PHOSPHORUS,
                        POTASSIUM: result2.POTASSIUM,
                        SODIUM: result2.SODIUM,
                        CHOLESTEROL: result2.CHOLESTEROL,
                        SATURATED: result2.SATURATED
                    };

                    res.json(response);


                }, function(err) {
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/rda');
                });

            }, function(err) {
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/rda');
            });

        }
        else
            res.redirect('/');
    });


    self.routerBackend.route('/edit').post(upload.array('edit_photo_food', 1), function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var rda = RDA.build();
            var rdaTable = RDATable.build();

            var rda_id = req.body.edit_id_rda;

            rda.NUTRITIONIST_ID = self.renderJson.user.ID;
            rda.NAME = req.body.edit_name_rda;
            rda.MIN_AGE_RANGE = req.body.edit_min_age_range_rda;
            rda.MAX_AGE_RANGE = req.body.edit_max_age_range_rda;
            rda.GENDER = req.body.edit_gender_rda;
            rda.ACTIVITY_LEVEL = req.body.edit_activity_level_rda;

            rdaTable.KCAL = req.body.edit_kcal_table;
            rdaTable.PROTEINS = req.body.edit_proteins_table;
            rdaTable.LIPIDS = req.body.edit_lipids_table;
            rdaTable.CARBON_HYDRATES = req.body.edit_carbon_hydrates_table;
            rdaTable.PROTEINS_PERCENTAGE = req.body.edit_percentage_proteins_table;
            rdaTable.LIPIDS_PERCENTAGE = req.body.edit_percentage_lipids_table;
            rdaTable.CARBON_HYDRATES_PERCENTAGE = req.body.edit_percentage_carbon_hydrates_table;
            rdaTable.V_A = req.body.edit_v_a_table;
            rdaTable.V_D = req.body.edit_v_d_table;
            rdaTable.V_E = req.body.edit_v_e_table;
            rdaTable.V_C = req.body.edit_v_c_table;
            rdaTable.CALCIUM = req.body.edit_calcium_table;
            rdaTable.IRON = req.body.edit_iron_table;
            rdaTable.MAGNESIUM = req.body.edit_magnesium_table;
            rdaTable.POTASSIUM = req.body.edit_potassium_table;
            rdaTable.PHOSPHORUS = req.body.edit_phosphorus_table;
            rdaTable.SODIUM = req.body.edit_sodium_table;
            rdaTable.CHOLESTEROL = req.body.edit_cholesterol_table;
            rdaTable.SATURATED = req.body.edit_saturated_table;





            rda.updateById(rda_id).then(function(result) {

                console.log("Se h actualizado y la tabla asociada es: " + result.TABLE_ID);

                rda.retrieveById(rda_id).then(function(result2) {

                    console.log("Se h actualizado y la tabla asociada2 es: " + result2.TABLE_ID);

                    rdaTable.updateById(result2.TABLE_ID).then(function(result3) {
                        self.renderJson.msg = 'Se ha editado correctamente';
                        res.redirect('/backend/rda');
                    }, function(error) {
                        console.log(error);
                        self.renderJson.error = 'Se ha producido un error interno';
                        res.redirect('/backend/rda');
                    });

                }, function(error) {
                    console.log(error);
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/rda');
                });

                rdaTable.updateById(result.TABLE_ID).then(function(result2) {
                    self.renderJson.msg = 'Se ha editado correctamente';
                    res.redirect('/backend/rda');
                }, function(error) {
                    console.log(error);
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/rda');
                });

            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/rda');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/delete').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var id_rda = req.body.delete_id_rda;
            var delete_rda = req.body.delete_rda;

            if(delete_rda === 'yes') {
                var rda = RDA.build();
                var rdaTable = RDA.build();

                var table_id;

                // Get the user to get the photo to delete
                rda.retrieveById(id_rda).then(function(result) {

                    table_id = result.TABLE_ID;

                    var deleted_rda = RDA.build();

                    deleted_rda.removeById(id_rda).then(function(result) {
                        self.renderJson.msg = 'Se ha eliminado correctamente el RDA';

                        var deleted_table_rda = RDATable.build();

                        deleted_table_rda.removeById(table_id).then(function(result) {
                            self.renderJson.msg = 'Se ha eliminado correctamente la tabla';

                            res.redirect('/backend/rda');
                        }, function(err) {
                            self.renderJson.error = 'Se ha producido un error interno borrando la tabla de datos';
                            res.redirect('/backend/rda');
                        });
                    }, function(err) {
                        self.renderJson.error = 'Se ha producido un error interno';
                        res.redirect('/backend/rda');
                    });

                    }, function(err) {
                        self.renderJson.error = 'Se ha producido un error interno borrando el CDR';
                        res.redirect('/backend/rda');
                    });
                }
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/image/add/:contentId').post(upload.array('content_image', 1), function(req, res) {
        console.log('IMAGE ADD');

        var contentId = req.params.contentId;

        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {

            // Check if there's files to upload
            if(req.files.length > 0) {
                var file = Utils.normalizeStr(req.files[0].originalname);
                var extension = '.'+file.substr(file.lastIndexOf('.')+1);

                file = file.split('.').splice(0,1).join('.');

                var dst = self.uploadimgpath + file + extension;

                // Check if the file exist. If there's an error it doesn't exist
                try {
                    fs.accessSync(dst, fs.F_OK);

                    file += Date.now();
                    file += extension;
                } catch(e) {		// File not found
                    file += extension;
                }

                dst = self.uploadimgpath + file;

                var tmp = self.uploadpath+req.files[0].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                // Delete created tmp file
                fs.unlink(tmp, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Path to the file, to be sabed in DB
                var newImage = '/static/img/content_images/' + file;

                var altTexts = [];

                for(var key in req.body) {
                    if(key.indexOf('alt_text') > -1) {
                        var langRes = key.split('_');
                        var langId = langRes[langRes.length-1];

                        console.log(key, req.body[key]);
                        altTexts.push( {
                            alt: req.body[key],
                            lang: langId
                        });
                    }
                }

                var image = Image.build();

                image.add(newImage, contentId).then(function(success) {
                    image.retrieveLast().then(function(success) {
                        var img = success;

                        var altImage = AltImage.build();

                        altImage.addSome(altTexts, img.ID).then(function(success) {
                            self.renderJson.msg = 'Imagen Añadida Correctamente';

                            // Add the event to a new Activity Log
                            var ct = "Inserción";
                            var desc = "Se ha insertado una imagen al contenido con ID " + contentId;
                            var date = new Date();
                            var uid = self.renderJson.user.ID;
                            self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                            res.redirect('/backend/contents/edit/' + contentId + '/');
                        }, function(err) {
                            self.renderJson.error = 'Error interno añadiendo los textos alternativos';

                            res.redirect('/backend/contents/edit/' + contentId + '/');
                        });
                    }, function(err) {
                        self.renderJson.error = 'Error interno recuperando información';

                        res.redirect('/backend/contents/edit/' + contentId + '/');
                    });
                }, function(err) {
                    self.renderJson.error = 'Error interno añadiendo la imagen';

                    res.redirect('/backend/contents/edit/' + contentId + '/');
                });
            }
            else {
                self.renderJson.error = 'Error mandando los archivos al servidor';

                res.redirect('/backend/contents/edit/' + contentId + '/');
            }
        }
        else {
            self.renderJson.error = 'No tiene los permisos necesarios';

            res.redirect('/backend/contents/edit/' + contentId + '/');
        }
    });

    self.routerBackend.route('/image/edit/:imageId/:contentId').post(upload.array('content_image', 1), function(req, res) {

        var contentId = req.params.contentId;

        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {
            var imageId = req.params.imageId;
            var newImage = '';

            if(req.files.length > 0) {
                var file = Utils.normalizeStr(req.files[0].originalname);
                var extension = '.'+file.substr(file.lastIndexOf('.')+1);

                file = file.split('.').splice(0,1).join('.');

                var dst = self.uploadimgpath + file + extension;

                // Check if the file exist. If there's an error it doesn't exist
                try {
                    fs.accessSync(dst, fs.F_OK);

                    file += Date.now();
                    file += extension;
                } catch(e) {		// File not found
                    file += extension;
                }

                dst = self.uploadimgpath + file;

                var tmp = self.uploadpath+req.files[0].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                // Delete created tmp file
                fs.unlink(tmp, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Path to the file, to be sabed in DB
                newImage = '/static/img/content_images/' + file;
            }

            var altTexts = [];

            for(var key in req.body) {
                if(key.indexOf('alt_text') > -1) {
                    var langRes = key.split('_');
                    var langId = langRes[langRes.length-1];

                    altTexts.push( {
                        alt: req.body[key],
                        lang: langId
                    });
                }
            }

            var altImage = AltImage.build();

            altImage.updateSome(imageId, altTexts).then(function(success) {
                if(newImage !== '') {
                    var image = Image.build();

                    image.url = newImage;

                    image.updateById(imageId).then(function(success) {
                        self.renderJson.msg = 'La imagen ha sido editada correctamente';

                        res.redirect('/backend/contents/edit/' + contentId + '/');
                    }, function(err) {
                        self.renderJson.error = 'Se ha producido un error interno editando la imagen';

                        res.redirect('/backend/contents/edit/' + contentId + '/');
                    });
                }
                else {
                    self.renderJson.msg = 'La imagen ha sido editada correctamente';

                    res.redirect('/backend/contents/edit/' + contentId + '/');
                }
            }, function(err) {
                self.renderJson.error = 'Se ha producido un error interno';

                res.redirect('/backend/contents/edit/' + contentId + '/');
            });
        }
        else {
            self.renderJson.error = 'No tiene los permisos necesarios';

            res.redirect('/backend/contents/edit/' + contentId + '/');
        }
    });

    self.routerBackend.route('/video/add/:contentId').post(upload.array('content_video', 2), function(req, res) {

        var contentId = req.params.contentId;

        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {

            var newVideo = '';
            var newSubstitle = '';

            if(req.files.length > 0) {

                var file = Utils.normalizeStr(req.files[0].originalname);
                var extension = '.'+file.substr(file.lastIndexOf('.')+1);

                file = file.split('.').splice(0,1).join('.');

                var dst = self.uploadvideopath + file + extension;

                // Check if the file exist. If there's an error it doesn't exist
                try {
                    fs.accessSync(dst, fs.F_OK);

                    file += Date.now();
                    file += extension;
                } catch(e) {		// File not found
                    file += extension;
                }

                dst = self.uploadvideopath + file;

                var tmp = self.uploadpath+req.files[0].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                // Delete created tmp file
                fs.unlink(tmp, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Path to the file, to be sabed in DB
                newVideo = '/static/video/content_videos/' + file;

                var signLang = req.body.sign_lang;

                if(typeof signLang === 'undefined') {
                    file = Utils.normalizeStr(req.files[1].originalname);
                    extension = '.'+file.substr(file.lastIndexOf('.')+1);

                    file = file.split('.').splice(0,1).join('.');

                    dst = self.uploadsubtitlepath + file + extension;

                    // Check if the file exist. If there's an error it doesn't exist
                    try {
                        fs.accessSync(dst, fs.F_OK);

                        file += Date.now();
                        file += extension;
                    } catch(e) {		// File not found
                        file += extension;
                    }

                    dst = self.uploadsubtitlepath + file;

                    tmp = self.uploadpath+req.files[1].filename;

                    fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                    // Delete created tmp file
                    fs.unlink(tmp, function(error) {
                        if(error)
                            console.log(error);
                        else
                            console.log('successfully deleted ' + tmp);
                    });

                    // Path to the file, to be sabed in DB
                    newSubstitle = '/static/video/content_videos_subtitles/' + file;
                }

                var altText = {};

                if(typeof signLang !== 'undefined' && signLang === 'on') {
                    altText.langId = null;
                    altText.alt = null;
                }
                else {
                    for(var key in req.body) {
                        if(key.indexOf('alt_text') > -1) {
                            var langRes = key.split('_');
                            var langId = langRes[langRes.length-1];

                            altText.alt = req.body[key];
                            altText.lang = langId;
                        }
                    }
                }

                var video = Video.build();

                video.add(newVideo, newSubstitle, altText.alt, contentId, altText.lang).then(function(success) {
                    self.renderJson.msg = 'Video Añadido Correctamente';

                    // Add the event to a new Activity Log
                    var ct = "Inserción";
                    var desc = "Se ha insertado un video al contenido con ID " + contentId;
                    var date = new Date();
                    var uid = self.renderJson.user.ID;
                    self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                    res.redirect('/backend/contents/edit/' + contentId + '/');
                }, function(err) {
                    self.renderJson.error = 'Error añadiendo el video';

                    res.redirect('/backend/contents/edit/' + contentId + '/');
                });
            }
            else {
                self.renderJson.error = 'Error mandando los archivos al servidor';

                res.redirect('/backend/contents/edit/' + contentId + '/');
            }

        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/video/edit/:videoId/:contentId').post(upload.array('content_video', 2), function(req, res) {

        var videoId = req.params.videoId;
        var contentId = req.params.contentId;

        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {
            var newVideo = '';
            var newSubstitle = '';

            var signLang = req.body.sign_lang;

            console.log('body', req.body);
            console.log('files', req.files);

            if(req.files.length > 0) {
                var file = Utils.normalizeStr(req.files[0].originalname);
                var extension = '.'+file.substr(file.lastIndexOf('.')+1);

                file = file.split('.').splice(0,1).join('.');

                var dst = self.uploadvideopath + file + extension;

                // Check if the file exist. If there's an error it doesn't exist
                try {
                    fs.accessSync(dst, fs.F_OK);

                    file += Date.now();
                    file += extension;
                } catch(e) {		// File not found
                    file += extension;
                }

                dst = self.uploadvideopath + file;

                var tmp = self.uploadpath+req.files[0].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                // Delete created tmp file
                fs.unlink(tmp, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Path to the file, to be sabed in DB
                newVideo = '/static/video/content_videos/' + file;

                if(typeof signLang === 'undefined' && typeof(req.files[1]) !== 'undefined') {
                    file = Utils.normalizeStr(req.files[1].originalname);
                    extension = '.'+file.substr(file.lastIndexOf('.')+1);

                    file = file.split('.').splice(0,1).join('.');

                    dst = self.uploadsubtitlepath + file + extension;

                    // Check if the file exist. If there's an error it doesn't exist
                    try {
                        fs.accessSync(dst, fs.F_OK);

                        file += Date.now();
                        file += extension;
                    } catch(e) {		// File not found
                        file += extension;
                    }

                    dst = self.uploadsubtitlepath + file;

                    tmp = self.uploadpath+req.files[1].filename;

                    fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                    // Delete created tmp file
                    fs.unlink(tmp, function(error) {
                        if(error)
                            console.log(error);
                        else
                            console.log('successfully deleted ' + tmp);
                    });

                    // Path to the file, to be sabed in DB
                    newSubstitle = '/static/video/content_videos_subtitles/' + file;
                }
            }

            var video = Video.build();

            if(newVideo === '')
                video.url = null;
            else
                video.url = newVideo;

            if(newSubstitle === '')
                video.subtitle = null;
            else
                video.subtitle = newSubstitle;

            var altText = {};

            if(typeof signLang !== 'undefined' && signLang === 'on') {
                video.altText = null;
                video.langId = null;
            }
            else {
                for(var key in req.body) {
                    if(key.indexOf('alt_text') > -1) {
                        var langRes = key.split('_');
                        var langId = langRes[langRes.length-1];

                        video.altText = req.body[key];
                        video.langId = langId;
                    }
                }
            }

            video.updateById(videoId).then(function(success) {
                self.renderJson.msg = 'Se ha editado el video correctamente';

                res.redirect('/backend/contents/edit/' + contentId + '/');
            }, function(err) {
                self.renderJson.error = 'Error editando el video';

                res.redirect('/backend/contents/edit/' + contentId + '/');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/delete').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {

            var contentId = req.body.delete_id_content;
            var delete_content = req.body.delete_content;

            if(delete_content === 'yes') {
                var image = Image.build();

                image.retrieveAllByContentId(contentId).then(function(success) {
                    var images = success;

                    var imageIds = [];
                    for(var i=0; i<images.length; i++)
                        imageIds.push(images[i].ID);

                    var altImage = AltImage.build();

                    altImage.removeByImagesIds(imageIds).then(function(success) {
                        image.removeByContentId(contentId).then(function(success) {
                            var contentInformation = ContentInformation.build();

                            contentInformation.removeByContentId(contentId).then(function(success) {
                                var content = Content.build();

                                content.removeById(contentId).then(function(success) {
                                    self.renderJson.msg = 'Contenido borrado correctamente';

                                    // Add the event to a new Activity Log
                                    var ct = "Borrado";
                                    var desc = "Se ha eliminado el contenido con ID " + contentId;
                                    var date = new Date();
                                    var uid = self.renderJson.user.ID;
                                    self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                                    res.redirect('/backend/contents');
                                }, function(err) {
                                    self.renderJson.error = 'Se ha producido un error interno borrando el contenido';

                                    res.redirect('/backend/contents');
                                });
                            }, function(err) {
                                self.renderJson.error = 'Se ha producido un error interno borrando la información del contenido';

                                res.redirect('/backend/contents');
                            });
                        }, function(err) {
                            self.renderJson.error = 'Se ha producido un error interno borrando las imágenes del contenido';

                            res.redirect('/backend/contents');
                        });
                    }, function(err) {
                        self.renderJson.error = 'Se ha producido un error interno borrando la información de las imágenes del contenido';

                        res.redirect('/backend/contents');
                    });
                }, function(err) {
                    self.renderJson.error = 'Se ha producido un error interno';

                    res.redirect('/backend/contents');
                });
            }
            else {
                self.renderJson.msg = 'No se ha efectuado su acción';

                res.redirect('/backend/contents');
            }
        }
        else
            res.redirect('/');
    });
};

// Get the Backend router
RDAController.prototype.getRouterBackend = function() {
    return this.routerBackend;
};

// Get the Frontend router
RDAController.prototype.getRouterFrontend = function() {
    return this.routerFrontend;
};

// Get a Content Type by its ID
RDAController.prototype.getContentById = function(id) {
    var content = Content.build();

    return content.retrieveById(id);
};

// Get all the Content Types by their IDs
RDAController.prototype.getAllContentWidthIds = function(listIds) {
    var content = Content.build();

    return content.retrieveAllByListIds(listIds);
};

// Clear all the messages
RDAController.prototype.clearMessages = function() {
    delete this.renderJson.msg;
    delete this.renderJson.error;
    delete this.renderJson.moreContent;

    delete this.renderJson.contents;
    delete this.renderJson.contentTypes;

    delete this.renderJson.locations;
    delete this.renderJson.contentInformations;
    delete this.renderJson.langs;

    delete this.renderJson.cont;
    delete this.renderJson.images;
    delete this.renderJson.videos;
};

module.exports = RDAController;