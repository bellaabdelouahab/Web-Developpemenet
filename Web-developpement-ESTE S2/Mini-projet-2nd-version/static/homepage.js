let i =0
let b=55
while (true){
    if (document.getElementById('infos'+i+'id')){
        let a=document.getElementById(('infos'+i+'id'))
        a.style.opacity=0
        a.style.top = b+"px"
    }
    else {
        break
    }
    b+=27.1
    i++
}
function hovering(c){
    country=c.value
    console.log(country)
    a = document.getElementById(c.id+'id')
    if (a==null){
        return 0;    
    }
    a.style.opacity='1'
    setTimeout(normal,5000,c.id)
    document.getElementById(c.id).addEventListener('mouseout',call)
    function call(){
        normal(c.id)
    }
    take(country,c.id)
}
function normal(x){document.getElementById(x+'id').style.opacity='0'
}
async function take(arg,s){
    const api_url="https://api.covid19api.com/live/country/"+arg+"/status/confirmed"
    const response= await fetch(api_url)
    data =  await response.json()
    console.log(data)
    document.getElementById(s+'id').innerHTML='deaths : '+data[100].Deaths+"<br>active :"+data[100].Active+"<br> Recovered :"+data[100].Recovered+"<br> Confirmed :"+data[100].Confirmed
}
/*if (document.getElementsByClassName("artic").style.opacity==0.99){
    console.log("nice")
}*/
console.log('heyyyy')
document.getElementById("BUTTON").getAttribute()