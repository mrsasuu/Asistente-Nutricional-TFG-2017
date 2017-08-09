var Patient_id = -1;
var evento;
var json1;
var names = [];
var horarios = [];
var amounts = [];
var progress = [];
var completed = [];
var ids = [];
var fechas = [];
var fechas_end = [];
var cont = 0;
var datas;
var bool = false;
var registerIDs = [];
var idRegistro = -1;

$('input.autocomplete').keypress(function() {
    //$(".dropdown-content").remove();
});



$("#botonDel").on("click",function () {

    $("#modalDelete").css("display","block","opacity","1","transform","scaleX(1)");

});
$("#btnCompare").on("click",function () {

    var table_id = $("#selectRDA :selected").val();
    var date = $("#statics_date :selected").val();

   if(table_id != -1){
       $.ajax({
           url : "/backend/rda/table/",
           type: "POST",
           data:{id_rda_table: table_id},
           success: function(data, textStatus, jqXHR)
           {

               $.ajax({
                   url : "/backend/patients/food_register/statics",
                   type: "POST",
                   data : {PATIENTID: Patient_id,statics_date: date},
                   success: function(data2, textStatus, jqXHR)
                   {
                       //alert("Se ha insertado el registro correctamente.")
                       /*calendario();

                        $("#add_event").closeModal();
                        setTimeout(function() {
                        Materialize.toast('Se ha añadido el evento correctamente', 5000);
                        }, 500);*/

                       var content = '<div style="padding: 50px;" class="row"><table class="bordered col s12 " style="padding: 50px!important;"><tr class="row"><th class="col s12 m4">Macronutrientes</th><th class="col s12 m4">Estadísticas del paciente</th><th class="col s12 m4">Cantidad recomendada(CDR)</th></tr></thead> ' +
                           '<tbody><tr class="row"><td class="col s12 m4">Kcalorias</td><td class="col s12 m4">' + data2.KCAL + " Kcal" +'</td><td class="col s12 m4">'+ data.KCAL + " Kcal"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Proteinas</td><td class="col s12 m4">'+ data2.PROTEINS + " g"+'</td><td class="col s12 m4">'+ data.PROTEINS + " g"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Lípidos</td><td class="col s12 m4">'+data2.LIPIDS + " g"+'</td><td class="col s12 m4">'+data.LIPIDS + " g"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">H.Carbono</td><td class="col s12 m4">'+data2.GLUCIDS + " g"+'</td><td class="col s12 m4">'+data.CARBON_HYDRATES + " g"+'</td></tr>'+
                            '</tbody></table></div> ';

                       content += '<div style="padding: 50px;" class="row"><table class="bordered col s12" style="padding: 50px!important;"><thead><tr class="row"><th class="col s12 m4">Vitaminas</th><th class="col s12 m4">Estadísticas del paciente</th><th class="col s12 m4">Cantidad recomendada(CDR)</th></tr></thead> ' +
                           '<tbody><tr class="row"><td class="col s12 m4">Vitamina A</td><td class="col s12 m4">' + data2.KCAL + " Kcal" +'</td><td class="col s12 m4">'+ data.KCAL + " Kcal"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Vitamina C</td><td class="col s12 m4">'+ data2.PROTEINS + " g"+'</td><td class="col s12 m4">'+ data.PROTEINS + " g"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Vitamina D</td><td class="col s12 m4">'+data2.LIPIDS + " g"+'</td><td class="col s12 m4">'+data.LIPIDS + " g"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Vitamina E</td><td class="col s12 m4">'+data2.GLUCIDS + " g"+'</td><td class="col s12 m4">'+data.CARBON_HYDRATES + " g"+'</td></tr>'+
                           '</tbody></table></div>';

                       content += '<div style="padding: 50px;" class="row"><table class="bordered col s12" style="padding: 50px!important;"><thead><tr class="row"><th class="col s12 m4">Minerales</th><th class="col s12 m4">Estadísticas del paciente</th><th class="col s12 m4">Cantidad recomendada(CDR)</th></tr></thead> ' +
                           '<tbody><tr class="row"><td class="col s12 m4">Calcio</td><td class="col s12 m4">' + data2.KCAL + " Kcal" +'</td><td class="col s12 m4">'+ data.KCAL + " Kcal"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Hierro</td><td class="col s12 m4">' + data2.KCAL + " Kcal" +'</td><td class="col s12 m4">'+ data.KCAL + " Kcal"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Magnesio</td><td class="col s12 m4">'+ data2.PROTEINS + " g"+'</td><td class="col s12 m4">'+ data.PROTEINS + " g"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Potasio</td><td class="col s12 m4">'+data2.LIPIDS + " g"+'</td><td class="col s12 m4">'+data.LIPIDS + " g"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Fósforo</td><td class="col s12 m4">'+data2.GLUCIDS + " g"+'</td><td class="col s12 m4">'+data.CARBON_HYDRATES + " g"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">sodio</td><td class="col s12 m4">'+data2.GLUCIDS + " g"+'</td><td class="col s12 m4">'+data.CARBON_HYDRATES + " g"+'</td></tr>'+
                           '</tbody></table></div>';

                       content += '<div style="padding: 50px;" class="row"><table class="bordered col s12" style="padding: 50px!important;"><thead><tr class="row"><th class="col s12 m4">Ácidos grasos</th><th class="col s12 m4">Estadísticas del paciente</th><th class="col s12 m4">Cantidad recomendada(CDR)</th></tr></thead> ' +
                           '<tbody><tr class="row"><td class="col s12 m4">Colesterol</td><td class="col s12 m4">' + data2.KCAL + " Kcal" +'</td><td class="col s12 m4">'+ data.KCAL + " Kcal"+'</td></tr>'+
                           '<tbody><tr class="row"><td class="col s12 m4">Saturados</td><td class="col s12 m4">' + data2.KCAL + " Kcal" +'</td><td class="col s12 m4">'+ data.KCAL + " Kcal"+'</td></tr>'+
                           '</tbody></table></div> ';


                       content+='<div class="row"><canvas id="myChart" width="800" height="800" class="col s12 offset-m3 m6"></canvas></div>';


                       $("#estadisticas").html(content);

                       var ctx = $("#myChart");

                       var myChart = new Chart(ctx, {
                           type: 'pie',
                           data: {
                               labels: ["Proteinas", "Lípidos", "Carbohidratos"],
                               datasets: [{
                                   label: '%',
                                   data: [data2.P_PERCENT, data2.L_PERCENT, data2.CH_PERCENT],
                                   backgroundColor: [
                                       'rgba(234, 59, 59, 1)',
                                       'rgba(255, 140, 0, 1)',
                                       'rgba(74, 144, 247, 1)'
                                   ],
                                   borderColor: [
                                       'rgba(255,255,255,1)',
                                       'rgba(255, 255, 255, 1)',
                                       'rgba(255, 255, 255, 1)'
                                   ],
                                   borderWidth: 3
                               }]
                           },
                           options :{
                               responsive:false,
                               maintainAspectRatio:false,
                               scales: {
                                   xAxes: [{
                                       display: this.scalesdisplay,
                                       ticks: {
                                           beginAtZero:this.beginzero,
                                       }
                                   }],
                                   yAxes: [{
                                       display: this.scalesdisplay,
                                       ticks: {
                                           beginAtZero:this.beginzero,
                                       }
                                   }]
                               }
                            }
                       });

                       $("#estadisticas").css("display","block");




                       setTimeout(function() {
                           Materialize.toast('Se ha consultado correctamente la tabla RDA', 5000);
                       }, 500);






                   },
                   error: function (jqXHR, textStatus, errorThrown)
                   {
                       setTimeout(function() {
                           Materialize.toast('Ha ocurrido un error', 5000);
                       }, 500);
                   }
               });




           },
           error: function (jqXHR, textStatus, errorThrown)
           {
               setTimeout(function() {
                   Materialize.toast('Ha ocurrido un error RDA', 5000);
               }, 500);
           }
       });

   }

});


