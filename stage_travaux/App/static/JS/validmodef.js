
let a= new Date
let b=document.querySelectorAll("#current_date")
for(let i=0 ; i< b.length; i++){
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
        document.getElementById("neww").style.display='block'
        console.log(e.className)
        document.getElementById("modi").value=e.className
    }
}
