let i = 0
document.getElementById('hell').setAttribute('height', document.getElementById("nope").scrollHeight)
document.getElementById('hell').setAttribute('width', document.getElementById("nope").scrollWidth)

function damn() {
    document.addEventListener('mousemove', showCoords);
    setTimeout("damn()", 1000)
    i++
    if (i == 100) {
        return 0;
    }
}

function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    document.getElementById("texthey").setAttribute('cx', document.getElementById("nope").scrollWidth - x);
    document.getElementById("texthey").setAttribute('cy', document.getElementById("nope").scrollHeight - y);
    check_over(x, document.getElementById("nope").scrollWidth - x, y, document.getElementById("nope").scrollHeight - y)
}
damn()

function check_over(x, x1, y, y1) {
    if (((x1 - 45 < x) && (x1 + 45 > x)) && ((y1 - 45 < y) && (y1 + 45 > y))) {
        document.getElementById("texthey").setAttribute('fill', 'red')
    } else {
        document.getElementById("texthey").setAttribute('fill', '#000000')
    }
}