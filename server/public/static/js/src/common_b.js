$(document).ready(function() {
	// Initialize Hamburger menu for mobiles
	$(".button-collapse").sideNav();

	var pathname = window.location.pathname;

	var active_li;

	if(pathname.indexOf('patients') > 0)
		active_li = setActiveLi("Pacientes");
	else if (pathname.indexOf('foods') > 0)
		active_li = setActiveLi("Alimentos");
	else if (pathname.indexOf('rda') > 0)
		active_li = setActiveLi("Tablas CDR");
	else if (pathname.indexOf('activityLogs') > 0)
		active_li = setActiveLi("Histórico");
	else if (pathname.indexOf('users') > 0)
		active_li = setActiveLi("Nutricionistas");
	else{

        active_li = setActiveLi("Inicio");

	}

});

function setActiveLi(section) {
	$('#slide-out li a').each(function() {
		if($(this).text() === section) {
			element = $(this).parent();
			element.attr("class", "active");
		}
	});
}