function statics() {

    $("#last_registry").text("-");

    $.ajax({
        type: "GET",
        url: "/api/food_register/id/last_register/"+Patient_id,
        datatype: "json",
        success: function(date_res) {
            var date_temp = new Date(date_res);
            var month,day;
            if((date_temp.getMonth()+1)<10){
                month = "0" + (date_temp.getMonth()+1);
            }else{
                month = (date_temp.getMonth()+1);
            }

            if(date_temp.getUTCDate() < 10){
                day = "0"+date_temp.getUTCDate();
            }else {
                day = date_temp.getUTCDate();
            }


            $("#last_registry").text(day + "/" + month + "/" + date_temp.getUTCFullYear());

        },
        error : function(xhr, status) {
            console.log(xhr);
            console.log(status);
        }
    });


    $.ajax({
        url : "/backend/patients/food_register/lastweek",
        type: "POST",
        data : {PATIENTID: Patient_id},
        success: function(data, textStatus, jqXHR)
        {
            //alert("Se ha insertado el registro correctamente.")
            /*calendario();

             $("#add_event").closeModal();
             setTimeout(function() {
             Materialize.toast('Se ha añadido el evento correctamente', 5000);
             }, 500);*/



            for(var i = 0; i < data.length; i++){
                /*var day = new Date(data[i].DATE).getDay();
                 alert(data[i].DATE + " dia de la semana: " + day );*/
                //alert("Kcalorias: " + data[i].KCAL);

                switch (data[i].FOODHOUR){
                    case "DESAYUNO":
                        $("#kcal_bre").text(data[i].KCAL + " Kcal");
                        $("#gluc_bre").text(data[i].GLUCIDS + " g");
                        $("#prot_bre").text(data[i].PROTEINS+ " g");
                        $("#lipid_bre").text(data[i].LIPIDS+ " g");

                        break;
                    case "ALMUERZO":
                        $("#kcal_lunch").text(data[i].KCAL + " Kcal");
                        $("#gluc_lunch").text(data[i].GLUCIDS+  " g");
                        $("#prot_lunch").text(data[i].PROTEINS+ " g");
                        $("#lipid_lunch").text(data[i].LIPIDS+ " g");
                        break;
                    case "MERIENDA":
                        $("#kcal_snack").text(data[i].KCAL + " Kcal");
                        $("#gluc_snack").text(data[i].GLUCIDS+ " g");
                        $("#prot_snack").text(data[i].PROTEINS+ " g");
                        $("#lipid_snack").text(data[i].LIPIDS+ " g");
                        break;
                    case "CENA":
                        $("#kcal_dinn").text(data[i].KCAL + " Kcal");
                        $("#gluc_dinn").text(data[i].GLUCIDS+ " g");
                        $("#prot_dinn").text(data[i].PROTEINS+ " g");
                        $("#lipid_dinn").text(data[i].LIPIDS+ " g");
                        break;
                    case "OTRO":
                        $("#kcal_oth").text(data[i].KCAL + " Kcal");
                        $("#gluc_oth").text(data[i].GLUCIDS+ " g");
                        $("#prot_oth").text(data[i].PROTEINS+ " g");
                        $("#lipid_oth").text(data[i].LIPIDS+ " g");
                        break;
                }

            }

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            setTimeout(function() {
                Materialize.toast('Ha ocurrido un error', 5000);
            }, 500);
        }
    });

}

