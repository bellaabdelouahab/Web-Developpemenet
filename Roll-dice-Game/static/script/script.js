function hommy(){
    let c = document.getElementById('score')
    c.innerHTML="0"

}

function hommy1(){
    let luckynbr=Math.floor(Math.random()*6)
    while (luckynbr==0){
        luckynbr=Math.floor(Math.random()*6)
    }
    let a = document.getElementById("play3")
    let c = document.getElementById('score')
    let v=c.innerHTML
    v=parseInt(v,10)
    console.log(v)
    v=v+luckynbr
    if (luckynbr==1 || c.innerHTML=="Game Over"){
        c.innerHTML="Game Over"
        a.src="../static/images/dice-"+0+".png"
        v=0
    }
    else{
        c.innerHTML=v
        a.src="../static/images/dice-"+luckynbr+".png"
    }
}

function hommy2(){
    a.src="../static/images/dice-"+luckynbr+".png"
}
