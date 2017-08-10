$(document).ready(function() {
	$('.modal-trigger').leanModal( {
		complete: function() {
			$('#food_loader').css('opacity', '1');
			$('#food_loader').css('display', 'initial');
		}
	});

	// If click on send but delete yes check is not checked close the modal
	$('#delete_food form').submit(function(event) {
		if(document.getElementById("delete_food_yes").checked)
			return;

		$("#delete_food").closeModal();

		event.preventDefault();
	});

	$(".actions").on('click', 'a', function() {
		action = $(this).attr('href');
		id_food = $(this).parent().parent().children()[0].innerHTML;
		id_food = parseInt(id_food);

		if(action == '#delete_food') {
			name = $(this).parent().parent().children()[2].innerHTML;

			$("#delete_id_food").val(id_food);
			$("#delete_titulo").text('Se borrará "' + name + '"');

			$("#delete_food_yes").removeAttr('checked');
			$("#delete_food_no").attr('checked','');
		}
		else if(action == '#edit_food') {

			$.ajax({
				type: "GET",
				url: "/api/food/id/"+id_food,
				datatype: "json",
				success: function(jsondata) {
					$("#edit_id_food").val(id_food);

					$("#edit_name_food").val(jsondata.NAME);
					$("#edit_proteins_food").val(jsondata.PROTEINS);
					$("#edit_carbon_hydrates_food").val(jsondata.CARBON_HYDRATES);
					$("#edit_lipids_food").val(jsondata.LIPIDS);
                    $("#edit_kcal_table").val(jsondata.KCAL);
                    $("#edit_v_a_table").val(jsondata.V_A);
                    $("#edit_v_c_table").val(jsondata.V_C);
                    $("#edit_v_d_table").val(jsondata.V_D);
                    $("#edit_v_e_table").val(jsondata.V_E);
                    $("#edit_calcium_table").val(jsondata.CALCIUM);
                    $("#edit_iron_table").val(jsondata.IRON);
                    $("#edit_magnesium_table").val(jsondata.MAGNESIUM);
                    $("#edit_potassium_table").val(jsondata.POTASSIUM);
                    $("#edit_phosphorus_table").val(jsondata.PHOSPHORUS);
                    $("#edit_sodium_table").val(jsondata.SODIUM);
                    $("#edit_cholesterol_table").val(jsondata.CHOLESTEROL);
                    $("#edit_saturated_table").val(jsondata.SATURATED);





					$("#editFoodImgViewer").attr('src', jsondata.PHOTO);
					$("#edit_previous_photo_food").val(jsondata.PHOTO);

                    $("#editFoodImgViewer2").attr('src', jsondata.MIN_PHOTO);
                    $("#edit_previous_min_photo_food").val(jsondata.MIN_PHOTO);

                    $("#editFoodImgViewer3").attr('src', jsondata.MED_PHOTO);
                    $("#edit_previous_med_photo_food").val(jsondata.MED_PHOTO);

                    $("#editFoodImgViewer4").attr('src', jsondata.MAX_PHOTO);
                    $("#edit_previous_max_photo_food").val(jsondata.MAX_PHOTO);


					$('#food_loader').css('opacity', '0');
					setTimeout(function() { $('#food_loader').css('display', 'none'); }, 1000);
				},
				error : function(xhr, status) {
					console.log(xhr);
					console.log(status);
				}
			});


		}
	});
});

imagePrevisualization($('#add_photo_food'), $('#addfoodImgViewer'));
imagePrevisualization($('#edit_photo_food'), $('#editfoodImgViewer'));