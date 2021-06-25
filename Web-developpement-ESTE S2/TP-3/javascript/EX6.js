t = [1, 2, 3, 4, 5]
let a = prompt("donnez le nomber")
document.write(t)

function changer(t, a) {
    for (let i = 0; i < 5; i++) {
        t[i] = a
    }
    return t
}
document.write("done :<br>" + changer(t, a))

function diagonal(d) {
    for (let i = 0; i < d.length; i++) {
        for (let j = 0; j < d.length; j++) {
            if (i === j) {
                if (d[i][j] != 0) {
                    return 'false'

                }
            }
        }
    }
    return 'true'
}
d = [
    [0, 1, 2, 3, 4],
    [1, 0, 2, 3, 4],
    [1, 2, 0, 3, 4],
    [1, 2, 3, 0, 4],
    [1, 2, 3, 4, 0]
]
document.write(diagonal(d))