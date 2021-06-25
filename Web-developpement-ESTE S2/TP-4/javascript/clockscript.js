var deg = 1
var second = document.getElementById('rect518');
var minutes = document.getElementById('rect516');
var houres = document.getElementById('rect514');

function myFunction() {
    second.style.transform = "rotate(" + deg + "deg)";
    second.style.transformOrigin = "50% 40%"
    minutes.style.transform = "rotate(" + deg / 60 + "deg)";
    minutes.style.transformOrigin = "50% 40%"
    houres.style.transform = "rotate(" + deg / 3600 + "deg)";
    houres.style.transformOrigin = "50% 40%"
    deg = deg + 6;
    setTimeout("myFunction()", 1000);
}
myFunction()