async function takes(){
    const response= await fetch("https://api.covid19api.com/countries")
    const countries =  await response.json()
    console.log(countries)
    for (i in countries){
    var x = document.createElement("BUTTON")
    x.style.width="23.2vw"
    x.style.overflow="auto"
    x.value=countries[i].Country
    x.onclick = function() { take(this.value); };
    x.appendChild(document.createTextNode((countries[i].Country)))
    document.getElementById('tabcontry').appendChild(x)
    document.getElementById('tabcontry').appendChild(document.createElement("BR"))
    }
}
let data
async function take(arg){
    const api_url="https://api.covid19api.com/live/country/"+arg+"/status/confirmed"
    const response= await fetch(api_url)
    data =  await response.json()
    console.log(data)
    draw_canva(data)
}
takes()
function draw_canva(arg){
    let confirmed_=[]
    for (i in arg){
        confirmed_.push(arg[i].Confirmed)
    }
    let active_=[]
    for (i in arg){
        active_.push(arg[i].Active)
    }
    let deaths_=[]
    for (i in arg){
        deaths_.push(arg[i].Deaths)
    }
    let recovered_=[]
    for (i in arg){
        recovered_.push(arg[i].Recovered)
    }
    let years=[]
    for (i in data){
        years.push(data[i].Date)
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    title: {
        text: "hey"
        },
    data: {
        labels: years,
  
        datasets: [{
            label: 'Confirmed',
            data: confirmed_,
            backgroundColor: 'rgba(166, 227, 46, 0.489) ',
            bordercolor:"#aaaa00",
            borderWidth: 5
        },{
            label: 'Active',
            data: active_,
            backgroundColor: '#ff000055',
            borderWidth: 1
        },{
            label: 'Deaths',
            data: deaths_,
            backgroundColor: 'yellow    ',
            borderWidth: 1
        },{
            label: 'Recovered',
            data: recovered_,
            backgroundColor: 'bluergba(198, 117, 12, 0.42)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}