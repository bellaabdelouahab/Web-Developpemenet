let luckynbr=Math.floor(Math.random()*10)
let d=document.getElementById("lplay")
d.innerHTML='Give a number between '
function runluck(x){
    let a=x.value
    let texts=document.getElementById(a).valuefgtr
    console.log(luckynbr+'  g   '+texts)
    texts=parseInt(texts)
    if (texts==luckynbr){
        console.log('heyyyyyyyyyyyyy')
        document.getElementById('play').innerHTML='Good job'
    }


}