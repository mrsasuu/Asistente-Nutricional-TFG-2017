var express = require('express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/static/upload'});
var fs = require('fs');
var path = require('path');
var moment = require('moment');

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


    this.uploadpath = path.join(__dirname, '..', 'public', 'static', 'upload') +'/';
    this.uploadimgpath = path.join(__dirname, '..', 'public', 'static', 'img', 'foods')+'/';

    this.activityLogController = activityLogC;


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
                        console.log(err);
                        res.redirect('/backend/patients');

                    });
                }, function(err) {
                    self.renderJson.error = 'Se ha producido un error interno';
                    console.log(err);
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
            var TIMENOW = new Date();




            foodRegister.add(
                PATIENTID,
                FOODID,
                FOODHOUR,
                DATE,
                AMOUNT,
                TIMENOW
            ).then(function(result) {
                self.renderJson.msg = 'Registro añadido correctamente';

                var objetivos = Objetive.build();

                objetivos.retrieveByPatientId(id_patient).then(function(result2) {
                    self.renderJson.msg = 'Registro añadido correctamente';

                    var date_regis = new Date(DATE).getTime();

                    var boole = false;
                    var progress;
                    var progressObj;
                    var amountObj;
                    var objId;
                    for(var i = 0; i < result2.length && !boole ; i++){

                        var min_date = new Date(result2[i].START_DATE).getTime();
                        var max_date = new Date(result2[i].END_DATE).getTime();

                        if((min_date <= date_regis) && (date_regis <= max_date)){

                            if(result2[i].FOOD_ID == FOODID){

                                boole = true;
                                objId = result2[i].ID;
                                amountObj = parseFloat(result2[i].AMOUNT);

                                progressObj = parseFloat(result2[i].PROGRESS);
                                progress = parseFloat(progressObj) + parseFloat(AMOUNT);
                            }

                        }
                    }

                    if(boole)
                    {
                        objetivos = Objetive.build();

                        if(parseFloat(progress) >= amountObj){


                            objetivos.progress = progress;
                            objetivos.completed = 1;

                            objetivos.updateProgressAndComplete(objId).then(function(result) {
                                self.renderJson.msg = 'Objetivo actualizado y completado correctamente';
                                console.log("Objetivo actualizado y completado correctamente.");

                                res.redirect('/backend/patients');
                            },function(error) {
                                console.log(error);
                                self.renderJson.error = 'Se ha producido un error actualizando el objetivo.';
                                res.redirect('/backend/patients');
                            });
                        }else {
                            objetivos.progress = progress;

                            objetivos.updateProgress(objId).then(function(result) {
                                self.renderJson.msg = 'Objetivo actualizado correctamente';
                                console.log("Objetivo actualizado correctamente.");

                                res.redirect('/backend/patients');
                            },function(error) {
                                console.log(error);
                                self.renderJson.error = 'Se ha producido un error actualizando el objetivo.';
                                res.redirect('/backend/patients');
                            });
                        }

                    }else{
                        self.renderJson.msg = 'Registro insertado correctamente';
                        console.log("Registro insertado correctamente.");
                        res.redirect('/backend/patients');
                    }

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

                var patient = Patient.build();

                patient.news = 1;

                patient.updateNews(id_patient).then(function(result2) {
                    console.log("Se han actualizado las novedades del paciente");
                    res.redirect('/backend/patients');
                }, function(error) {
                    console.log(error);
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/patients');
                });

                // Add the event to a new Activity Log
                var ct = "Inserción";
                var desc = "Se ha añadido un objetivo al paciente " + PATIENTID;
                var date = new Date();
                var uid = self.renderJson.user.ID;
                self.activityLogController.addNewActivityLog(ct, desc, date, uid);


            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });

    self.routerBackend.route('/objetive/delete').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var objetive = Objetive.build();

            var idObjetive = req.body.OBJETIVE_ID;



            console.log("Se va a eliminar un objetivo id: " + idObjetive);



            objetive.removeById(idObjetive).then(function(result) {
                self.renderJson.msg = 'Objetivo eliminado correctamente';

                var patient = Patient.build();

                patient.news = 1;

                patient.updateNews(id_patient).then(function(result2) {
                    console.log("Se han actualizado las novedades del paciente");
                    res.redirect('/backend/patients');
                }, function(error) {
                    console.log(error);
                    self.renderJson.error = 'Se ha producido un error interno';
                    res.redirect('/backend/patients');
                });

            }, function(error) {
                console.log(error);
                self.renderJson.error = 'Se ha producido un error interno';
                res.redirect('/backend/patients');
            });
        }
        else
            res.redirect('/');
    });


    self.routerBackend.route('/objetive/lastweek').post(function(req, res) {
        self.renderJson.user = req.session.user;

        if(typeof self.renderJson.user !== 'undefined') {
            var objetive = Objetive.build();

            var id_patient = req.body.patient_id;

            var weekday = getWeek(new Date(),1);
            var cont = 0;
            var num_objetives_week = 0;
            var date_s;
            var date_e;
            var date_today = new Date();


            objetive.retrieveByPatientId(id_patient).then(function(result) {

                for(var i = 0; i < result.length; i++){
                    date_s =  new Date(result[i].START_DATE);
                    date_e =  new Date(result[i].END_DATE);

                    if(getWeek(date_s,1)== getWeek(date_today,1) || getWeek(date_e,1)== getWeek(date_today,1)){
                        num_objetives_week++;

                        if(parseInt(result[i].COMPLETED) == 1){
                            cont++;
                        }
                    }
                }

                var resultLastWeek = {
                    OBJETIVES: num_objetives_week,
                    COMPLETED: cont
                };

                res.json(resultLastWeek);

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






            foodRegister.retrieveById(foodRegistryId).then(function(result) {
                var foodRegister = FoodRegister.build();

                foodRegister.removeById(foodRegistryId).then(function(result2) {

                    self.renderJson.msg = 'Se ha eliminado correctamente';


                    var objetivos = Objetive.build();

                    objetivos.retrieveByPatientId(result.PATIENTID).then(function(result3) {

                        var date_regis = new Date(result.DATE).getTime();

                        var boole = false;
                        var progress;
                        var progressObj;
                        var amountObj;
                        var objId;
                        var amountR = result.AMOUNT;
                        for(var i = 0; i < result3.length && !boole ; i++){

                            var min_date = new Date(result3[i].START_DATE).getTime();
                            var max_date = new Date(result3[i].END_DATE).getTime();

                            if((min_date <= date_regis) && (date_regis <= max_date)){

                                if(result3[i].FOOD_ID == result.FOODID){

                                    boole = true;
                                    objId = result3[i].ID;
                                    amountObj = parseFloat(result3[i].AMOUNT);

                                    progressObj = parseFloat(result3[i].PROGRESS);
                                    progress = parseFloat(progressObj) - parseFloat(amountR);
                                }

                            }
                        }

                        if(boole)
                        {
                            objetivos = Objetive.build();

                            if(parseFloat(progress) < amountObj){


                                objetivos.progress = progress;
                                objetivos.completed = 0;

                                objetivos.updateProgressAndComplete(objId).then(function(result) {
                                    self.renderJson.msg = 'Objetivo actualizado y completado correctamente';


                                    res.redirect('/backend/patients');
                                },function(error) {
                                    console.log(error);
                                    self.renderJson.error = 'Se ha producido un error actualizando el objetivo.';
                                    res.redirect('/backend/patients');
                                });
                            }else {
                                objetivos.progress = progress;

                                objetivos.updateProgress(objId).then(function(result) {
                                    self.renderJson.msg = 'Objetivo actualizado correctamente';


                                    res.redirect('/backend/patients');
                                },function(error) {
                                    console.log(error);
                                    self.renderJson.error = 'Se ha producido un error actualizando el objetivo.';
                                    res.redirect('/backend/patients');
                                });
                            }

                        }else{
                            self.renderJson.msg = 'Registro insertado correctamente';
                            console.log("Registro insertado correctamente.");
                            res.redirect('/backend/patients');
                        }

                    }, function(error) {
                        console.log(error);
                        self.renderJson.error = 'Se ha producido un error interno';
                        res.redirect('/backend/patients');
                    });




                    // Add the event to a new Activity Log
                    var ct = "Borrado";
                    var desc = "Se ha eliminado el registro con ID " + foodRegistryId;
                    var date = new Date();
                    var uid = self.renderJson.user.ID;
                    self.activityLogController.addNewActivityLog(ct, desc, date, uid);


                }, function(err) {
                    console.log("Error con: "+ foodRegistryId);
                    console.log(err);
                    self.renderJson.error = 'Se ha producido un error interno borrando al usuario';
                    res.redirect('/backend/patients');
                });

                res.redirect('/backend/patients');
            }, function(err) {
                console.log("Error buscando a: "+ foodRegistryId);
                console.log(err);
                self.renderJson.error = 'Se ha producido un error borrando al usuario';
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




            foodRegister.retrieveByPatientIdLastWeek(patientId).then(function(result) {
                var result2 = [];
                var num_elemets_b = 0;
                var num_elemets_l = 0;
                var num_elemets_ = 0;
                var dayofweeks = [];
                var breakfast = [];
                var amountB = [];
                var amountL = [];
                var amountS = [];
                var amountD = [];
                var amountO = [];
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


                                if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "DESAYUNO"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            breakfast.push(result2[j]);
                                            amountB.push(result[i].AMOUNT);

                                        }
                                    }


                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "ALMUERZO"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            lunch.push(result2[j]);
                                            amountL.push(result[i].AMOUNT);

                                        }
                                    }

                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "MERIENDA"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            snacks.push(result2[j]);
                                            amountS.push(result[i].AMOUNT);

                                        }
                                    }

                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "CENA"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            dinner.push(result2[j]);
                                            amountD.push(result[i].AMOUNT);

                                        }
                                    }

                                }else if(getWeek(newDate,1) == week_number && result[i].FOODHOUR == "OTRO"){
                                    result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            other.push(result2[j]);
                                            amountO.push(result[i].AMOUNT);

                                        }
                                    }

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
                                prot_b += (breakfast[i].PROTEINS * amountB[i]);
                                lipids_b += (breakfast[i].LIPIDS * amountB[i]);
                                gluc_b += (breakfast[i].CARBON_HYDRATES * amountB[i]);
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
                                prot_b += (lunch[i].PROTEINS * amountL[i]);
                                lipids_b += (lunch[i].LIPIDS* amountL[i]);
                                gluc_b += (lunch[i].CARBON_HYDRATES* amountL[i]);
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
                                prot_b += (snacks[i].PROTEINS * amountS[i]);
                                lipids_b += (snacks[i].LIPIDS* amountS[i]);
                                gluc_b += (snacks[i].CARBON_HYDRATES* amountS[i]);
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
                                prot_b += (dinner[i].PROTEINS * amountD[i]);
                                lipids_b += (dinner[i].LIPIDS * amountD[i]);
                                gluc_b += (dinner[i].CARBON_HYDRATES * amountD[i]);
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
                                prot_b += (other[i].PROTEINS * amountO[i]);
                                lipids_b += (other[i].LIPIDS * amountO[i]);
                                gluc_b += (other[i].CARBON_HYDRATES * amountO[i]);
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







                        }
                        else
                            res.status(401).send("Food not found");


                    }, function(error) {
                        res.status(404).send("Food not found");
                    });


                }

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



            var date_today = new Date();

            var week_number = getWeek(date_today,1);




            foodRegister.retrieveByPatientIdLastWeek(patientId).then(function(result) {
                //var result2 = [];
                var breakfast = [];
                var amounts = [];



                if(result)
                {


                    var food = Food.build();

                    food.retrieveAll().then(function(result2) {
                        if(result2){
                            for(var i  = 0; i < result.length; i++) {
                                var newDate = new Date(result[i].DATE);


                                if(newDate.getMonth() == statics_date){
                                    //result2.push(result[i]);

                                    for(var j = 0; j < result2.length; j++){
                                        if(result2[j].ID == result[i].FOODID){
                                            breakfast.push(result2[j]);
                                            amounts.push(result[i].AMOUNT);

                                        }
                                    }


                                }
                            }

                            var prot_b = 0;
                            var lipids_b = 0;
                            var gluc_b = 0;
                            var v_a = 0;
                            var v_c = 0;
                            var v_d = 0;
                            var v_e = 0;
                            var calcium = 0;
                            var iron = 0;
                            var magnesium = 0;
                            var phosphorus = 0;
                            var potassium = 0;
                            var sodium = 0;
                            var cholesterol = 0;
                            var saturated = 0;

                            //var foodHour = "DESAYUNO";
                            // var num = breakfast.length;
                            var num = new Date().getDate();


                            var kcal_b = 0;

                            for(var i = 0; i < breakfast.length; i++){
                                prot_b += (breakfast[i].PROTEINS * amounts[i]);
                                lipids_b += (breakfast[i].LIPIDS * amounts[i]);
                                gluc_b += (breakfast[i].CARBON_HYDRATES * amounts[i]);
                                v_a += (breakfast[i].V_A * amounts[i]);
                                v_c += (breakfast[i].V_C * amounts[i]);
                                v_d += (breakfast[i].V_D * amounts[i]);
                                v_e += (breakfast[i].V_E * amounts[i]);
                                calcium += (breakfast[i].CALCIUM * amounts[i]);
                                iron += (breakfast[i].IRON * amounts[i]);
                                magnesium += (breakfast[i].MAGNESIUM * amounts[i]);
                                phosphorus += (breakfast[i].PHOSPHORUS * amounts[i]);
                                potassium += (breakfast[i].POTASSIUM * amounts[i]);
                                sodium += (breakfast[i].SODIUM * amounts[i]);
                                cholesterol += (breakfast[i].CHOLESTEROL * amounts[i]);
                                saturated += (breakfast[i].SATURATED * amounts[i]);

                            }

                            if(num > 0){
                                prot_b = (prot_b)/num;
                                lipids_b = (lipids_b)/num;
                                gluc_b = (gluc_b)/num;
                                v_a = (v_a)/num;
                                v_c = (v_c)/num;
                                v_d = (v_d)/num;
                                v_e = (v_e)/num;
                                iron = (iron)/num;
                                magnesium = (magnesium)/num;
                                phosphorus = (phosphorus)/num;
                                potassium = (potassium)/num;
                                sodium = (sodium)/num;
                                cholesterol = (cholesterol)/num;
                                saturated = (saturated)/num;



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
                                    KCAL: kcal_b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    V_A: v_a.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    V_C: v_c.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    V_D: v_d.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    V_E: v_e.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    CALCIUM: calcium.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    IRON: iron.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    MAGNESIUM: magnesium.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    PHOSPHORUS: phosphorus.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    POTASSIUM: potassium.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    SODIUM: sodium.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    CHOLESTEROL: cholesterol.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                    SATURATED: saturated.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                                };

                            }





                            res.json(statics);







                        }
                        else
                            res.status(401).send("Food not found");


                    }, function(error) {
                        res.status(404).send("Food not found");
                    });


                }


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

};

// Get the Backend router
PatientController.prototype.getRouterBackend = function() {
    return this.routerBackend;
};

// Get the Frontend router
PatientController.prototype.getRouterFrontend = function() {
    return this.routerFrontend;
};



// Clear all the messages
PatientController.prototype.clearMessages = function() {
    delete this.renderJson.msg;
    delete this.renderJson.error;
};

module.exports = PatientController;