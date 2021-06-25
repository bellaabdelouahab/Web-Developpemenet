document.write("EX 5<br>")
let a = (prompt("donnez un list des nomber distanie par les espace :"))
a = a.split(' ')
a = a.map(Number)
document.write(a + '    ' + a.length)

function sum(a) {
    let s = 0
    for (let i = 0; i < a.length; i++) {
        s += a[i]
    }
    return s
}
document.write("le sum de list est :" + sum(a) + '<br>')

function defmax(a) {
    let max_ = 0
    for (let i = 0; i < a.length - 1; i++) {
        if (max_ < a[i + 1] - a[i]) {
            max_ = a[i + 1] - a[i]
        }
        if (max_ < a[i] - a[i + 1]) {
            max_ < a[i] - a[i + 1]
        }
    }
    return max_
}
document.write("le dif maximal est :" + defmax(a) + '<br>')