var express = require('express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/static/upload'});
var fs = require('fs');
var path = require('path');
var moment = require('moment');

var Image = require('../models/Image');
var AltImage = require('../models/AltImage');
var Video = require('../models/Video');

var Utils = require('../utils/Util');
var Patient = require('../models/Patient');
var FoodRegister = require('../models/FoodRegister');
var Objetive = require('../models/Objetive');

var Food = require("../models/Food");

function getWeek(d,dowOffset) {
    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 1; //default dowOffset to zero
    var newYear = new Date(d.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((d.getTime() - newYear.getTime() -
            (d.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(d.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
             the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
}

// Constructor for ContentController
function PatientController(json, activityLogC) {
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
PatientController.prototype.initFrontend = function() {
    var self = this;
};

// Method for initBackend
PatientController.prototype.initBackend = function() {
    var self = this;

    self.routerBackend.route('/').get(function(req, res) {
        self.renderJson.breadcrumb = { 'LINK': '/backend/patients/', 'SECTION': 'Pacientes' };
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var patients = Patient.build();

            patients.retrieveAll(self.renderJson.user.ID).then(function(result) {
                self.renderJson.patients = result;

                res.render('pages/backend/patient', self.renderJson);
                self.clearMessages();
            }, function(error) {
                self.renderJson.error = 'Se ha producido un error interno recuperando la lista de pacientes';
                res.redirect('/backend');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/add').post(upload.array('add_photo_food', 1), function(req, res) {
        self.renderJson.user = req.session.user;
        if(typeof self.renderJson.user !== 'undefined') {

            var photo_food = '/static/img/img_not_available.png';

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
                photo_food = '/static/img/foods/' + file;
            }
            var dni_patient = req.body.add_dni_patient;
            var name_patient = req.body.add_name_patient;
            var surname_patient = req.body.add_surname_patient;
            var age_patient = req.body.add_age_patient;
            var gender_patient = req.body.add_gender_patient;
            var address_patient = req.body.add_address_patient;
            var phone_patient = req.body.add_phone_patient;
            var email_patient = req.body.add_email_patient;
            var username_patient = req.body.add_username_patient;
            var password_patient = req.body.add_password_patient;
            var weight_patient = req.body.add_weight_patient;
            var height_patient = req.body.add_height_patient;
            var activity_level_patient = req.body.add_activity_level_patient;
            var nutricionist_id_patient =  self.renderJson.user.ID;


            var patient = Patient.build();


            patient.add(
                dni_patient,
                name_patient,
                surname_patient,
                age_patient,
                gender_patient,
                address_patient,
                phone_patient,
                email_patient,
                username_patient,
                password_patient,
                weight_patient,
                height_patient,
                activity_level_patient,
                nutricionist_id_patient
            ).then(function(result) {
                self.renderJson.msg = 'Paciente añadido correctamente';

                // Add the event to a new Activity Log
                var ct = "Inserción";
                var desc = "Se ha añadido el paciente " + name_patient + " " + surname_patient;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/patients');
            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/edit').post(upload.array('edit_photo_patient', 1), function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var patient = Patient.build();

            var id_patient = req.body.edit_id_patient;

            patient.name = req.body.edit_name_patient;
            patient.dni = req.body.edit_dni_patient;
            patient.age = req.body.edit_age_patient;
            patient.surname = req.body.edit_surname_patient;
            patient.gender = req.body.edit_gender_patient;
            patient.activity_level = req.body.edit_activity_level_patient;
            patient.address = req.body.edit_address_patient;
            patient.email = req.body.edit_email_patient;
            patient.phone = req.body.edit_phone_patient;
            patient.username = req.body.edit_username_patient;
            patient.password = req.body.edit_password_patient;
            patient.height = req.body.edit_height_patient;
            patient.weight = req.body.edit_weight_patient;
            patient.photo = req.body.edit_photo_anterior_patient;

            console.log(patient);

            // Check if there're files to upload
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
                } catch(e) { 			// File not found
                    file += extension;
                }

                dst = self.uploadimgpath + file;

                var tmp = self.uploadpath+req.files[0].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                // Delete created tmp file.
                fs.unlink(tmp, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Path to the file, to be sabed in DB
                patient.photo = '/static/img/foods/' + file;
            }

            patient.updateById(id_patient).then(function(result) {
                self.renderJson.msg = 'Se ha editado correctamente';

                // Add the event to a new Activity Log
                var ct = "Edición";
                var desc = "Se ha editado el paciente " + patient.name + patient.ID;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/patients');
            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/delete').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var id_patient = req.body.delete_id_patient;
            var delete_patient = req.body.delete_patient;

            if(delete_patient === 'yes') {
                var patient = Patient.build();

                // Get the user to get the photo to delete
                patient.retrieveById(id_patient).then(function(result) {

                    var deleted_patient = Patient.build();

                    deleted_patient.removeById(id_patient).then(function(result) {
                        self.renderJson.msg = 'Se ha eliminado correctamente';

                        // Add the event to a new Activity Log
                        var ct = "Borrado";
                        var desc = "Se ha eliminado el paciente con ID " + id_patient;
                        var date = new Date();
                        var uid = self.renderJson.user.ID;
                        self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                        res.redirect('/backend/patients');
                    }, function(err) {
                        self.renderJson.error = 'Se ha producido un error interno borrando al paciente';
                        res.redirect('/backend/patients');
                    });
                }, function(err) {
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/patients');
                });
            }
            else {
                self.renderJson.error = 'No se ha efectuado su acción';
                res.redirect('/backend/patients');
            }
        }
        else
            res.redirect('/');
    });

    //self.routerBackend.route('/show').post(upload.array('edit_photo_patient', 1), function(req, res) {
    self.routerBackend.route('/show').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var patient = Patient.build();

            var id_patient = req.body.id_patient;

            patient.name = req.body.edit_name_patient;
            patient.dni = req.body.edit_dni_patient;
            patient.age = req.body.edit_age_patient;
            patient.surname = req.body.edit_surname_patient;
            patient.gender = req.body.edit_gender_patient;
            patient.activity_level = req.body.edit_activity_level_patient;
            patient.address = req.body.edit_address_patient;
            patient.email = req.body.edit_email_patient;
            patient.phone = req.body.edit_phone_patient;
            patient.username = req.body.edit_username_patient;
            patient.password = req.body.edit_password_patient;
            patient.height = req.body.edit_height_patient;
            patient.weight = req.body.edit_weight_patient;
            patient.photo = req.body.edit_photo_anterior_patient;

            console.log(patient);

            // Check if there're files to upload
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
                } catch(e) { 			// File not found
                    file += extension;
                }

                dst = self.uploadimgpath + file;

                var tmp = self.uploadpath+req.files[0].filename;

                fs.createReadStream(tmp).pipe(fs.createWriteStream(dst));

                // Delete created tmp file.
                fs.unlink(tmp, function(error) {
                    if(error)
                        console.log(error);
                    else
                        console.log('successfully deleted ' + tmp);
                });

                // Path to the file, to be sabed in DB
                patient.photo = '/static/img/foods/' + file;
            }

            patient.updateById(id_patient).then(function(result) {
                self.renderJson.msg = 'Se ha editado correctamente';

                // Add the event to a new Activity Log
                var ct = "Edición";
                var desc = "Se ha editado el paciente " + patient.name + patient.ID;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/patients');
            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/food_register').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var foodRegister = FoodRegister.build();

            var id_patient = req.body.PATIENTID;

            var PATIENTID = id_patient;
            var FOODHOUR = req.body.FOODHOUR;
            var FOODID = req.body.FOODID;
            var DATE = req.body.DATE;
            var AMOUNT = req.body.AMOUNT;

            console.log(AMOUNT);



            foodRegister.add(
                PATIENTID,
                FOODID,
                FOODHOUR,
                DATE,
                AMOUNT
            ).then(function(result) {
                self.renderJson.msg = 'Registro añadido correctamente';

                var objetivos = Objetive.build();

                objetivos.retrieveByPatientId(id_patient).then(function(result2) {
                    self.renderJson.msg = 'Registro añadido correctamente';

                    var date_regis = new Date(DATE).getTime();

                    for(var i = 0; i < result2.length; i++){
                        var min_date = new Date(result2.START_DATE).getTime();
                        var max_date = new Date(result2.END_DATE).getTime();

                        if(min_date <= date_regis <= max_date){
                            var progress = parseFloat(result2.progress);

                            progress += AMOUNT;
                        }
                    }






                    // Add the event to a new Activity Log
                    var ct = "Inserción";
                    var desc = "Se ha añadido un registro al paciente " + PATIENTID;
                    var date = new Date();
                    var uid = self.renderJson.user.ID;
                    self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                    res.redirect('/backend/patients');
                }, function(error) {
                    console.log(error);
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/patients');
                });


                // Add the event to a new Activity Log
                var ct = "Inserción";
                var desc = "Se ha añadido un registro al paciente " + PATIENTID;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/patients');
            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/objetive').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var objetive = Objetive.build();

            var id_patient = req.body.PATIENTID;

            var PATIENTID = id_patient;
            var FOODHOUR = req.body.FOODHOUR;
            var FOODID = req.body.FOODID;
            var AMOUNT = req.body.AMOUNT;
            var NUTRITIONIST_ID = self.renderJson.user.ID;
            var START_DATE = req.body.START_DATE;
            var END_DATE = req.body.END_DATE;

            console.log("Se va a insertar un objetivo del paciente: " + id_patient);



            objetive.add(
                NUTRITIONIST_ID,
                PATIENTID,
                FOODID,
                AMOUNT,
                FOODHOUR,
                START_DATE,
                END_DATE
            ).then(function(result) {
                self.renderJson.msg = 'Objetivo añadido correctamente';

                // Add the event to a new Activity Log
                var ct = "Inserción";
                var desc = "Se ha añadido un objetivo al paciente " + PATIENTID;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/patients');
            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/food_register/delete').post(function(req, res) {
        self.renderJson.user = req.session.user;


        if(typeof self.renderJson.user !== 'undefined') {
            var foodRegister = FoodRegister.build();

            var foodRegistryId = req.body.REGISTRYID;




            console.log("Se quiere eliminar: "+ foodRegistryId);



            foodRegister.removeById(foodRegistryId).then(function(result) {
                console.log("Se ha eliminado: "+ foodRegistryId);
                self.renderJson.msg = 'Se ha eliminado correctamente';

                // Add the event to a new Activity Log
                var ct = "Borrado";
                var desc = "Se ha eliminado el registro con ID " + foodRegistryId;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);

                res.redirect('/backend/patients');
            }, function(err) {
                console.log("Error con: "+ foodRegistryId);
                console.log(err);
                self.renderJson.error = 'Se ha producido un error interno borrando al usuario';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/food_register/lastweek').post(function(req, res) {
        self.renderJson.user = req.session.user;


        if(typeof self.renderJson.user !== 'undefined') {
            var foodRegister = FoodRegister.build();

            var patientId = req.body.PATIENTID;

            var date_today = new Date();

            var week_number = getWeek(date_today,1);







            console.log("Se consulta: "+ patientId);



            foodRegister.retrieveByPatientIdLastWeek(patientId).then(function(result) {
                var result2 = [];
                var num_elemets_b = 0;
                var num_elemets_l = 0;
                var num_elemets_ = 0;
                var dayofweeks = [];
                var breakfast = [];
                var lunch = [];
                var snacks = [];
                var dinner = [];
                var other = [];
                var statics = [];

                if(result)
                {


                    var food = Food.build();

                    food.retrieveAll().then(function(result2) {
                        if(result2){
                            for(var i  = 0; i < result.length; i++) {
                                var newDate = new Date(result[i].DATE);
                                console.log("Semana:" + getWeek(newDate, 1));

                                if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "DESAYUNO"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            breakfast.push(result2[j]);
                                            console.log("Alimento: " + result2[j].NAME);
                                        }
                                    }
                                    console.log("Numero de elementos en el desayuno: " + breakfast.length);

                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "ALMUERZO"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            lunch.push(result2[j]);
                                            console.log("Alimento: " + result2[j].NAME);
                                        }
                                    }
                                    console.log("Numero de elementos en el almuerzo: " + lunch.length);
                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "MERIENDA"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            snacks.push(result2[j]);
                                            console.log("Alimento: " + result2[j].NAME);
                                        }
                                    }
                                    console.log("Numero de elementos en la merienda: " + snacks.length);
                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "CENA"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            dinner.push(result2[j]);
                                            console.log("Alimento: " + result2[j].NAME);
                                        }
                                    }
                                    console.log("Numero de elementos en la cena: " + dinner.length);
                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "OTRO"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            other.push(result2[j]);
                                            console.log("Alimento: " + result2[j].NAME);
                                        }
                                    }
                                    console.log("Numero de elementos en otros: " + other.length);
                                }
                            }

                            var prot_b = 0;
                            var lipids_b = 0;
                            var gluc_b = 0;
                            var foodHour = "DESAYUNO";
                           // var num = breakfast.length;
                            var num = new Date().getDay();

                            if(num == 0)
                                num=7;

                            var kcal_b = 0;

                            for(var i = 0; i < breakfast.length; i++){
                                prot_b += breakfast[i].PROTEINS;
                                lipids_b += breakfast[i].LIPIDS;
                                gluc_b += breakfast[i].CARBON_HYDRATES;
                            }

                            if(num > 0){
                                prot_b = (prot_b)/num;
                                lipids_b = (lipids_b)/num;
                                gluc_b = (gluc_b)/num;


                                kcal_b = prot_b*4 + lipids_b*9 + gluc_b*4;


                                statics.push({
                                    FOODHOUR: foodHour,
                                    PROTEINS: prot_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    LIPIDS: lipids_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    GLUCIDS: gluc_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    KCAL: kcal_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                                });

                            }

                            //Calculo de las estadisticas del almuerzo

                            prot_b = 0;
                            lipids_b = 0;
                            gluc_b = 0;
                            foodHour = "ALMUERZO";
                           // num = lunch.length;

                            kcal_b = 0;

                            for(var i = 0; i < lunch.length; i++){
                                prot_b += lunch[i].PROTEINS;
                                lipids_b += lunch[i].LIPIDS;
                                gluc_b += lunch[i].CARBON_HYDRATES;
                            }

                            if(num > 0){
                                prot_b = (prot_b)/num;
                                lipids_b = (lipids_b)/num;
                                gluc_b = (gluc_b)/num;


                                kcal_b = prot_b*4 + lipids_b*9 + gluc_b*4;


                                statics.push({
                                    FOODHOUR: foodHour,
                                    PROTEINS: prot_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    LIPIDS: lipids_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    GLUCIDS: gluc_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    KCAL: kcal_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                                });

                            }

                            //Calculo de las estadisticas de la merienda

                            prot_b = 0;
                            lipids_b = 0;
                            gluc_b = 0;
                            foodHour = "MERIENDA";
                            //num = snacks.length;

                            kcal_b = 0;

                            for(var i = 0; i < snacks.length; i++){
                                prot_b += snacks[i].PROTEINS;
                                lipids_b += snacks[i].LIPIDS;
                                gluc_b += snacks[i].CARBON_HYDRATES;
                            }

                            if(num > 0){
                                prot_b = (prot_b)/num;
                                lipids_b = (lipids_b)/num;
                                gluc_b = (gluc_b)/num;


                                kcal_b = prot_b*4 + lipids_b*9 + gluc_b*4;


                                statics.push({
                                    FOODHOUR: foodHour,
                                    PROTEINS: prot_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    LIPIDS: lipids_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    GLUCIDS: gluc_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    KCAL: kcal_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                                });

                            }

                            //Calculo de las estadisticas de la cena

                            prot_b = 0;
                            lipids_b = 0;
                            gluc_b = 0;
                            foodHour = "CENA";
                            //num = dinner.length;

                            kcal_b = 0;

                            for(var i = 0; i < dinner.length; i++){
                                prot_b += dinner[i].PROTEINS;
                                lipids_b += dinner[i].LIPIDS;
                                gluc_b += dinner[i].CARBON_HYDRATES;
                            }

                            if(num > 0){
                                prot_b = (prot_b)/num;
                                lipids_b = (lipids_b)/num;
                                gluc_b = (gluc_b)/num;


                                kcal_b = prot_b*4 + lipids_b*9 + gluc_b*4;


                                statics.push({
                                    FOODHOUR: foodHour,
                                    PROTEINS: prot_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    LIPIDS: lipids_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    GLUCIDS: gluc_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    KCAL: kcal_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                                });

                            }

                            //Calculo de las estadisticas de otros

                            prot_b = 0;
                            lipids_b = 0;
                            gluc_b = 0;
                            foodHour = "OTRO";
                            //num = other.length;

                            kcal_b = 0;

                            for(var i = 0; i < other.length; i++){
                                prot_b += other[i].PROTEINS;
                                lipids_b += other[i].LIPIDS;
                                gluc_b += other[i].CARBON_HYDRATES;
                            }

                            if(num > 0){
                                prot_b = (prot_b)/num;
                                lipids_b = (lipids_b)/num;
                                gluc_b = (gluc_b)/num;


                                kcal_b = prot_b*4 + lipids_b*9 + gluc_b*4;


                                statics.push({
                                    FOODHOUR: foodHour,
                                    PROTEINS: prot_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    LIPIDS: lipids_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    GLUCIDS: gluc_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    KCAL: kcal_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                                });

                            }



                            res.json(statics);
                            console.log(statics);






                        }
                        else
                            res.status(401).send("Food not found");


                    }, function(error) {
                        res.status(404).send("Food not found");
                    });


                }

               // console.log("Se ha eliminado: "+ foodRegistryId);
                //self.renderJson.msg = 'Se ha eliminado correctamente';

                /*// Add the event to a new Activity Log
                var ct = "Borrado";
                var desc = "Se ha eliminado el registro con ID " + foodRegistryId;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);*/

                //res.redirect('/backend/patients');
            }, function(err) {
                console.log("Error con: "+ patientId);
                console.log(err);
                self.renderJson.error = 'Se ha producido un error interno borrando al usuario';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/food_register/statics').post(function(req, res) {
        self.renderJson.user = req.session.user;


        if(typeof self.renderJson.user !== 'undefined') {
            var foodRegister = FoodRegister.build();

            var patientId = req.body.PATIENTID;
            var statics_date = req.body.statics_date;

            console.log("Mes que buscar: " + statics_date);

            var date_today = new Date();

            var week_number = getWeek(date_today,1);







            console.log("Se consulta: "+ patientId);



            foodRegister.retrieveByPatientIdLastWeek(patientId).then(function(result) {
                //var result2 = [];
                var breakfast = [];



                if(result)
                {


                    var food = Food.build();

                    food.retrieveAll().then(function(result2) {
                        if(result2){
                            for(var i  = 0; i < result.length; i++) {
                                var newDate = new Date(result[i].DATE);
                                console.log("Semana:" + getWeek(newDate, 1));

                                if(newDate.getMonth() == statics_date){
                                    //result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            breakfast.push(result2[j]);
                                            console.log("Alimento: " + result2[j].NAME);
                                        }
                                    }
                                    console.log("Numero de elementos : " + breakfast.length);

                                }
                            }

                            var prot_b = 0;
                            var lipids_b = 0;
                            var gluc_b = 0;
                            //var foodHour = "DESAYUNO";
                            // var num = breakfast.length;
                            var num = new Date().getDay();

                            if(num == 0)
                                num=7;

                            var kcal_b = 0;

                            for(var i = 0; i < breakfast.length; i++){
                                prot_b += breakfast[i].PROTEINS;
                                lipids_b += breakfast[i].LIPIDS;
                                gluc_b += breakfast[i].CARBON_HYDRATES;
                            }

                            if(num > 0){
                                prot_b = (prot_b)/num;
                                lipids_b = (lipids_b)/num;
                                gluc_b = (gluc_b)/num;


                                kcal_b = prot_b*4 + lipids_b*9 + gluc_b*4;

                                var prot_percent = 0;
                                var lipids_percent = 0;
                                var gluc_percent = 0;

                                if(kcal_b!= null && kcal_b != 0){
                                    prot_percent = ((prot_b*4)/kcal_b)*100;
                                    lipids_percent = ((lipids_b*9)/kcal_b)*100;
                                    gluc_percent = ((gluc_b*4)/kcal_b)*100;
                                }



                                var statics={
                                   // FOODHOUR: foodHour,
                                    PROTEINS: prot_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    LIPIDS: lipids_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    GLUCIDS: gluc_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    P_PERCENT: prot_percent.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    L_PERCENT: lipids_percent.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    CH_PERCENT: gluc_percent.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    KCAL: kcal_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                                };

                            }




                            console.log("Día del mes: "+date_today.getDate());
                            res.json(statics);







                        }
                        else
                            res.status(401).send("Food not found");


                    }, function(error) {
                        res.status(404).send("Food not found");
                    });


                }

                // console.log("Se ha eliminado: "+ foodRegistryId);
                //self.renderJson.msg = 'Se ha eliminado correctamente';

                /*// Add the event to a new Activity Log
                 var ct = "Borrado";
                 var desc = "Se ha eliminado el registro con ID " + foodRegistryId;
                 var date = new Date();
                 var uid = self.renderJson.user.ID;
                 self.activityLogController.addNewActivityLog(ct, desc, date, uid);*/

                //res.redirect('/backend/patients');
            }, function(err) {
                console.log("Error con: "+ patientId);
                console.log(err);
                self.renderJson.error = 'Se ha producido un error interno borrando al usuario';
                res.redirect('/backend/patients');
            });
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
PatientController.prototype.getRouterBackend = function() {
    return this.routerBackend;
};

// Get the Frontend router
PatientController.prototype.getRouterFrontend = function() {
    return this.routerFrontend;
};

// Get a Content Type by its ID
PatientController.prototype.getContentById = function(id) {
    var content = Content.build();

    return content.retrieveById(id);
};

// Get all the Content Types by their IDs
PatientController.prototype.getAllContentWidthIds = function(listIds) {
    var content = Content.build();

    return content.retrieveAllByListIds(listIds);
};

// Clear all the messages
PatientController.prototype.clearMessages = function() {
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

module.exports = PatientController;