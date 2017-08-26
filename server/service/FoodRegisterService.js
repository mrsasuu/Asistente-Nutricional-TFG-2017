var express = require("express");
var FoodRegister = require("../models/FoodRegister");
var Objetive = require('../models/Objetive');

var moment = require('moment-timezone');
moment().tz('Europe/Amsterdam').format();

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

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('');
};



// Constructor for FoodRegisterService
function FoodRegisterService() {
	this.router = express.Router();
	this.initializeRouter();
}

FoodRegisterService.prototype.initializeRouter = function() {
	var self = this;

	self.router.route('/id/:id').get(function(req, res) {
		var patient_id = req.params.id;
		console.log(patient_id);
		var foodRegister = FoodRegister.build();

		foodRegister.retrieveByPatientId(patient_id).then(function(result) {
			if(result)
				res.json(result);
			else
				res.status(401).send("Patient register Log not found");
		}, function(error) {
				res.send("No se ha podido completar su solicitud");
		});
	});

    self.router.route('/lastweek/:id').get(function(req, res) {
        var patient_id = req.params.id;
        console.log(patient_id);
        var foodRegister = FoodRegister.build();

        foodRegister.retrieveByPatientIdLastWeek(patient_id).then(function(result) {
            if(result)
                res.json(result);
            else
                res.status(401).send("Patient register Log not found");
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });
    });


    self.router.route('/sync').post(function(req, res) {
        var foodRegister = FoodRegister.build();

        var id_patient = req.body.PATIENTID;

        var PATIENTID = id_patient;
        var FOODHOUR = req.body.FOODHOUR;
        var FOODID = req.body.FOODID;
        var DATE = new Date(req.body.DATE);
        var AMOUNT = req.body.AMOUNT;
        var TIMENOW = new Date(req.body.CREATETIME);


        console.log("Tiempo consulta: " + req.body.CREATETIME + " fecha creada: " + TIMENOW + " milisegundos nueva fecha: " + TIMENOW.getTime());
        console.log("Patient: " + PATIENTID + " comida: " + FOODID + " Hora: " + FOODHOUR + " fecha: " + DATE + " amount: " + AMOUNT + " creacion: " + TIMENOW);


        foodRegister.add(
            PATIENTID,
            FOODID,
            FOODHOUR,
            DATE,
            AMOUNT,
            req.body.CREATETIME
        ).then(function(result) {
            console.log('Registro añadido correctamente');

            var objetivos = Objetive.build();

            objetivos.retrieveByPatientId(id_patient).then(function(result2) {
                console.log('Objetivos consultados correctamente');

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

                            console.log("Objetivo actualizado y completado correctamente.");

                            res.json({MSG:"Insertado con exito",TIME: new Date().getTime(), ERROR: null});
                        },function(error) {
                            console.log(error);
                            res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error en objetivos"});
                        });
                    }else {
                        objetivos.progress = progress;

                        objetivos.updateProgress(objId).then(function(result) {
                            console.log("Objetivo actualizado correctamente.");
                            res.json({MSG:"Insertado con exito",TIME: new Date().getTime(), ERROR: null});


                        },function(error) {
                            console.log(error);
                            res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error en objetivos"});
                        });
                    }

                }else{
                    console.log("Registro insertado correctamente.");
                    res.json({MSG:"Insertado con exito",TIME: new Date().getTime(), ERROR: null});
                }

            }, function(error) {
                console.log(error);
                res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error en objetivos"});
            });



        }, function(error) {
            console.log(error);
            res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error en la insercción"});
        });
    });


    self.router.route('/patient').post(function(req, res) {

        var patient_id = req.body.id;

        var foodRegister = FoodRegister.build();




        foodRegister.retrieveByPatientId(patient_id).then(function(result2) {
            var idsL = [];

            var Today = new Date();
            var msToday = Today.getTime();
            var yesterday = new Date();

            yesterday.setDate(Today.getDate()-1);
            var msYesterday= yesterday.getTime();
            var beforeyesterday = new Date();


            beforeyesterday.setDate(yesterday.getDate()-1);
            var msbeforeyesterday = beforeyesterday.getTime();


            console.log("Hoy: " + Today);
            console.log("Ayer: " + yesterday);
            console.log("Anteayer: " + beforeyesterday);

            for(var i = 0; i < result2.length; i++){
                var msStart = new Date(result2[i].DATE).getTime();

                if(msbeforeyesterday <= msStart){
                    console.log("Entra");
                    console.log("Fecha: " + result2[i].DATE);

                    var fechaI = new Date(result2[i].DATE);

                    var stringFecha = fechaI.getDate() + "-" + (fechaI.getMonth() + 1) + "-" + fechaI.getFullYear();

                    console.log(stringFecha);

                    idsL.push({
                        fecha: stringFecha ,
                        horario: result2[i].FOODHOUR,
                        amount: result2[i].AMOUNT,
                        idAlimento: result2[i].FOODID,
                        CREATETIME: result2[i].CREATETIME
                    });

                }else{
                    console.log("nO ENTRA: " + result2[i].DATE);

                }



            }


            console.log(idsL);
            res.json(idsL);


        }, function(error) {
            console.log("Error enviando los 3 dias de registros");
            res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: null});
        });


    });

    self.router.route('/week_number/delete').post(function(req, res) {
        var patient_id = req.body.id;

        console.log("Vamos a eliminar los registros de los ultimos 3 dias.")

        var foodRegister = FoodRegister.build();

        foodRegister.removeLastWeek(patient_id).then(function(result) {
            var objetivos = Objetive.build();

            objetivos.retrieveByPatientId(patient_id).then(function(result2) {

                var idsL = [];

                var Today = new Date();
                var msToday = Today.getTime();
                var yesterday = new Date();

                yesterday.setDate(Today.getDate()-1);
                var msYesterday= yesterday.getTime();
                var beforeyesterday = new Date();


                beforeyesterday.setDate(yesterday.getDate()-1);
                var msbeforeyesterday = beforeyesterday.getTime();


                console.log("Hoy: " + Today);
                console.log("Ayer: " + yesterday);
                console.log("Anteayer: " + beforeyesterday);

                for(var i = 0; i < result2.length; i++){
                    var msStart = new Date(result2[i].START_DATE).getTime();
                    var msEnd = new Date(result2[i].END_DATE).getTime();

                    if((msStart <= msToday || msStart <= msYesterday || msStart <= msbeforeyesterday ) &&(msToday <= msEnd || msYesterday <= msEnd || msbeforeyesterday <= msEnd)){
                        console.log("Entra");
                        console.log("Inicio: " + result2[i].START_DATE + " Final: " + result2[i].END_DATE);

                        idsL.push(result2[i].ID);

                    }else{
                        console.log("No entra - Inicio: " + result2[i].START_DATE + " Final: " + result2[i].END_DATE);
                    }



                }

                console.log("IDS: " + idsL);

                if(idsL.length > 0)
                {
                    var objetivos2 = Objetive.build();

                    objetivos2.resetProgress(idsL).then(function(result3) {

                        console.log("Actualizados todos los objetivos.")
                        res.json({MSG:"1",TIME: new Date().getTime(), ERROR: null});
                    }, function(error) {
                        console.log("Error reseteando los objetivos")
                        res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: null});
                    });
                }else{
                    console.log("No hay objetivos.")
                    res.json({MSG:"1",TIME: new Date().getTime(), ERROR: null});
                }


            }, function(error) {
                console.log("Error obteniendo los objetivos.");
                res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: null});
            });



        }, function(error) {
            console.log("Error eliminando los 3 dias de registros");
            res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: null});
        });
    });

    self.router.route('/week_number/delete').get(function(req, res) {
        var patient_id = req.body.id;
        var date= getWeek(new Date(),1);



        console.log("Borrando registros de la semana");
        console.log("Id paciente: " + patient_id + " fecha: " + req.body.date + " numero de semana: " + date);


        var foodRegister = FoodRegister.build();

        foodRegister.retrieveByPatientIdLastWeek(patient_id).then(function(result) {
            if(result)
            {
                for(var progressDel = 0; progressDel < result.length; progressDel++){
                    console.log("num semana: " + date + " fecha a buscar: " + getWeek(new Date(result[progressDel].DATE),1));
                    if(date == getWeek(new Date(result[progressDel].DATE),1)){



                        var foodRegister = FoodRegister.build();

                        var foodRegistryId = result[progressDel].REGISTERID;

                        console.log("ID del proximo registro: " + result[progressDel].REGISTERID + " tamaño: " +result.length);


                        console.log("RegisterID vale: "  + foodRegistryId);
                        foodRegister.retrieveById(foodRegistryId).then(function(result5) {
                            var foodRegister = FoodRegister.build();

                            console.log("ID del registro: " + foodRegistryId);

                            foodRegister.removeById(foodRegistryId).then(function(result2) {

                                console.log('Se ha eliminado correctamente el registro: ' + foodRegistryId);


                                var objetivos = Objetive.build();

                                objetivos.retrieveByPatientId(result5.PATIENTID).then(function(result3) {

                                    var date_regis = new Date(result5.DATE).getTime();

                                    var boole = false;
                                    var progress;
                                    var progressObj;
                                    var amountObj;
                                    var objId ;
                                    var amountR = result5.AMOUNT;
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

                                            objetivos.updateProgressAndComplete(objId).then(function(result6) {
                                                console.log('Objetivo actualizado y completado correctamente');


                                                console.log("Progreso bucle: " + progressDel + " límite: " +  result.length);
                                                if(progressDel == (result.length -1))
                                                    res.json({MSG:"Terminado",TIME: new Date().getTime(), ERROR: null});
                                                else{
                                                    //res.json({MSG:"En proceso",TIME: new Date().getTime(), ERROR: null});
                                                }

                                            },function(error) {
                                                console.log(error);
                                                res.json({MSG:"Eliminado con exito, objetivo actualizado",TIME: new Date().getTime(), ERROR: null});
                                            });
                                        }else {
                                            objetivos.progress = progress;

                                            objetivos.updateProgress(objId).then(function(result6) {
                                                console.log('Objetivo actualizado correctamente');

                                                console.log("Progreso bucle (objetivo no completado): " + progressDel + " límite: " +  result.length);

                                                if(progressDel == (result.length -1))
                                                    res.json({MSG:"Terminado",TIME: new Date().getTime(), ERROR: null});
                                                else{
                                                    //res.json({MSG:"En proceso",TIME: new Date().getTime(), ERROR: null});
                                                }
                                            },function(error) {
                                                console.log(error);
                                                console.log('Error actualizando' );
                                                res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error en objetivos"});
                                            });
                                        }

                                    }else{
                                        console.log("No hay objetivos para ese registro.");
                                        console.log("El valor de progress vale: " + progressDel);
                                        if(progressDel == (result.length-1))
                                            res.json({MSG:"Terminado",TIME: new Date().getTime(), ERROR: null});
                                        else{
                                            //res.json({MSG:"En proceso",TIME: new Date().getTime(), ERROR: null});
                                        }
                                    }

                                }, function(error) {
                                    console.log(error);
                                    console.log("Error interno.");
                                    res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error"});
                                });




                            }, function(err) {
                                console.log("Error eliminando registro");
                                console.log(error);

                                res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error eliminando"});
                            });

                        }, function(err) {
                            console.log("Error buscando a: "+ foodRegistryId);
                            console.log(err);
                            console.log("Error eliminando registro");
                            res.json({MSG:"ERROR",TIME: new Date().getTime(), ERROR: "Error eliminando"});
                        });








                    }
                }




            }
            else {
                res.json({ROWS: null.length, ERROR: "ERROR FOODREGISTER"});
                res.status(401).send("Patient register Log not found");
            }
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });
    });


    self.router.route('/week_number').post(function(req, res) {
        var patient_id = req.body.id;
        var date= getWeek(new Date(req.body.date),1);

        var response = [];



        console.log("Id paciente: " + patient_id + " fecha: " + req.body.date + " numero de semana: " + date);


        var foodRegister = FoodRegister.build();

        foodRegister.retrieveByPatientIdLastWeek(patient_id).then(function(result) {
            if(result)
			{
				for(var i = 0; i < result.length; i++){
                    console.log("num semana: " + date + " fecha a buscar: " + getWeek(new Date(result[i].DATE),1));
                    if(date == getWeek(new Date(result[i].DATE),1)){
                    	response.push(result[i]);
					}
				}



                console.log("numero de registros: " + response.length);
               if(result.length > 0)
               {
                   console.log("Fecha: " + result[0].CREATETIME + " milisegundos: " + new Date(result[0].CREATETIME).getTime() + " fecha js: " + new Date(result[0].CREATETIME) );

                   res.json({ROWS: response.length, TIME: new Date(result[0].CREATETIME).getTime() ,ERROR: null});
               }else{
                   console.log("Fecha: NO DISPONIBLE"  + " milisegundos: NO DISPONIBLE ");

                   res.json({ROWS: response.length, TIME: 0 ,ERROR: null});
               }
			}
            else {
                res.json({ROWS: null.length, ERROR: "ERROR FOODREGISTER"});
                res.status(401).send("Patient register Log not found");
            }
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });
    });

    self.router.route('/id/last_register/:id').get(function(req, res) {
        var patient_id = req.params.id;
        console.log(patient_id);
        var foodRegister = FoodRegister.build();

        foodRegister.retrieveLastAdded(patient_id).then(function(result) {
            if(result)
                res.json(result.DATE);
            else
                res.status(401).send("Patient register Log not found");
        }, function(error) {
            res.send("No se ha podido completar su solicitud");
        });
    });
};

FoodRegisterService.prototype.getRouter = function() {
	var self = this;
	return self.router;
};

module.exports = FoodRegisterService;