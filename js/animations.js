// Header background is controlled by CSS in layout.css.

var reservationLink = document.getElementById("show-reservation-form");
if (reservationLink) {
    reservationLink.addEventListener("click", function (event) {
        event.preventDefault();
        reservaForm();
    });
}

// Define la función reservaForm.
function reservaForm() {
    var reservationContainer = document.getElementById("reservation-form-container");
    if (reservationContainer) {
        reservationContainer.style.display = "flex";
    }
}

function cerrarReservaForm(){
    var modal = document.getElementById("reservation-form-container");
    if (modal) {
        modal.style.display = "none";
    }
        
}