$("#agree").on("click",function () {


    $.ajax({
        url : "/backend/patients/food_register/delete",
        type: "POST",
        data : {REGISTRYID: $("#registerID").text()},
        success: function(data, textStatus, jqXHR)
        {
            //alert("Se ha insertado el registro correctamente.")
            calendario();
            setTimeout(function() {
                Materialize.toast('Se ha eliminado correctamente', 5000);
            }, 500);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            setTimeout(function() {
                Materialize.toast('Ha ocurrido un error', 5000);
            }, 500);
        }
    });

    statics();

});

function calendario() {
    $('#calendar').fullCalendar( 'removeEvents');

    names = [];
    ids = [];
    fechas = [];
    horarios = [];
    amounts = [];
    registerIDs = [];

    if($("#alimentos").is(":checked")){
        $.ajax({
            type: "GET",
            url: "/api/food_register/id/"+Patient_id,
            datatype: "json",
            success: function(jsondata) {

                json1 = jsondata;

                for(var i = 0; i < jsondata.length; i++){
                    ids.push(jsondata[i].FOODID);
                    registerIDs.push(jsondata[i].REGISTERID);
                    horarios.push(jsondata[i].FOODHOUR);
                    amounts.push(jsondata[i].AMOUNT);
                    //alert("Se ha pusheado" + ids[0]);
                    fechas.push(jsondata[i].DATE);
                }




                for(var i = 0; i < ids.length; i++){
                    $.ajax({
                        type: "GET",
                        url: "/api/food/id/"+ids[i],
                        datatype: "json",
                        success: function(jsondata2) {

                            var conta = -1;

                            for(var j = 0; j < ids.length; j++){
                                if(ids[j]==jsondata2.ID){
                                    conta =j;
                                }
                            }

                            var color="#bcbff7";

                            switch (horarios[conta]){
                                case "ALMUERZO":
                                    color="#00D639";
                                    break;
                                case "CENA":
                                    color="#A54BB7";
                                    break;
                                case "MERIENDA":
                                    color="#FFBC00";
                                    break;
                                case "OTRO":
                                    color="#D60B00";
                                    break;
                            }
                            var evento2 = {
                                title: jsondata2.NAME,
                                tipo: "Registro",
                                idRegistro: registerIDs[conta],
                                prot: jsondata2.PROTEINS,
                                gluc: jsondata2.CARBON_HYDRATES,
                                lipids: jsondata2.LIPIDS,
                                amount: amounts[conta],
                                allDay: true,
                                color: color,
                                horario: horarios[conta],
                                start: fechas[conta]
                            };

                            if(conta > -1){
                                ids.splice(conta,1);
                                horarios.splice(conta,1);
                                registerIDs.splice(conta,1);
                                fechas.splice(conta,1);
                                amounts.splice(conta,1);
                            }


                            names.push(jsondata2.NAME);
                            horarios.push(jsondata2.FOODHOUR);
                            $('#calendar').fullCalendar('renderEvent', evento2, true);


                        },
                        error : function(xhr, status) {
                            console.log(xhr);
                            console.log(status);
                        }
                    });
                }


            },
            error : function(xhr, status) {
                console.log(xhr);
                console.log(status);
            }
        });
    }

    names = [];
    ids = [];
    fechas = [];
    horarios = [];
    amounts = [];
    registerIDs = [];
    completed = [];
    progress = [];
    fechas_end = [];

    if($("#objetivos").is(":checked")){
        $.ajax({
            type: "GET",
            url: "/api/objetive/id/"+Patient_id,
            datatype: "json",
            success: function(jsondata3) {


                json1 = jsondata3;

                for(var i = 0; i < jsondata3.length; i++){
                    ids.push(jsondata3[i].FOOD_ID);
                    //alert("Alimento numero: "+ jsondata[i].FOOD_ID);
                    registerIDs.push(jsondata3[i].ID);
                    horarios.push(jsondata3[i].FOODHOUR);
                    //alert("Se ha pusheado" + ids[0]);
                    fechas.push(jsondata3[i].START_DATE);
                    fechas.push(jsondata3[i].END_DATE);
                    amounts.push(jsondata3[i].AMOUNT);
                    completed.push(jsondata3[i].COMPLETED);
                    progress.push(jsondata3[i].PROGRESS);
                }




                for(var i = 0; i < ids.length; i++){
                    //alert("llega y hay objetivos: " + jsondata.length);
                    //alert("Se va a buscar el alimento: " + ids[i]);
                    $.ajax({
                        type: "GET",
                        url: "/api/food/id/"+ids[i],
                        datatype: "json",
                        success: function(jsondata2) {

                            var conta = -1;

                            //alert("llega y hay: " + jsondata2.length + " alimentos");

                            for(var j = 0; j < ids.length; j++){
                                if(ids[j]==jsondata2.ID){
                                    conta =j;
                                }
                            }



                            var evento3 = {
                                title: jsondata2.NAME,
                                tipo: "Objetivo",
                                idRegistro: registerIDs[conta],
                                prot: jsondata2.PROTEINS,
                                gluc: jsondata2.CARBON_HYDRATES,
                                lipids: jsondata2.LIPIDS,
                                amount: amounts[conta],
                                progress: progress[conta],
                                completed: completed[conta],
                                allDay: true,
                                color: "#345f7f",
                                horario: horarios[conta],
                                start: fechas[conta],
                                end: fechas_end[conta]
                            };

                            //alert(evento2);

                            if(conta > -1){
                                ids.splice(conta,1);
                                horarios.splice(conta,1);
                                registerIDs.splice(conta,1);
                                fechas.splice(conta,1);
                                fechas_end.splice(conta,1);
                                amounts.splice(conta,1);
                                completed.splice(conta,1);
                                progress.splice(conta,1);

                            }


                            names.push(jsondata2.NAME);
                            horarios.push(jsondata2.FOODHOUR);
                            $('#calendar').fullCalendar('renderEvent', evento3, true);


                        },
                        error : function(xhr, status) {
                            alert("error");
                            console.log(xhr);
                            console.log(status);
                        }
                    });
                }


            },
            error : function(xhr, status) {
                console.log(xhr);
                console.log(status);
            }
        });
    }
};


