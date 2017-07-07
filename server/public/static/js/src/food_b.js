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


					$("#editFoodImgViewer").attr('src', jsondata.PHOTO);
					$("#edit_previous_photo_food").val(jsondata.PHOTO);


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