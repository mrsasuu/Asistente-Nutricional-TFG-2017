var Patient_id = -1;
var evento;
var json1;
var names = [];
var horarios = [];
var ids = [];
var fechas = [];
var cont = 0;
var datas;


$('input.autocomplete').keypress(function() {
    //$(".dropdown-content").remove();
});


$('input.autocomplete').keyup(function() {
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});

$('input.autocomplete').focusout(function() {
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});


$('input.autocomplete').bind('input', function() {
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});

$('.autocomplete-content').on('click', "span",function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});

$(".autocomplete-content ul").on('click', function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});

$(".autocomplete-content li").on('click', function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});

$("#autocompletar-tooltop li").on('click', function() {
    alert("hola");
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});

$("#acordeon").on('click', function() {
    for(var i = 0; i < datas.length; i++){
        if($('input.autocomplete').val() == datas[i].NAME){
            $("#name_food").text(datas[i].NAME);
        }
    }
});




$(document).ready(function() {

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

            $('input.autocomplete').autocomplete({
                data: datas2,
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function(val) {
                    alert("test");
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

    function calendario() {
        $('#calendar').fullCalendar( 'removeEvents');

        names = [];
        ids = [];
        fechas = [];
        horarios = [];

        if($("#alimentos").is(":checked")){
            $.ajax({
                type: "GET",
                url: "/api/food_register/id/"+Patient_id,
                datatype: "json",
                success: function(jsondata) {

                    json1 = jsondata;

                    for(var i = 0; i < jsondata.length; i++){
                        ids.push(jsondata[i].FOODID);
                        //alert("Se ha pusheado" + ids[0]);
                        fechas.push(jsondata[i].DATE);
                    }

                    /*alert("Array: " + ids);
                     alert(jsondata[0].FOODID);
                     alert(jsondata[0].FOODHOUR);*/

                    for(var i = 0; i < ids.length; i++){
                        $.ajax({
                            type: "GET",
                            url: "/api/food/id/"+ids[i],
                            datatype: "json",
                            success: function(jsondata2) {

                                var conta = 0;

                                for(var j = 0; j < ids.length; j++){
                                    if(ids[j]==jsondata2.ID){
                                        conta =j;
                                    }
                                }

                                var evento2 = {
                                    title: jsondata2.NAME,
                                    tipo: "Registro",
                                    horario: horarios[conta],
                                    start: fechas[conta]
                                };

                                names.push(jsondata2.NAME);
                                //alert("Se ha pusheado alimento" + jsondata2.NAME);
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

    };

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

        /*$('input.autocomplete').autocomplete({
            data: {
                "Apple": null,
                "Apple2": null,
                "Apple3": null,
                "Microsoft": null,
                "Google": 'https://placehold.it/250x250'
            },
            limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function(val) {
                // Callback function when value is autcompleted.
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
*/
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