$('input.autocomplete').keyup(function() {

    $(".collapsible-header").removeClass(function(){
        return "active";
    });
    $(".collapsible").collapsible({accordion: true});
    $(".collapsible").collapsible({accordion: false});
    $("#name_food").text("");
    $("#name_food2").text("");


    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#name_food2").text(datas[i].NAME);
        }
    }
});

$('#autocompleteinput2').keyup(function() {

    $(".collapsible-header").removeClass(function(){
        return "active";
    });
    $(".collapsible").collapsible({accordion: true});
    $(".collapsible").collapsible({accordion: false});
    $("#name_food").text("");
    $("#name_food2").text("");


    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food2").text(datas[i].NAME);
        }
    }
});

$('input.autocomplete').focusout(function() {
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#name_food2").text(datas[i].NAME);
        }
    }
});


$('input.autocomplete').bind('input', function() {
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#name_food2").text(datas[i].NAME);
        }
    }
});

$('.autocomplete-content').on('click', "span",function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#name_food2").text(datas[i].NAME);
        }
    }
});

$(".autocomplete-content ul").on('click', function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#name_food2").text(datas[i].NAME);
        }
    }
});

$(".autocomplete-content li").on('click', function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#name_food2").text(datas[i].NAME);
        }
    }
});

$("#autocompletar-tooltop li").on('click', function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#name_food2").text(datas[i].NAME);
        }
    }
});

