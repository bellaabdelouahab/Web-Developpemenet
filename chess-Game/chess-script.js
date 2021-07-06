let allids=[]
let listo=['a','b','c','d','e','f','g','h']
let mover_=0
let check_white_king=false
let check_black_king=false
let G_validmoves=[]
let turn=1

for (var i=1;i<9;i++){
    id=[]
    for(var j=0;j<8;j++ ){
        s=document.querySelectorAll('#I'+i+listo[j]+' img')[0].src
        id.push([s,'#I'+i+listo[j]])
    }
    allids.push(id)
}
console.log(allids)
function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
        for(var j=0;j<arr[i].length;j++){
            var index = arr[i][j].indexOf(k);
            if (index > -1) {
            return [i,j];
            }
        }
    }
    }

function check_prmotion(a,disti,ncord){
    for (var i=0;i<8;i++){
        if(allids[0][i][0][24]=='p'){
            b=prompt("what do you want to premote to?")
            a[0]=a[0]+'-'+b+'.png'
            changeplace(a,disti,ncord,ncord)
        }
        if(allids[7][i][0][24]=='p'){
            b=prompt("what do you want to premote to?")
            a[0]=a[0]+'-'+b+'.png'
            changeplace(a,disti,ncord,ncord)
        }
    }
}
function checkempty(e,peice=false){
    if(peice){
        return allids[e[0]][e[1]][0][22]==peice||allids[e[0]][e[1]][0]=='http://127.0.0.1:5500/chess.html'
    }
    return allids[e[0]][e[1]][0]=='http://127.0.0.1:5500/chess.html'
}
function movep(a,ocord){
    var validmoves=[]
    a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
    if(checkempty([ocord[0]+1*d,ocord[1]])){
        validmoves.push([ocord[0]+1*d,ocord[1]])
    }
    if(ocord[1]+1<8&&allids[ocord[0]+1*d][ocord[1]+1][0][22]==t){
        validmoves.push([ocord[0]+1*d,ocord[1]+1])
    }
    if(ocord[1]-1>=0&&allids[ocord[0]+1*d][ocord[1]-1][0][22]==t){
        validmoves.push([ocord[0]+1*d,ocord[1]-1])
    }
    if(a[1][2]=='7'&&a[0][22]=='B'&&checkempty([ocord[0]-2,ocord[1]])){
        validmoves.push([ocord[0]-2,ocord[1]])
    }
    if(a[1][2]=='2'&&a[0][22]=='W'&&checkempty([ocord[0]+2,ocord[1]])){
        validmoves.push([ocord[0]+2,ocord[1]])
    }
    return validmoves
}
function mover(a,ocord){
    var validmoves=[]
    a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
    var vm=true
    var hm=true
    for(var j=-1;j<2;j+=2){
        vm=hm=true
        for(var i=1;i<8;i++){
            if((!(ocord[0]+i*j<8&&ocord[0]+i*j>=0)||!checkempty([ocord[0]+i*j,ocord[1]]))&&vm!=false){
                vm=false
                if(ocord[0]+i*j<8&&ocord[0]+i*j>=0){
                    if(allids[ocord[0]+i*j][ocord[1]][0][22]==t){
                        validmoves.push([ocord[0]+i*j,ocord[1]])
                        vm=false
                    }
                }  
            }
            if(vm){
                validmoves.push([ocord[0]+i*j,ocord[1]])

            }
            if((!(ocord[1]+i*j<8&&ocord[1]+i*j>=0)||!checkempty([ocord[0],ocord[1]+i*j]))&&hm!=false){
                hm=false
                if(ocord[1]+i*j<8&&ocord[1]+i*j>=0){
                    if(allids[ocord[0]][ocord[1]+i*j][0][22]==t){
                        validmoves.push([ocord[0],ocord[1]+i*j])
                        hm=false
                    }
                }              
            }

            if(hm){
                validmoves.push([ocord[0],ocord[1]+i*j])
            }
        }
    }
    return validmoves
}
function moven(a,ocord){
    var validmoves=[]
    a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
    for(var i=-2;i<5;i+=4){ 
        if(!((ocord[0]+1>=8)||(ocord[1]+i>=8||ocord[1]+i<0))&&checkempty([ocord[0]+1,ocord[1]+i],t)){
            validmoves.push([ocord[0]+1,ocord[1]+i])
        }
        if(!((ocord[0]-1<0)||(ocord[1]+i>=8||ocord[1]+i<0))&&checkempty([ocord[0]-1,ocord[1]+i],t)){
            validmoves.push([ocord[0]-1,ocord[1]+i])
        }
        if(!((ocord[0]+i>=8||ocord[0]+i<0)||(ocord[1]+1>=8))&&checkempty([ocord[0]+i,ocord[1]+1],t)){
            validmoves.push([ocord[0]+i,ocord[1]+1])
        }
        if(!((ocord[0]+i>=8||ocord[0]+i<0)||(ocord[1]-1<0))&&checkempty([ocord[0]+i,ocord[1]-1],t)){
            validmoves.push([ocord[0]+i,ocord[1]-1])
        }
    }
    return validmoves
}
function moveb(a,ocord){
    var validmoves=[]
    a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
    var vm=true
    var hm=true
    for(var j=-1;j<2;j+=2){
        vm=hm=true
        for(var i=1;i<8;i++){
            if((!(ocord[0]+i*j<8&&ocord[0]+i*j>=0&&ocord[1]+i*j<8&&ocord[1]+i*j>=0)||!checkempty([ocord[0]+i*j,ocord[1]+i*j]))&&vm!=false){
                vm=false
                if(ocord[0]+i*j<8&&ocord[0]+i*j>=0&&ocord[1]+i*j<8&&ocord[1]+i*j>=0){
                    if(allids[ocord[0]+i*j][ocord[1]+i*j][0][22]==t){
                        validmoves.push([ocord[0]+i*j,ocord[1]+i*j])
                    }
                }
            }
            if(vm){
                validmoves.push([ocord[0]+i*j,ocord[1]+i*j])
            }
            if((!(ocord[0]+i*j<8&&ocord[0]+i*j>=0&&ocord[1]-i*j<8&&ocord[1]-i*j>=0)||!checkempty([ocord[0]+i*j,ocord[1]-i*j]))&&hm!=false){
                hm=false
                if(ocord[0]+i*j<8&&ocord[0]+i*j>=0&&ocord[1]-i*j<8&&ocord[1]-i*j>=0){
                    if(allids[ocord[0]+i*j][ocord[1]-i*j][0][22]==t){
                        validmoves.push([ocord[0]+i*j,ocord[1]-i*j])
                    }
                }
            }
            if(hm){
                validmoves.push([ocord[0]+i*j,ocord[1]-i*j])
            }
        }
    }
    return validmoves
}
function moveQ(a,ocord){
    var validmoves=[]
    validmoves=validmoves.concat(moveb(a,ocord))
    validmoves=validmoves.concat(mover(a,ocord))
    validmoves=validmoves.concat(movek(a,ocord))
    return validmoves
}
function movek(a,ocord){
    var validmoves=[]
    a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
    function sumpliking(x,y){
        if((ocord[0]+x<8&&ocord[0]+x>=0&&ocord[1]+y<8&&ocord[1]+y>=0)&&(checkempty([ocord[0]+x,ocord[1]+y])||allids[ocord[0]+x,ocord[1]+y][0][22]==t)){
            validmoves.push([ocord[0]+x,ocord[1]+y])
        }
    }
    sumpliking(1,1)
    sumpliking(-1,-1)
    sumpliking(1,-1)
    sumpliking(-1,1)
    sumpliking(0,1)
    sumpliking(0,-1)
    sumpliking(-1,0)
    sumpliking(1,0)
    return validmoves
}
function remove_invalide_moves(){
    for(var i=0;i<8;i++){

    }
}
function testpieces(mover1){
    if(mover1[0][24]=='p'){
        validmoves=movep(mover1,getIndexOfK(allids,mover1[1]))
    }
    else if(mover1[0][24]=='r'){
        validmoves=mover(mover1,getIndexOfK(allids,mover1[1]))
    }
    else if(mover1[0][24]=='n'){
        validmoves=moven(mover1,getIndexOfK(allids,mover1[1]))
    }
    else if(mover1[0][24]=='b'){
        validmoves=moveb(mover1,getIndexOfK(allids,mover1[1]))
    }
    else if(mover1[0][24]=='Q'){
        validmoves=moveQ(mover1,getIndexOfK(allids,mover1[1]))
    }
    else if(mover1[0][24]=='k'){
        validmoves=movek(mover1,getIndexOfK(allids,mover1[1]))
    }
    else {
        validmoves=false
        console.log('notfound'+mover1[0][24])
    }
    return validmoves
}
function checking(validmoves1,validmoves2,peice){
    for (var i=0;i<validmoves1.length;i++){
        if(allids[validmoves1[i][0]][validmoves1[i][1]][0][22]=='B'){
            if(allids[validmoves1[i][0]][validmoves1[i][1]][0][24]==peice){
                console.log('white king is checked!!!!,by:',peice)
                check_white_king=true
            }
        }
    }
    for (var i=0;i<validmoves2.length;i++){
        if(allids[validmoves2[i][0]][validmoves2[i][1]][0][22]=='W'){
            if(allids[validmoves2[i][0]][validmoves2[i][1]][0][24]==peice){
                console.log('black king is checked!!!!,by:',peice)
                check_black_king=true
            }
        }
    }
    if(peice=='n')
    console.log(validmoves1)
}
function is_the_king_checked(){
    for(var i=0 ;i<8;i++){
        for(var j=0;j<8;j++){
            if('http://127.0.0.1:5500/W-k.png'===allids[i][j][0]){
                mover1=allids[i][j]
            }
            if('http://127.0.0.1:5500/B-k.png'===allids[i][j][0]){
                mover2=allids[i][j]
            }
        }
    }
    checking(moveQ(mover1,getIndexOfK(allids,mover1[1])),moveQ(mover2,getIndexOfK(allids,mover2[1])),'Q')
    checking(mover(mover1,getIndexOfK(allids,mover1[1])),mover(mover2,getIndexOfK(allids,mover2[1])),'r')
    checking(moveb(mover1,getIndexOfK(allids,mover1[1])),moveb(mover2,getIndexOfK(allids,mover2[1])),'b')
    checking(moven(mover1,getIndexOfK(allids,mover1[1])),moven(mover2,getIndexOfK(allids,mover2[1])),'n')
    checking(movep(mover1,getIndexOfK(allids,mover1[1])),movep(mover2,getIndexOfK(allids,mover2[1])),'p')
    checking(movek(mover1,getIndexOfK(allids,mover1[1])),movek(mover2,getIndexOfK(allids,mover2[1])),'k')
    if(check_black_king==true){
        return 'B'
    }
    if(check_white_king==true){
        return 'W'
    }
}
function getvalidemoves(id){
    var mover1=false
   for(var i=0 ;i<8;i++){
        for(var j=0;j<8;j++){
            if(document.querySelectorAll("#"+id+' img')[0].src===allids[i][j][0]&&'#'+id==allids[i][j][1]){
                mover1=allids[i][j]
            }
        }
    }
    return testpieces(mover1)
}
function changeplace1(ocord,ncord){
    let new_1= allids[ocord[0]][ocord[1]][0]
    allids[ocord[0]][ocord[1]][0]=allids[ncord[0]][ncord[1]][0]
    allids[ncord[0]][ncord[1]][0]=new_1
}
function changeplace(a,disti,ncord){
    let new_=allids[ncord[0]][ncord[1]][0]
    document.querySelectorAll(a[1]+' img')[0].src='http://127.0.0.1:5500/chess.html'
    document.querySelectorAll("#"+disti+' img')[0].src=new_
    
}
function set_guide(current_move,G_validmoves,class_,border,target){    
    for(var i=0;i<G_validmoves.length;i++)
    if(!(false===G_validmoves[i][0])){
        if(allids[G_validmoves[i][0]][G_validmoves[i][1]][0][22]!=target){
            document.querySelector(allids[G_validmoves[i][0]][G_validmoves[i][1]][1]).className=class_
        }
        else{
            document.querySelector(allids[G_validmoves[i][0]][G_validmoves[i][1]][1]+' div').style.border=border+'vw solid rgba(36, 244, 43, 0.509)'
        }
        document.querySelectorAll('#'+current_move+' div')[0].style.border=border+'vw solid rgba(36, 244, 43, 0.509)'
    }
}
function rotatebord(){
    if(turn==1){
        console.log('done')
        document.getElementById('container').className ='rotate';
        var x=document.getElementsByTagName('img')
        for(var i=0;i<64;i++)
            x[i].className = "rotate";
    }
    else{
        document.getElementById('container').className="rerotate";
        var x=document.getElementsByTagName('img')
        for(var i=0;i<64;i++)
            x[i].className = "rerotate";
    }
}
let current_move=false
function move(e){
    turn==1?(t='W',h="B"):(t='B',h="W");
    if(document.querySelectorAll("#"+e.id+' img')[0].src[22]==t&&current_move!=false){
        mover_=0
        set_guide(current_move,G_validmoves,'',0,h)
        G_validmoves=[]
    }
    if (mover_==0){
        if(document.querySelectorAll("#"+e.id+' img')[0].src[22]==t){
            for(var i=0 ;i<8;i++)
            for(var j=0;j<8;j++){
                if(document.querySelectorAll("#"+e.id+' img')[0].src===allids[i][j][0]&&'#'+e.id==allids[i][j][1]){
                    mover_=allids[i][j]
                }
            }
        G_validmoves=getvalidemoves(e.id)
        ch=mover_[0][22]
        console.log(G_validmoves)
        if(turn==1){
            if(check_white_king==true){
                t1=G_validmoves.length
                for(var i=0;i<t1;i++){
                    check_white_king=false
                    console.log('been here=>',i+1)
                    changeplace1(getIndexOfK(allids,mover_[1]),G_validmoves[i])
                    if(is_the_king_checked()=='W'){
                        changeplace1(G_validmoves[i],getIndexOfK(allids,mover_[1]))
                        G_validmoves[i]=[false,false]
                    }
                    else{
                        changeplace1(G_validmoves[i],getIndexOfK(allids,mover_[1]))
                    }
                }
                check_white_king=true
            }
        }
        else{
            if(check_black_king==true){
                t1=G_validmoves.length
                for(var i=0;i<t1;i++){
                    check_black_king=false
                    console.log('been here=>',i+1)
                    changeplace1(getIndexOfK(allids,mover_[1]),G_validmoves[i])
                    if(is_the_king_checked()=='V'){
                        changeplace1(G_validmoves[i],getIndexOfK(allids,mover_[1]))
                        G_validmoves[i]=[false,false]
                    }
                    else{
                        changeplace1(G_validmoves[i],getIndexOfK(allids,mover_[1]))
                    }
                }
                check_black_king=true
            }
        }
        console.log(G_validmoves)
        current_move=e.id
        set_guide(current_move,G_validmoves,'Draw_valide_move',0.35,h)
        }
    }
    else{
        promotype='http://127.0.0.1:5500/'+mover_[0][22]
        for(var i=0;i<G_validmoves.length;i++){
            if(G_validmoves[i][0]==getIndexOfK(allids,'#'+e.id)[0]&&G_validmoves[i][1]==getIndexOfK(allids,'#'+e.id)[1]){
                set_guide(current_move,G_validmoves,'',0,h)
                changeplace1(getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
                changeplace(mover_,e.id,getIndexOfK(allids,'#'+e.id))
                t15=is_the_king_checked()
                G_validmoves=[]
                rotatebord()
                check_prmotion([promotype,mover_[1]],e.id,getIndexOfK(allids,'#'+e.id))
                mover_=0
                turn=-turn
                return true
            }
        }
        set_guide(current_move,G_validmoves,'',0,h)
        G_validmoves=[]
        alert('invalide move')
        return false
    }
}