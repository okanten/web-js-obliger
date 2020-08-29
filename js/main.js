var $ = function(id) {
    return document.getElementById(id);
}

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

window.addEventListener("load", function() {
    updateTime();
    setInterval(updateTime, 1000);
    getRes();
});

function updateTime() {
    var updateToday = new Date();
    var time = ["0" + updateToday.getHours(), "0" + updateToday.getMinutes(), "0" + updateToday.getSeconds()];
    $("date").innerHTML = days[ updateToday.getDay() ] + " " + updateToday.getDate() + " " + months[ updateToday.getMonth() ] + " " + time[0].slice(-2) + ":" + time[1].slice(-2) + ":" + time[2].slice(-2);
}

function getRes() {
    // Blir brukt til å sette brukeren sin resolution i neofetch-feltet.
    $("res").innerHTML = window.screen.width + "x" + window.screen.height;
}
