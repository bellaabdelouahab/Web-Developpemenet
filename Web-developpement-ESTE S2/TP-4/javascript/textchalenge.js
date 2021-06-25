a = ['fgdfg dfgdsfg dfg dfgdfsgdsfg dsfgds fgsdf gds gs',
    "BlackMouse that's what you should do. But better you post what you have tried here./n So people can decide where you need help./n If you want a better way,/n your question should go to codereview./n – Mritunjay Jan 13 '16 at 12:33",
    'ddddddddddddddddddd dddddddddddd dddddddddddddddddddd  dddddddddddddd ddddddddddddd',
    'hello there can yo u write this in 2s'
]
let index = Math.floor(Math.random() * a.length)
console.log(a[index])
document.getElementById('textdis').innerHTML = a[index]
let x = 0

function damn() {

    b = document.getElementById('textinput').value
    if (isright(b)) {
        document.getElementById('textinput').style.borderColor = 'red'
    } else {
        document.getElementById('textinput').style.borderColor = 'blue'
    }
    if ((b.length == a[index].length) && (!isright(b))) {
        alert("you win")
        return 0;
    }
    if ((b.length > 0) || (x == 1)) {
        x = 1
        began()
    }
    setTimeout('damn()', 100)

}

function isright(b) {
    c = Array.from(a[index])
    for (let i = 0; i < b.length; i++) {
        if (c[i] != b[i]) {
            console.log(c[i], b[i])
            return true
        }
    }
}

let t_imea = 0

function began() {
    t_imea++
    t_ime = parseInt(t_imea * 10, 10)
    let sec = ''
    let hour = ''
    let min = ''
    t_ime / 3600 < 10 ? hour = '0' : hour = '';
    t_ime / 60 < 10 ? min = '0' : min = '';
    t_ime < 10 ? sec = '0' : sec = '';
    document.getElementById('counter').innerHTML = hour + parseInt(t_ime / 6000, 10) + ' : ' + min + parseInt(t_ime / 100 % 60, 10) + ' : ' + sec + parseInt(t_ime % 100, 10)
}
damn()

function redo() {
    t_imea = 0
    document.getElementById('counter').innerHTML = '00 : 00 : 00'
    index = Math.floor(Math.random() * a.length)
    console.log(a[index])
    document.getElementById('textdis').innerHTML = a[index]
    document.getElementById('textinput').value = null
    x = 0
    damn()
}