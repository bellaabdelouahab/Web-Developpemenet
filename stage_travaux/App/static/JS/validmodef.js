
let a= new Date
let b=document.querySelectorAll("#current_date")
for(let i=0 ; i< b.length; i++){
    console.log(a,(a.getFullYear()==b[i].innerHTML.slice(0,4)),(a.getMonth()+1==b[i].innerHTML.slice(6,7)),a.getDate(),b[i].innerHTML.slice(9,10),a.getHours(),parseInt(b[i].innerHTML.slice(10,13),12))
    if((a.getFullYear()==b[i].innerHTML.slice(0,4))&&(a.getMonth()+1==b[i].innerHTML.slice(6,7))&&(a.getDate()==b[i].innerHTML.slice(8,10))&&(a.getHours()-parseInt(b[i].innerHTML.slice(10,13))<12)){
        b[i].style.color='green'
        b[i].style.cursor='pointer'
    }
    else{
        b[i].style.color='red'
        b[i].style.cursor='not-allowed'
    }
}
function Modefy(e){
    if(e.style.cursor!='not-allowed'){
        document.getElementById(e.className+'h').value=e.className
        document.getElementById(e.className).submit()
    }
}
