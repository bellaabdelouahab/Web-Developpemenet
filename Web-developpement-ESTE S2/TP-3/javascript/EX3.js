document.write("EX 3<br>")
let a = Number(prompt("donnez le 1er nomber :"))
let b = Number(prompt("donnez le 2eme nomber :"))
let c = Number(prompt("donnez le 3eme nomber :"))

function grand(a, b, c) {
    if (a >= b && a >= c) {
        return a
    }
    if (b >= c && b >= a) {
        return b
    }
    if (c >= b && c >= a) {
        return c
    }
}
document.write("le plus grand nomber de les trois est : " + grand(a, b, c) + '<br>')
let d = Number(prompt("donnez le 1er nomber :"))
let e = Number(prompt("donnez le 2eme nomber :"))

function sum(d, e) {
    return d + e
}

function triple(d) {
    return (sum(d, d) * 3)
}
document.write("le sum de les deux nomber est :" + sum(d, e) + '<br>')
if (d == e) {
    document.write('le triple de sum est :' + triple(d) + '<br>')
}