$("#acordeon").on('click', function() {

    bool = false;

    for(var i = 0; i < datas.length; i++) {
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food").text(datas[i].NAME);
            $("#food_gluc").text(datas[i].CARBON_HYDRATES + "g*");
            $("#food_prot").text(datas[i].PROTEINS + "g*");
            $("#food_lipids").text(datas[i].LIPIDS + "g*");

            bool = true;

            //$("#acordeon").addClass("active");
        }
    }

    if(bool){
        $("#error-food").css("display", "none");
        $("#content-food-registry").css("display", "inherit");
    }else{
        $("#error-food").css("display", "inherit");
        $("#content-food-registry").css("display", "none");
        $("#name_food").text("");

        $(".collapsible-header").removeClass(function(){
            return "active";
        });
        $(".collapsible").collapsible({accordion: true});
        $(".collapsible").collapsible({accordion: false});
    }
});

$("#acordeon2").on('click', function() {

    bool = false;

    for(var i = 0; i < datas.length; i++) {
        if($('#autocompleteinput2').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            $("#name_food2").text(datas[i].NAME);
            $("#food_gluc2").text(datas[i].CARBON_HYDRATES + "g*");
            $("#food_prot2").text(datas[i].PROTEINS + "g*");
            $("#food_lipids2").text(datas[i].LIPIDS + "g*");

            bool = true;

            //$("#acordeon").addClass("active");
        }
    }

    if(bool){
        $("#error-food2").css("display", "none");
        $("#content-food-registry2").css("display", "inherit");
    }else{
        $("#error-food2").css("display", "inherit");
        $("#content-food-registry2").css("display", "none");
        $("#name_food2").text("");

        $(".collapsible-header").removeClass(function(){
            return "active";
        });
        $(".collapsible").collapsible({accordion: true});
        $(".collapsible").collapsible({accordion: false});
    }
});

/*
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
});*/


$("#botonEv").on("click",function () {

    //$("#Registro").validate();
    var foodid = -1;
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            foodid = datas[i].ID;
        }
    }

    if(foodid != -1 && $("#selecthorario").find(":selected").text().toUpperCase() != "ELIGE EL HORARIO" )
    {
        var formData = {PATIENTID: Patient_id,FOODHOUR: $("#selecthorario").find(":selected").text().toUpperCase(),FOODID:foodid,DATE: $("#datepick").val(),AMOUNT: $("#amountRegistry").val()}; //Array

        //alert(formData.PATIENTID + " " + formData.FOODHOUR.toUpperCase() + " " + formData.FOODID + " " + formData.DATE);


        $.ajax({
            url : "/backend/patients/food_register",
            type: "POST",
            data : formData,
            success: function(data, textStatus, jqXHR)
            {
                //alert("Se ha insertado el registro correctamente.")
                calendario();

                $("#add_event").closeModal();
                setTimeout(function() {
                    Materialize.toast('Se ha añadido el evento correctamente', 5000);
                }, 500);

            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                setTimeout(function() {
                    Materialize.toast('Ha ocurrido un error', 5000);
                }, 500);
            }
        });

        statics();
    }

});

