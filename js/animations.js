window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header-menu").style.backgroundColor = "Black";
    document.getElementById("lizuniaga-logo").style.maxWidth = "10%";
    document.getElementById("header-menu").style.flexDirection = "row";
    
} 
else {
    document.getElementById("header-menu").style.backgroundColor = "transparent";
    document.getElementById("lizuniaga-logo").style.maxWidth = "7%";
    document.getElementById("header-menu").style.flexDirection = "column";
    var x = window.matchMedia("(max-width: 768px)")
    myFunction(x);
}
}

function myFunction(x) {
    if (x.matches) { // If media query matches
        document.getElementById("lizuniaga-logo").style.maxWidth = "25%";
    }
}

document.getElementById('show-reservation-form').addEventListener('click', function(event) {
    event.preventDefault(); // Previene que el enlace haga un salto a la parte superior de la página.
    reservaForm(); // Llama a la función reservaForm para mostrar el formulario.
});

// Define la función reservaForm.
function reservaForm() {
    // Muestra el formulario de reserva.
    document.getElementById('reservation-form-container').style.display = 'flex';
}

function cerrarReservaForm(){
    var modal = document.getElementById("reservation-form-container");
    modal.style.display = "none";
        
}

