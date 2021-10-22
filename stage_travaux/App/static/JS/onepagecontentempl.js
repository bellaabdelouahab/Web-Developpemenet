const admin_chose_add = document.querySelector(".admin_chose_add")
const admin_chose_del = document.querySelector(".admin_chose_del")
const admin_chose_change = document.querySelector(".admin_chose_change")
const admin_chose_cont = document.querySelector(".admin_chose_cont")
const test = document.querySelector(".admin_page_chose")
const admin_add = document.querySelector(".admin_add")
const admin_change = document.querySelector(".admin_change")
const admin_manage = document.querySelector(".admin_manage_price")
const admin_add_price = document.querySelector(".admin_add_price")
const pricess = document.querySelector(".packagetable")
// buttons
admin_add.classList.add("one")
test.onclick = function(e){
    if(e.target.className == 'add_button'){
        admin_chose_cont.classList.add("one")
        admin_chose_cont.classList.remove("two")
        admin_add.classList.add("one")
        admin_change.classList.remove("three")
        admin_add.classList.remove("after")
    }
    else if(e.target.className == 'change_button'){
        admin_chose_cont.classList.remove("one")
        admin_chose_cont.classList.add("two")
        admin_change.classList.add("three")
        admin_add.classList.remove("one")
        admin_add.classList.remove("after")
    }
    else if(e.target.id == 'Add'){
        admin_manage.classList.remove("one")
        admin_manage.classList.add("two")
        admin_add_price.classList.remove("two")
        admin_add_price.classList.add("one")
    }
}

function checkdate(){
    Date.prototype.getMonthName = function() {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[this.getMonth()];
    }
    let a= new Date
    month=new Date().getMonthName()
    let b=document.querySelectorAll("#current_date")
    let c=document.querySelectorAll("#change__")
    let d=document.querySelectorAll("#change_")
    console.log(c.length,d.length);
    for(var i=0 ; i< c.length; i++){
        console.log(a.getHours()-parseInt(b[i].innerHTML.slice(17,19)),month==b[i].innerHTML.slice(8,11),a.getDate()==parseInt(b[i].innerHTML.slice(5,7)));
        if((a.getHours()-parseInt(b[i].innerHTML.slice(17,19))<12)&&(month==b[i].innerHTML.slice(8,11))&&(a.getDate()==parseInt(b[i].innerHTML.slice(5,7)))){
            c[i].style.backgroundColor='green'
            c[i].style.cursor='pointer'
        }
        else{
            c[i].style.cursor='not-allowed'
            d[i].style.cursor='not-allowed'
            d[i].style.backgroundColor='gray'
        }
    }
}

function modify(e){
    console.log('done')
    
}

//console.log(Packages)
function search() {
    if(document.getElementById('table_content')){
        document.getElementById('packagetable').removeChild(document.getElementById('table_content'))
    }
    var table_titles = ['Changes','Empoloyer','Package ID','Sender Name','Sender Cin','Sender Adress','Sender Cellphone','Receiverr Name','Receiverr Cin','Receiverr Adress','Receiverr Cellphone','Date','Weight']
    var table_ = document.createElement('table')
    var x_=document.getElementById('packagetable')
    x_.appendChild(table_)
    table_.setAttribute('id','table_content')
    var table_row = document.createElement("TR");
    for (var i=0;i<table_titles.length;i++){
    var Table_header = document.createElement("TH");
        no_border=document.createElement('NOBR')
        no_border.innerHTML=table_titles[i];
        Table_header.appendChild(no_border)
        table_row.appendChild(Table_header);
        table_.appendChild(table_row)
    }
    var keys= Object.keys(Packages)
    for(var i=0 ; i<keys.length;i++){
        if(Packages[keys[i]][parseInt(document.getElementById('infos_').value)]==document.getElementById('searchpackage').value){
            var y = document.createElement("TR");
            y.setAttribute('id',('change'+i).toString())
            document.querySelector("#table_content").appendChild(y);
            var z = document.createElement("TD");
            //z.setAttribute("id",("lwa"+i).toString())
            x=document.createElement('NOBR');
            button= document.createElement('button')
            button.innerHTML="Modify"
            button.style.cursor='pointer'
            button.setAttribute('id','change__')
            button.setAttribute('class',('change'+i).toString())
            button.addEventListener('click',(e)=>{
                if (e.target.style.cursor=='not-allowed'){return false}
                admin_chose_cont.classList.add("one")
                admin_chose_cont.classList.remove("two")
                admin_add.classList.add("one")
                admin_change.classList.remove("three")
                admin_add.classList.remove("after")
                var d=document.getElementById(e.target.classList[0])
                var m=d.querySelectorAll("TD NOBR")
                var l=[]
                for (var j = 2; j< m.length; j++) {
                    l.push(m[j].innerHTML)
                }
                console.log(l)
                document.getElementById("weigth_info").value=l[10].toString()
                //   Sender information
                document.getElementById("_s_f").value=l[1].toString()
                document.getElementById("_s_c").value=l[2].toString()
                document.getElementById("_s_a").value=l[3].toString()
                document.getElementById("_s_p").value=l[4].toString()
                //   Recive information
                document.getElementById("_r_f").value=l[5].toString()
                document.getElementById("_r_c").value=l[6].toString()
                document.getElementById("_r_a").value=l[7].toString()
                document.getElementById("_r_p").value=l[8].toString()
                document.getElementById('PACKAGE_id').value=l[0].toString()
                
            })
            button.style.padding='4px'
            button.style.margin='0px'
            x.appendChild(button)
            button1= document.createElement('button')
            button1.innerHTML="Delete"
            button1.style.backgroundColor='red'
            button1.setAttribute('id','change_')
            button1.setAttribute('class',('change'+i).toString())
            button1.addEventListener('click',(e)=>{
                if (e.target.style.cursor=='not-allowed'){return false}
                console.log(e.target.classList[0]);
                var d=document.getElementById(e.target.classList[0])
                var m=d.querySelectorAll("TD NOBR")
                window.document.getElementById('delete').value=m[2].innerHTML
                console.log(m[2].innerHTML);
                console.log(document.getElementsByName('Delete_package'));
                document.getElementById('admin_successs').style.display = "block";
            })
            button1.style.cursor='pointer'
            button1.style.padding='4px'
            button1.style.margin='0px'
            x.appendChild(button1)
            
            
            z.appendChild(x)
            y.appendChild(z);
            table_.appendChild(y)
            for(var j=0 ; j<Packages[keys[i]].length;j++){
                var z = document.createElement("TD");
                x=document.createElement('NOBR')
                x.innerHTML=Packages[keys[i]][j];
                if(j==Packages[keys[i]].length-2){
                    x.setAttribute('id','current_date')
                }
                z.appendChild(x)
                y.appendChild(z);
                table_.appendChild(y)
            }
        }
    }
    document.getElementById('packagetable').style.overflow='auto'
    checkdate()
}