$("#botonEvOb").on("click",function () {

    //$("#Registro").validate();
    var foodid = -1;
    for(var i = 0; i < datas.length; i++){
        if($('#autocompleteinput2').val().toUpperCase() == datas[i].NAME.toUpperCase()){
            foodid = datas[i].ID;
        }
    }
    //$("#selecthorario").find(":selected").text().toUpperCase() != "ELIGE EL HORARIO"
    if(foodid != -1)
    {
        if($("#selecthorario").find(":selected").text().toUpperCase() != "ELIGE EL HORARIO")
            var formData = {PATIENTID: Patient_id,FOODHOUR: $("#selecthorario").find(":selected").text().toUpperCase(),FOODID:foodid,START_DATE: $("#datepick2").val(),END_DATE: $("#datepick3").val(),AMOUNT:$("#amount_objetive").val()}; //Array
        else{
            var formData = {PATIENTID: Patient_id,FOODID:foodid,START_DATE: $("#datepick2").val(),END_DATE: $("#datepick3").val(),AMOUNT:$("#amount_objetive").val()}; //Array
        }

        //alert(formData.PATIENTID + " " + formData.FOODHOUR.toUpperCase() + " " + formData.FOODID + " " + formData.DATE);


        $.ajax({
            url : "/backend/patients/objetive",
            type: "POST",
            data : formData,
            success: function(data, textStatus, jqXHR)
            {
                //alert("Se ha insertado el registro correctamente.")
                calendario();

                $("#add_event").closeModal();
                setTimeout(function() {
                    Materialize.toast('Se ha añadido el evento correctamente', 5000);
                }, 500);

            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                setTimeout(function() {
                    Materialize.toast('Ha ocurrido un error', 5000);
                }, 500);
            }
        });

        statics();
    }

});





