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
