const admin_chose_add = document.querySelector(".admin_chose_add")
const admin_chose_del = document.querySelector(".admin_chose_del")
const admin_chose_change = document.querySelector(".admin_chose_change")
const admin_chose_cont = document.querySelector(".admin_chose_cont")
const test = document.querySelector(".admin_page_chose")
const admin_add = document.querySelector(".admin_add")
const admin_del = document.querySelector(".admin_del")
const admin_change = document.querySelector(".admin_change")
const admin_success = document.querySelector(".admin_success")
const admin_success1 = document.querySelector(".admin_success1")
const admin_success2 = document.querySelector(".admin_success2")
const admin_manage = document.querySelector(".admin_manage_price")
const admin_add_price = document.querySelector(".admin_add_price")
// buttons
admin_add.classList.add("one")
admin_del.classList.remove("two")
admin_change.classList.remove("three")
admin_add_price.classList.add("one")
admin_manage.classList.add("one")
test.onclick = function(e){
    if(e.target.className == 'add_button'){
        admin_chose_cont.classList.add("one")
        admin_chose_cont.classList.remove("two")
        admin_chose_cont.classList.remove("three")
        admin_add.classList.add("one")
        admin_del.classList.remove("two")
        admin_change.classList.remove("three")
        admin_success.classList.remove("one")
        admin_success1.classList.remove("one")
        admin_success2.classList.remove("one")
        admin_add.classList.remove("after")
        admin_manage.classList.remove("two")
        admin_add_price.classList.remove("two")
    }
    else if(e.target.className == 'del_button'){
        admin_chose_cont.classList.add("two")
        admin_chose_cont.classList.remove("one")
        admin_chose_cont.classList.remove("three")
        admin_del.classList.add("two")
        admin_add.classList.remove("one")
        admin_change.classList.remove("three")
        admin_success.classList.remove("one")
        admin_success1.classList.remove("one")
        admin_success2.classList.remove("one")
        admin_add.classList.remove("after")
        admin_manage.classList.remove("two")
        admin_add_price.classList.remove("two")
    }
    else if(e.target.className == 'change_button'){
        admin_chose_cont.classList.add("three")
        admin_chose_cont.classList.remove("one")
        admin_chose_cont.classList.remove("two")
        admin_change.classList.add("three")
        admin_add.classList.remove("one")
        admin_del.classList.remove("two")
        admin_success.classList.remove("one")
        admin_success1.classList.remove("one")
        admin_success2.classList.remove("one")
        admin_add.classList.remove("after")
        admin_manage.classList.add("two")
        admin_add_price.classList.add("one")
    }
    else if(e.target.className == 'make_new'){
        admin_success.classList.add("after")
        admin_add.classList.remove("after")
        admin_success1.classList.remove("one")
        admin_success2.classList.remove("one")
    }
    else if(e.target.id == 'Manage'){
        admin_manage.classList.remove("two")
        admin_manage.classList.add("one")
        admin_add_price.classList.add("two")
        admin_add_price.classList.remove("one")
    }
    else if(e.target.id == 'Add'){
        admin_manage.classList.remove("one")
        admin_manage.classList.add("two")
        admin_add_price.classList.remove("two")
        admin_add_price.classList.add("one")
    }
}

function acc(x) {
    
    var username=document.getElementById('username')
    var cin=document.getElementById('cin')
    var Cin=document.getElementById('Cin')
    var email=document.getElementById('email')
    var password=document.getElementById('password')
    var cpassword=document.getElementById('cpassword')
    if (password.value != cpassword.value){
        cpassword.classList.add('error')
        cpassword.value = null
        password.value = null
        return 0
    }
    if (x.id=='add'){
        var user_score = {
            'changeingtype':'add',
            'username': username.value,
            'email': email.value,
            'password':password.value,
            'cin':cin.value
        }
    }
    else if(x.id=='del'){

        var user_score = {
            'changeingtype':'del',
            'cin':Cin.value
        }
    }
    else if(x.id=='addprc'){
        var p1=document.getElementById('p1')
        var p2=document.getElementById('p2')
        var p3=document.getElementById('p3')
        var p4=document.getElementById('p4')
        var p5=document.getElementById('p5')
        var p6=document.getElementById('p6')
        var user_score = {
            'changeingtype':'modify_prices',
            'priceID':'new',
            'p1':p1.value,
            'p2':p2.value,
            'p3':p3.value,
            'p4':p4.value,
            'p5':p5.value,
            'p6':p6.value,
            'activate':true
        }
    }
    else {
        var user_score = {
            'changeingtype':'modify_prices',
            'priceID':x.className,//need the id of price to activate
            'action':x.id //need thre type of action
        }
        if(x.id=='activate'){
            var active = document.querySelectorAll('#activate')
            for(var i=0;i< active.length;i++){
                active[i].innerHTML='Active'
            }
            x.innerHTML='Activated'
        }
        else{
            x.innerHTML='Deleted'
        }
        
    }
    var request = new XMLHttpRequest()
    request.open('POST', `/${JSON.stringify(user_score)}`)
    request.onload = () => {
        var data = request.responseText
        if(JSON.stringify(data)=='"false\\n"'){
            if(x.id=='add'){
                admin_success.getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML='Some of your informations are missing'
                admin_success.getElementsByTagName('div')[0].getElementsByTagName('h5')[0].innerHTML=''
            }
            else if(x.id=='del'){
            admin_success1.getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML='This Account Does Not Existe'
            admin_success1.getElementsByTagName('div')[0].getElementsByTagName('h5')[0].innerHTML=''
            }
            else if(x.id=='addprc'){
                admin_success2.getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML='Some of your informations are missing'
                admin_success2.getElementsByTagName('div')[0].getElementsByTagName('h5')[0].innerHTML='The price has not been added'
            }
        }
        else{
            if(x.id=='add'){
                admin_success.getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML='YOUR ACCONT HASE BEEN CREATE SUCCESSFULY'
                admin_success.getElementsByTagName('div')[0].getElementsByTagName('h5')[0].innerHTML='This Persnon Now Can Access To Your System Whit This Account'

            }
            else if(x.id=='del'){
                admin_success1.getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML='THIS ACCONT HASE BEEN DETELED SUCCESSFULY'
                admin_success1.getElementsByTagName('div')[0].getElementsByTagName('h5')[0].innerHTML='This Persnon Now Can Not Access To Your System Whit This Account'
            }
            else if(x.id=='addprc'){
                admin_success2.getElementsByTagName('div')[0].getElementsByTagName('h3')[0].innerHTML='THE PRICE HAS BEEN ADDED AND ACTIVATED'
                admin_success2.getElementsByTagName('div')[0].getElementsByTagName('h5')[0].innerHTML=''
            }
        }
    }
    request.send()
    
    
    if(x.id=='add'){
        admin_add.classList.add("after")
        admin_success.classList.add("one")
    }
    else if(x.id=='del'){
        admin_success1.classList.add("one")
    }
    else if(x.id=='addprc'){
        admin_success2.classList.add("one")
    }
}


