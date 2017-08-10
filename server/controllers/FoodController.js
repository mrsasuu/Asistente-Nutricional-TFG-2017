var express = require('express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/static/upload'});
var fs = require('fs');
var path = require('path');
var moment = require('moment');

var Utils = require('../utils/Util');
var Food = require('../models/Food');
var ContentInformation = require('../models/ContentInformation');
var Image = require('../models/Image');
var AltImage = require('../models/AltImage');
var Video = require('../models/Video');

// Constructor for ContentController
function FoodController(json, activityLogC) {
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
FoodController.prototype.initFrontend = function() {
    var self = this;
};

// Method for initBackend
FoodController.prototype.initBackend = function() {
    var self = this;

    self.routerBackend.route('/').get(function(req, res) {
        self.renderJson.breadcrumb = { 'LINK': '/backend/foods/', 'SECTION': 'Alimentos' };
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {
            var foods = Food.build();

            foods.retrieveAll().then(function(result) {
                self.renderJson.foods = result;

                res.render('pages/backend/food', self.renderJson);
                self.clearMessages();
            }, function(error) {
                self.renderJson.error = 'Se ha producido un error interno recuperando los alimentos';
                res.redirect('/backend');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/add').post(upload.array('add_photo_food', 4), function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {
            var name_food = req.body.add_name_food;
            var proteins_food = req.body.add_proteins_food;
            var carbon_hydrates_food = req.body.add_carbon_hydrates_food;
            var lipids_food = req.body.add_lipids_food;
            var kcal = req.body.add_kcal_table;
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
            var minamount = req.body.add_min_amount_table;
            var medamount = req.body.add_med_amount_table;
            var maxamount = req.body.add_max_amount_table;
            var photo_food = '/static/img/img_not_available.png';
            var min_photo_food = '/static/img/img_not_available.png';
            var med_photo_food = '/static/img/img_not_available.png';
            var max_photo_food = '/static/img/img_not_available.png';

            // Check if there's files to upload
            if(req.files.length > 0) {
                var file = Utils.normalizeStr(req.files[0].originalname);
                var file2 = Utils.normalizeStr(req.files[1].originalname);
                var file3 = Utils.normalizeStr(req.files[2].originalname);
                var file4 = Utils.normalizeStr(req.files[3].originalname);

                var extension = '.'+file.substr(file.lastIndexOf('.')+1);
                var extension2 = '.'+file2.substr(file2.lastIndexOf('.')+1);
                var extension3 = '.'+file3.substr(file3.lastIndexOf('.')+1);
                var extension4 = '.'+file4.substr(file4.lastIndexOf('.')+1);

                file = file.split('.').splice(0,1).join('.');
                file2 = file2.split('.').splice(0,1).join('.');
                file3 = file3.split('.').splice(0,1).join('.');
                file4 = file4.split('.').splice(0,1).join('.');

                var dst = self.uploadimgpath + file + extension;
                var dst2 = self.uploadimgpath + file2 + extension2;
                var dst3 = self.uploadimgpath + file3 + extension3;
                var dst4 = self.uploadimgpath + file4 + extension4;


                // Check if the file exist. If there's an error it doesn't exist
                try {
                    fs.accessSync(dst, fs.F_OK);
                    fs.accessSync(dst2, fs.F_OK);
                    fs.accessSync(dst3, fs.F_OK);
                    fs.accessSync(dst4, fs.F_OK);


                    file += Date.now();
                    file += extension;

                    file2 += Date.now();
                    file2 += extension2;

                    file3 += Date.now();
                    file3 += extension3;

                    file4 += Date.now();
                    file4 += extension4;
                } catch(e) {		// File not found
                    file += extension;
                    file2 += extension2;
                    file3 += extension3;
                    file4 += extension4;
                }

                dst = self.uploadimgpath + file;
                dst2 = self.uploadimgpath + file2;
                dst3 = self.uploadimgpath + file3;
                dst4 = self.uploadimgpath + file4;

                var tmp = self.uploadpath+req.files[0].filename;
                var tmp2 = self.uploadpath+req.files[1].filename;
                var tmp3 = self.uploadpath+req.files[2].filename;
                var tmp4 = self.uploadpath+req.files[3].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));
                fs.createReadStream(tmp2).pipe(fs.createWriteStream(dst2));
                fs.createReadStream(tmp3).pipe(fs.createWriteStream(dst3));
                fs.createReadStream(tmp4).pipe(fs.createWriteStream(dst4));

                // Delete created tmp file
                fs.unlink(tmp, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Delete created tmp file
                fs.unlink(tmp2, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp2);
                });

                // Delete created tmp file
                fs.unlink(tmp3, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp3);
                });

                // Delete created tmp file
                fs.unlink(tmp4, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp4);
                });

                // Path to the file, to be sabed in DB
                photo_food = '/static/img/foods/' + file;
                min_photo_food = '/static/img/foods/' + file2;
                med_photo_food = '/static/img/foods/' + file3;
                max_photo_food = '/static/img/foods/' + file4;
            }

            var food = Food.build();

            food.add(
                name_food,
                photo_food,
                min_photo_food,
                med_photo_food,
                max_photo_food,
                proteins_food,
                carbon_hydrates_food,
                lipids_food,
                kcal,
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
                saturated,
                minamount,
                medamount,
                maxamount

            ).then(function(result) {
                self.renderJson.msg = 'Alimento añadido correctamente';

                // Add the event to a new Activity Log
                var ct = "Inserción";
                var desc = "Se ha añadido el alimento " + name_food;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/foods');
            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/foods');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/edit').post(upload.array('edit_photo_food', 4), function (req, res) {
        self.renderJson.user = req.session.user;

        if (typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {
            var food = Food.build();

            var id_food = req.body.edit_id_food;

            food.name = req.body.edit_name_food;
            food.proteins = req.body.edit_proteins_food;
            food.carbon_hydrates = req.body.edit_carbon_hydrates_food;
            food.lipids = req.body.edit_lipids_food;
            food.photo = req.body.edit_photo_anterior_food[0];
            food.min_photo = req.body.edit_photo_anterior_food[1];
            food.med_photo = req.body.edit_photo_anterior_food[2];
            food.max_photo = req.body.edit_photo_anterior_food[3];
            food.kcal = req.body.edit_kcal_table;
            food.v_a = req.body.edit_v_a_table;
            food.v_c = req.body.edit_v_c_table;
            food.v_d = req.body.edit_v_d_table;
            food.v_e = req.body.edit_v_e_table;
            food.calcium = req.body.edit_calcium_table;
            food.iron = req.body.edit_iron_table;
            food.magnesium = req.body.edit_magnesium_table;
            food.phosphorus = req.body.edit_phosphorus_table;
            food.sodium = req.body.edit_sodium_table;
            food.cholesterol = req.body.edit_cholesterol_table;
            food.saturated = req.body.edit_saturated_table;
            food.potassium = req.body.edit_potassium_table;
            food.minamount = req.body.edit_min_amount_table;
            food.medamount = req.body.edit_med_amount_table;
            food.maxamount = req.body.edit_max_amount_table;



            // Check if there're files to upload
            if (req.files.length > 0) {
                var file = Utils.normalizeStr(req.files[0].originalname);
                var extension = '.' + file.substr(file.lastIndexOf('.') + 1);

                file = file.split('.').splice(0, 1).join('.');
                var dst = self.uploadimgpath + file + extension;

                // Check if the file exist. If there's an error it doesn't exist
                try {
                    fs.accessSync(dst, fs.F_OK);

                    file += Date.now();
                    file += extension;
                } catch (e) { 			// File not found
                    file += extension;
                }

                dst = self.uploadimgpath + file;

                var tmp = self.uploadpath + req.files[0].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                // Delete created tmp file.
                fs.unlink(tmp, function (error) {
                    if (error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Path to the file, to be sabed in DB
                food.photo = '/static/img/foods/' + file;

                if (req.files.length > 1) {
                    var file2 = Utils.normalizeStr(req.files[1].originalname);
                    var extension2 = '.' + file2.substr(file2.lastIndexOf('.') + 1);

                    file2 = file2.split('.').splice(0, 1).join('.');
                    var dst2 = self.uploadimgpath + file2 + extension2;

                    // Check if the file exist. If there's an error it doesn't exist
                    try {
                        fs.accessSync(dst2, fs.F_OK);

                        file2 += Date.now();
                        file2 += extension2;
                    } catch (e) { 			// File not found
                        file2 += extension2;
                    }

                    dst2 = self.uploadimgpath + file2;

                    var tmp2 = self.uploadpath + req.files[1].filename;

                    fs.createReadStream(tmp2).pipe(fs.createWriteStream(dst2));

                    // Delete created tmp file.
                    fs.unlink(tmp2, function (error) {
                        if (error)
                            console.log(error);
                        else
                            console.log('successfully deleted ' + tmp2);
                    });

                    // Path to the file, to be sabed in DB
                    food.min_photo = '/static/img/foods/' + file2;

                    if (req.files.length > 2) {
                        var file3 = Utils.normalizeStr(req.files[2].originalname);
                        var extension3 = '.' + file3.substr(file3.lastIndexOf('.') + 1);

                        file3 = file3.split('.').splice(0, 1).join('.');
                        var dst3 = self.uploadimgpath + file3 + extension3;

                        // Check if the file exist. If there's an error it doesn't exist
                        try {
                            fs.accessSync(dst3, fs.F_OK);

                            file3 += Date.now();
                            file3 += extension3;
                        } catch (e) { 			// File not found
                            file3 += extension3;
                        }

                        dst3 = self.uploadimgpath + file3;

                        var tmp3 = self.uploadpath + req.files[2].filename;

                        fs.createReadStream(tmp3).pipe(fs.createWriteStream(dst3));

                        // Delete created tmp file.
                        fs.unlink(tmp3, function (error) {
                            if (error)
                                console.log(error);
                            else
                                console.log('successfully deleted ' + tmp3);
                        });

                        // Path to the file, to be sabed in DB
                        food.med_photo = '/static/img/foods/' + file3;


                        if (req.files.length > 3) {
                            var file4 = Utils.normalizeStr(req.files[3].originalname);
                            var extension4 = '.' + file4.substr(file4.lastIndexOf('.') + 1);

                            file4 = file4.split('.').splice(0, 1).join('.');
                            var dst4 = self.uploadimgpath + file4 + extension4;

                            // Check if the file exist. If there's an error it doesn't exist
                            try {
                                fs.accessSync(dst4, fs.F_OK);

                                file4 += Date.now();
                                file4 += extension4;
                            } catch (e) { 			// File not found
                                file4 += extension4;
                            }

                            dst4 = self.uploadimgpath + file4;

                            var tmp4 = self.uploadpath + req.files[3].filename;

                            fs.createReadStream(tmp4).pipe(fs.createWriteStream(dst4));

                            // Delete created tmp file.
                            fs.unlink(tmp4, function (error) {
                                if (error)
                                    console.log(error);
                                else
                                    console.log('successfully deleted ' + tmp4);
                            });

                            // Path to the file, to be sabed in DB
                            food.max_photo = '/static/img/foods/' + file4;
                        }
                    }


                }
            }

            food.updateById(id_food).then(function (result) {
                self.renderJson.msg = 'Se ha editado correctamente';

                // Add the event to a new Activity Log
                var ct = "Edición";
                var desc = "Se ha editado el alimento " + food.name + food.ID;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/foods');
            }, function (error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/foods');
            });

        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/delete').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined' && parseInt(self.renderJson.user.ADMIN)) {
            var id_food = req.body.delete_id_food;
            var delete_food = req.body.delete_food;

            if(delete_food === 'yes') {
                var food = Food.build();

                // Get the user to get the photo to delete
                food.retrieveById(id_food).then(function(result) {
                    // delete the photo
                    if(result.PHOTO !== '/static/img/img_not_available.png') {
                        var dst = path.join(__dirname, '..', 'public') + result.PHOTO;

                        fs.unlink(dst, function(error) {
                            if(error)
                                console.log(error);
                            else
                                console.log('successfully deleted ' + dst);
                        });
                    }
                    if(result.MIN_PHOTO !== '/static/img/img_not_available.png') {
                        var dst = path.join(__dirname, '..', 'public') + result.MIN_PHOTO;

                        fs.unlink(dst, function(error) {
                            if(error)
                                console.log(error);
                            else
                                console.log('successfully deleted ' + dst);
                        });
                    }
                    if(result.MED_PHOTO !== '/static/img/img_not_available.png') {
                        var dst = path.join(__dirname, '..', 'public') + result.MED_PHOTO;

                        fs.unlink(dst, function(error) {
                            if(error)
                                console.log(error);
                            else
                                console.log('successfully deleted ' + dst);
                        });
                    }
                    if(result.MAX_PHOTO !== '/static/img/img_not_available.png') {
                        var dst = path.join(__dirname, '..', 'public') + result.MAX_PHOTO;

                        fs.unlink(dst, function(error) {
                            if(error)
                                console.log(error);
                            else
                                console.log('successfully deleted ' + dst);
                        });
                    }

                    var deleted_food = Food.build();

                    deleted_food.removeById(id_food).then(function(result) {
                        self.renderJson.msg = 'Se ha eliminado correctamente';

                        // Add the event to a new Activity Log
                        var ct = "Borrado";
                        var desc = "Se ha eliminado el alimento con ID " + id_food;
                        var date = new Date();
                        var uid = self.renderJson.user.ID;
                        self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                        res.redirect('/backend/foods');
                    }, function(err) {
                        self.renderJson.error = 'Se ha producido un error interno borrando al usuario';
                        res.redirect('/backend/foods');
                    });
                }, function(err) {
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/foods');
                });
            }
            else {
                self.renderJson.error = 'No se ha efectuado su acción';
                res.redirect('/backend/foods');
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
FoodController.prototype.getRouterBackend = function() {
    return this.routerBackend;
};

// Get the Frontend router
FoodController.prototype.getRouterFrontend = function() {
    return this.routerFrontend;
};

// Get a Content Type by its ID
FoodController.prototype.getContentById = function(id) {
    var content = Content.build();

    return content.retrieveById(id);
};

// Get all the Content Types by their IDs
FoodController.prototype.getAllContentWidthIds = function(listIds) {
    var content = Content.build();

    return content.retrieveAllByListIds(listIds);
};

// Clear all the messages
FoodController.prototype.clearMessages = function() {
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

module.exports = FoodController;