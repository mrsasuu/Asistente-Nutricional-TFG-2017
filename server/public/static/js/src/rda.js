

$(document).ready(function() {
	$('.modal-trigger').leanModal( {
		complete: function() {
			$('#rda_loader').css('opacity', '1');
			$('#rda_loader').css('display', 'initial');
		}
	});


	// If click on send but delete yes check is not checked close the modal
	$('#delete_user form').submit(function(event) {
		if(document.getElementById("delete_user_yes").checked)
			return;

		$("#delete_user").closeModal();

		event.preventDefault();
	});

	$(".actions").on('click', 'a', function() {
		action = $(this).attr('href');
		rda_id = $(this).parent().parent().children()[0].innerHTML;
		$("#edit_id_rda").val(rda_id);
		//id_user = parseInt(id_user);

		if(action == '#delete_rda') {
			var nameTable = $(this).parent().parent().children()[1].innerHTML;

			$("#delete_id_rda").val(rda_id);
			$("#delete_titulo").text('Se borrará la tabla "' + nameTable + '"');

			$("#delete_rda_yes").removeAttr('checked');
			$("#delete_rda_no").attr('checked','');
		}
		else if(action == '#edit_rda') {
			$.ajax({
				type: "POST",
				url: "/backend/rda/get",
				data:{id_rda: rda_id},
				success: function(jsondata) {
					//$("#edit_id_user").val(id_user);

					$("#edit_name_rda").val(jsondata.NAME);
                    $("#edit_min_age_range_rda").val(jsondata.MIN_AGE);
                    $("#edit_max_age_range_rda").val(jsondata.MAX_AGE);

                    var gender = jsondata.GENDER;

                    var activity = parseInt(jsondata.ACTIVITY_LEVEL);
                    $("#edit_activity_level_rda_1").removeAttr('checked');
                    $("#edit_activity_level_rda_2").removeAttr('checked');
                    $("#edit_activity_level_rda_3").removeAttr('checked');
                    $("#edit_activity_level_rda_4").removeAttr('checked');

                    switch(activity){
                        case 0:
                            $("#edit_activity_level_rda_1").prop('checked', true);
                            break;
                        case 1:
                            $("#edit_activity_level_rda_2").prop('checked', true);
                            break;
                        case 2:
                            $("#edit_activity_level_rda_3").prop('checked', true);
                            break;
                        case 3:
                            $("#edit_activity_level_rda_4").prop('checked', true);
                            break;
                    }

                    if(gender){
                        $("#edit_rda_female").prop('checked', true);
                    }else{
                        $("#edit_rda_male").prop('checked', true);
                    }


					$("#edit_kcal_table").val(jsondata.KCAL);
                    $("#edit_proteins_table").val(jsondata.PROTEINS);
                    $("#edit_lipids_table").val(jsondata.LIPIDS);
                    $("#edit_carbon_hydrates_table").val(jsondata.CARBON_HYDRATES);
                    $("#edit_percentage_proteins_table").val(jsondata.PROTEINS_PERCENTAGE);
                    $("#edit_percentage_lipids_table").val(jsondata.LIPIDS_PERCENTAGE);
                    $("#edit_percentage_carbon_hydrates_table").val(jsondata.CARBON_HYDRATES_PERCENTAGE);
                    $("#edit_v_a_table").val(jsondata.V_A);
                    $("#edit_v_c_table").val(jsondata.V_C);
                    $("#edit_v_d_table").val(jsondata.V_D);
                    $("#edit_v_e_table").val(jsondata.V_E);
                    $("#edit_calcium_table").val(jsondata.CALCIUM);
                    $("#edit_magnesium_table").val(jsondata.MAGNESIUM);
                    $("#edit_potassium_table").val(jsondata.POTASSIUM);
                    $("#edit_phosphorus_table").val(jsondata.PHOSPHORUS);
                    $("#edit_sodium_table").val(jsondata.SODIUM);
                    $("#edit_cholesterol_table").val(jsondata.CHOLESTEROL);
                    $("#edit_saturated_table").val(jsondata.SATURATED);

					// marcamos el input type radio a la opcion correcta
					var admin = parseInt(jsondata.ADMIN);
					$("#edit_admin_yes").removeAttr('checked');
					$("#edit_admin_no").removeAttr('checked');

					if(admin)
						$("#edit_admin_yes").prop('checked', true);
					else
						$("#edit_admin_no").prop('checked', true);

					$('#user_loader').css('opacity', '0');
					setTimeout(function() { $('#user_loader').css('display', 'none'); }, 1000);
				},
				error : function(xhr, status) {
					console.log(xhr);
					console.log(status);
				}
			});
		}
	});
});

imagePrevisualization($('#add_photo_user'), $('#addUserImgViewer'));
imagePrevisualization($('#edit_photo_user'), $('#editUserImgViewer'));