$(document).ready(function() {
    $(document).ready(function() {
        $('select').material_select();
    });




    /*$("#formValidate").validate({
        rules: {
            selecthorario: {
                required: true
            },
            datepick: {
                required: true
            },
            autocompleteinput: {
                required: true
            }
        },
        //For custom messages
        messages: {
            selecthorario:{
                required: "Selecciona un horario de comida"
            },
            datepick: {
                required: "Selecciona la fecha del registro"
            },
            autocompleteinput: {
                required: "Introduce el nombre del alimento"
            }
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });*/

    $.ajax({
        type: "GET",
        url: "/api/food/",
        datatype: "json",
        success: function(jsondata) {

            var datas2 = {};


            for(var i  = 0; i < jsondata.length; i++){
                datas2[jsondata[i].NAME] = null;
            }

            data = datas2;
            datas = jsondata;

            //alert("Se actualiza el calendario");
            $('input.autocomplete').autocomplete({
                data: datas2,
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function(val) {
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });

        },
        error : function(xhr, status) {
            console.log(xhr);
            console.log(status);
        }
    });



	$('.modal-trigger').leanModal( {
		complete: function() {
			$('#patient_loader').css('opacity', '1');
			$('#patient_loader').css('display', 'initial');
		}
	});

	$("#close-card").on('click', function() {
	    //$(".card-reveal").css({"transform":"translateY(0%)","display":"none"});
            $( "#card-description" ).removeClass("modal-shown");
            $( "#card-description" ).addClass("modal-hidden");

	});

    $("#open-card").on('click', function() {
        //$(".card-reveal").css({"transform":"translateY(0%)","display":"none"});



            $( "#card-description" ).removeClass("modal-hidden");
            $( "#card-description" ).addClass("modal-shown");
    });



    $("#alimentos").on('click', function() {
        //$(".card-reveal").css({"transform":"translateY(0%)","display":"none"});



        calendario();
    });

    $("#objetivos").on('click', function() {
        //$(".card-reveal").css({"transform":"translateY(0%)","display":"none"});



        calendario();
    });


	// If click on send but delete yes check is not checked close the modal
	$('#delete_patient form').submit(function(event) {
		if(document.getElementById("delete_patient_yes").checked)
			return;

		$("#delete_patient").closeModal();

		event.preventDefault();
	});

	$(".actions").on('click', 'a', function() {
		action = $(this).attr('href');
		id_patient = $(this).parent().parent().children()[0].innerHTML;
		id_patient = parseInt(id_patient);
		Patient_id = id_patient;


		if(action == '#delete_patient') {
			name = $(this).parent().parent().children()[1].innerHTML;

			$("#delete_id_patient").val(id_patient);
			$("#delete_titulo").text('Se borrará "' + name + '"' );

			$("#delete_patient_yes").removeAttr('checked');
			$("#delete_patient_no").attr('checked','');
		}
		else if(action == '#edit_patient') {

			$.ajax({
				type: "GET",
				url: "/api/patient/id/"+id_patient,
				datatype: "json",
				success: function(jsondata) {
					$("#edit_id_patient").val(id_patient);

                    var gender = parseInt(jsondata.GENDER);
                    $("#edit_patient_male").removeAttr('checked');
                    $("#edit_patient_female").removeAttr('checked');

                    if(gender){
                        $("#edit_patient_female").prop('checked', true);
					}else{
                        $("#edit_patient_male").prop('checked', true);
					}

                    var activity = parseInt(jsondata.ACTIVITY_LEVEL);
                    $("#edit_activity_level_patient_1").removeAttr('checked');
                    $("#edit_activity_level_patient_2").removeAttr('checked');
                    $("#edit_activity_level_patient_3").removeAttr('checked');
                    $("#edit_activity_level_patient_4").removeAttr('checked');

                    switch(activity){
						case 0:
                            $("#edit_activity_level_patient_1").prop('checked', true);
                            break;
                        case 1:
                            $("#edit_activity_level_patient_2").prop('checked', true);
                            break;
                        case 2:
                            $("#edit_activity_level_patient_3").prop('checked', true);
                            break;
                        case 3:
                            $("#edit_activity_level_patient_4").prop('checked', true);
                            break;
					}

					$("#edit_name_patient").val(jsondata.NAME);
					$("#edit_dni_patient").val(jsondata.DNI);
					$("#edit_age_patient").val(jsondata.AGE);
					$("#edit_surname_patient").val(jsondata.SURNAME);
                    $("#edit_address_patient").val(jsondata.ADDRESS);
                    $("#edit_email_patient").val(jsondata.EMAIL);
                    $("#edit_phone_patient").val(jsondata.PHONE);
                    $("#edit_username_patient").val(jsondata.USERNAME);
                    $("#edit_password_patient").val(jsondata.PASSWORD);
                    $("#edit_height_patient").val(jsondata.HEIGHT);
                    $("#edit_weight_patient").val(jsondata.WEIGHT);
                    $("#editPatientImgViewer").attr('src', jsondata.PHOTO);

                    if(jsondata.PHOTO != null)
                        $("#editPatientImgViewer").attr('src', jsondata.PHOTO);
                    else
                        $("#editPatientImgViewer").attr('src', "/static/img/img_not_available.png");



					$('#patient_loader').css('opacity', '0');
					setTimeout(function() { $('#patient_loader').css('display', 'none'); }, 1000);
				},
				error : function(xhr, status) {
					console.log(xhr);
					console.log(status);
				}
			});


		}else if(action == '#show_patient') {

        $('#calendar').fullCalendar('today');
        $("#estadisticas").css("display","none");
        $("#selectRDA").empty();

            $.ajax({
                url : "/backend/rda/all/",
                type: "POST",
                success: function(data, textStatus, jqXHR)
                {
                    var actividad;
                    var sexo;

                    $('#selectRDA').append('<option value="-1" disabled selected>Elige una tabla de comparación de CDR</option>');
                    for( var i = 0; i < data.length; i++){
                        switch (data[i].ACTIVITY_LEVEL){
                            case 0:
                                actividad = "Sedentario";
                                break;
                            case 1:
                                actividad = "Moderada";
                                break;
                            case 2:
                                actividad = "Intensa";
                                break;
                            case 3:
                                actividad = "Muy intensa";
                                break;
                        }

                        if(data[i].GENDER){
                            sexo = "Mujer";
                        }else{
                            sexo = "Hombre"
                        }

                        $('#selectRDA').append('<option value="'+ data[i].TABLE_ID +'">'+ "Nombre: "+data[i].NAME+ ", Edades: " + data[i].MIN_AGE_RANGE +"-"+data[i].MAX_AGE_RANGE + ", Acticidad: " + actividad + ", Sexo: " + sexo + '</option>');
                    }

                    $('select').material_select();
                    setTimeout(function() {
                        Materialize.toast('Se ha actualizado correctamente la lista RDA', 5000);
                    }, 500);
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    setTimeout(function() {
                        Materialize.toast('Ha ocurrido un error RDA', 5000);
                    }, 500);
                }
            });

        $("#kcal_bre").text("0 Kcal");
        $("#gluc_bre").text("0 g");
        $("#prot_bre").text("0 g");
        $("#lipid_bre").text("0 g");

        $("#kcal_lunch").text("0 Kcal");
        $("#gluc_lunch").text("0 g");
        $("#prot_lunch").text("0 g");
        $("#lipid_lunch").text("0 g");

        $("#kcal_snack").text("0 Kcal");
        $("#gluc_snack").text("0 g");
        $("#prot_snack").text("0 g");
        $("#lipid_snack").text("0 g");

        $("#kcal_dinn").text("0 Kcal");
        $("#gluc_dinn").text("0 g");
        $("#prot_dinn").text("0 g");
        $("#lipid_dinn").text("0 g");

        $("#kcal_oth").text("0 Kcal");
        $("#gluc_oth").text("0 g");
        $("#prot_oth").text("0 g");
        $("#lipid_oth").text("0 g");


        statics();



        calendario();



        $.ajax({
            type: "GET",
            url: "/api/patient/id/"+id_patient,
            datatype: "json",
            success: function(jsondata) {
                $("#show_id_patient").val(id_patient);

                var gender = parseInt(jsondata.GENDER);
                $("#show_patient_male").removeAttr('checked');
                $("#show_patient_female").removeAttr('checked');



                var activity = parseInt(jsondata.ACTIVITY_LEVEL);
                $("#show_activity_level_patient_1").removeAttr('checked');
                $("#show_activity_level_patient_2").removeAttr('checked');
                $("#show_activity_level_patient_3").removeAttr('checked');
                $("#show_activity_level_patient_4").removeAttr('checked');

                switch(activity){
                    case 0:
                        $("#show_patient_activity").text("Sedentario");
                        break;
                    case 1:
                        $("#show_patient_activity").text("Moderada");
                        break;
                    case 2:
                        $("#show_patient_activity").text("Intensa");
                        break;
                    case 3:
                        $("#show_patient_activity").text("Muy intensa");
                        break;
                }

                $("#show_patient_name_1").text(jsondata.NAME + " " + jsondata.SURNAME);
                $("#show_patient_name_2").text(jsondata.NAME + " " + jsondata.SURNAME);
                $("#show_patient_email").text(jsondata.EMAIL);

                $("#show_patient_dni_1").text(jsondata.DNI);
                $("#show_patient_dni_2").text(jsondata.DNI);

                $("#show_patient_age").text(jsondata.AGE);
                $("#show_patient_username").text(jsondata.USERNAME);

                $("#show_patient_height").text(jsondata.HEIGHT + " cm");
                $("#show_patient_weight").text(jsondata.WEIGHT + " Kg");

                if(jsondata.PHOTO != null)
                    $("#show_patient_profile_picture").attr('src', jsondata.PHOTO);

                $("#show_patient_address").text(jsondata.ADDRESS);
                $("#show_patient_phone").text(jsondata.PHONE);


                if(gender){
                    $("#show_patient_gender").text("Mujer");
                }else{
                    $("#show_patient_gender").text("Hombre");
                }





                $("#show_dni_patient").val(jsondata.DNI);
                $("#show_age_patient").val(jsondata.AGE);
                $("#show_surname_patient").val(jsondata.SURNAME);
                $("#show_address_patient").val(jsondata.ADDRESS);
                $("#show_email_patient").val(jsondata.EMAIL);
                $("#show_phone_patient").val(jsondata.PHONE);
                $("#show_username_patient").val(jsondata.USERNAME);
                $("#show_password_patient").val(jsondata.PASSWORD);
                $("#show_height_patient").val(jsondata.HEIGHT);
                $("#show_weight_patient").val(jsondata.WEIGHT);
                $("#showPatientImgViewer").attr('src', jsondata.PHOTO);
                $("#show_previous_photo_user").val(jsondata.PHOTO);



                $('#patient_loader').css('opacity', '0');
                setTimeout(function() { $('#patient_loader').css('display', 'none'); }, 1000);
            },
            error : function(xhr, status) {
                console.log(xhr);
                console.log(status);
            }
        });
		}
	});
});


