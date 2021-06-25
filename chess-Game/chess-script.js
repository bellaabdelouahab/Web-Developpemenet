let allids=[]
let listo=['a','b','c','d','e','f','g','h']
let mover_=0
let check_king=false
//Array(64) [ "http://127.0.0.1:5500/templates/B-r.png",...]

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
            return [i+1,j+1];
            }
        }
    }
    }
function changeplace(a,disti,ocord,ncord){
    document.querySelectorAll("#"+disti+' img')[0].src=allids[ncord[0]-1][ncord[1]-1][0]=a[0]
    document.querySelectorAll(a[1]+' img')[0].src=allids[ocord[0]-1][ocord[1]-1][0]='#'
}
function checkplace(ocord,ncord,y,H){
    //checking correct destination
    if((ocord[y]+H)>0){
        return (ocord[y]+H==ncord[y])
    }
    return false
}
function check_way(ocord,x,y){
    //checking if there is any piece on the way
    i=j=0
    if(ocord[0]-1+x<0||ocord[1]-1+y<0){
        console.log('fuck it')
        return false
    }
    console.log('works')
    x>0?h=i=1:x==0?h=0:h=i=-1;
    y>0?d=j=1:y==0?d=0:d=j=-1;
    for( i,j ; i!=x || j!=y;i+=h,j+=d){
        console.log('i=',i,'j=',j,ocord[0]-1+i,ocord[1]-1+j)
        console.log(allids[ocord[0]-1+i][ocord[1]-1+j][0]   )
        if(allids[ocord[0]-1+i][ocord[1]-1+j][0][22]=='W'){
            if(allids[ocord[0]-1+i][ocord[1]-1+j][0][24]=='k'){
                check_king=true
            }
            console.log('white')
            return false
        }
        if(allids[ocord[0]-1+i][ocord[1]-1+j][0][22]=='B'){
            if(allids[ocord[0]-1+i][ocord[1]-1+j][0][24]=='k'){
                check_king=true
            }
            console.log('black')
            console.log([ocord[0]-1+i,ocord[1]-1+j])
            return false
        }
    }
    return true
}
function check_prmotion(a,disti,ocord,ncord){
    
    for (var i=0;i<8;i++){
        if(allids[0][i][0][24]=='p'){
            b=prompt("what do you want to premote to?")
            a[0]=a[0]+'-'+b+'.png'
            changeplace(a,disti,ocord,ncord)
        }
        if(allids[7][i][0][24]=='p'){
            b=prompt("what do you want to premote to?")
            a[0]=a[0]+'-'+b+'.png'
            changeplace(a,disti,ocord,ncord)
        }
    }
}
function movep(a,disti,ocord,ncord){
    a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
    if(checkplace(ocord,ncord,0,1*d)){
        if(checkplace(ocord,ncord,1,0)){
            if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
                    if(allids[ncord[0]-1][ncord[1]-1][0][22]!="B"){
                        if(check_way(ocord,1*d,0)){
                            changeplace(a,disti,ocord,ncord)
                        }
                    }
            }
        }
        if(checkplace(ocord,ncord,1,1*d)){
            if(allids[ncord[0]-1][ncord[1]-1][0][22]==t){
                if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                    if(check_way(ocord,0,1*d)){
                        changeplace(a,disti,ocord,ncord)
                    }
                }
            }
        }
        if(checkplace(ocord,ncord,1,-1*d)){
            if(allids[ncord[0]-1][ncord[1]-1][0][22]==t){
                if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                    if(check_way(ocord,0,-1*d)){
                        changeplace(a,disti,ocord,ncord)
                    }
                }
            }
        }
    }
    if(a[1][2]=='7'&&a[0][22]=='B'&&checkplace(ocord,ncord,0,-2)){
        if(allids[ncord[0]-1][ncord[1]-1][0][22]!='B'){
            if(checkplace(ocord,ncord,1,0)){
                console.log('96')
                if(check_way(ocord,-2,0)){
                    changeplace(a,disti,ocord,ncord)
                }
            }
        }
    }
    if(a[1][2]=='2'&&a[0][22]=='W'&&checkplace(ocord,ncord,0,2)){
        if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
            if(checkplace(ocord,ncord,1,0)){
                if(check_way(ocord,2,0)){
                    changeplace(a,disti,ocord,ncord)
                }
            }
        }
    }
    
}
function mover(a,disti,ocord,ncord){
    for(var i=1;i<8;i++){
        a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
        if(checkplace(ocord,ncord,0,i*d)){
            if(checkplace(ocord,ncord,1,0)){
                if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                    if(check_way(ocord,i*d,0)){
                        changeplace(a,disti,ocord,ncord)
                    }
                }
            }
        }
        if(checkplace(ocord,ncord,0,-i*d)){
            if(checkplace(ocord,ncord,1,0)){
                if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                    if(check_way(ocord,-i*d,0)){
                        changeplace(a,disti,ocord,ncord)
                    }
                }
            }
        }
        if(checkplace(ocord,ncord,1,i*d)){
            if(checkplace(ocord,ncord,0,0)){
                if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                    if(check_way(ocord,0,i*d)){
                        changeplace(a,disti,ocord,ncord)
                    }
                }
            }
        }
        if(checkplace(ocord,ncord,1,-i*d)){
            if(checkplace(ocord,ncord,0,0)){
                if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                    if(check_way(ocord,0,-i*d)){
                        changeplace(a,disti,ocord,ncord)
                    }
                }
            }
        }
    }
}
function moven(a,disti,ocord,ncord){
    for(var i=-2;i<5;i+=4){ 
        a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
        if(checkplace(ocord,ncord,0,i)&&checkplace(ocord,ncord,1,1)){
            if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
                changeplace(a,disti,ocord,ncord)
            }
        }
        if(checkplace(ocord,ncord,0,i)&&checkplace(ocord,ncord,1,-1)){
            if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
                changeplace(a,disti,ocord,ncord)
            }
        }
        if((checkplace(ocord,ncord,1,i)&&checkplace(ocord,ncord,0,1))){
            if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
                changeplace(a,disti,ocord,ncord)
            }
        }
        if(checkplace(ocord,ncord,1,i)&&checkplace(ocord,ncord,0,-1)){
            if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
                changeplace(a,disti,ocord,ncord)
            }
        }
    }
}
function adn(validmoves,a,b){
    for(var i=0;i<validmoves.length;i++){
        if(validmoves[i][0]==a&&validmoves[i][1]==b){
            return true
        }
    }
    return false
}
function moveb(a,disti,ocord,ncord){
    if(ocord[0]==ncord[0]&&ocord[1]==ncord[1]){
        return false
    }
    validmoves1=[]
    validmoves=[]
    for(var i=-8;i<8;i++){  
        if(0<=(ocord[0]-1+i)&&(ocord[0]-1+i)<8&&0<=(ocord[1]-1+i)&&(ocord[1]-1+i)<8){
            if(!adn(validmoves1,ocord[0]-1+i,ocord[1]-1+i)){
            validmoves1.push([ocord[0]-1+i,ocord[1]-1+i])
            console.log('push1')
            }
        }
    }
    for(var i=-8;i<8;i++){
        if(0<=(ocord[0]-1+i)&&(ocord[0]-1+i)<8&&0<=(ocord[1]-1-i)&&(ocord[1]-1-i)<8){
            if(!adn(validmoves,ocord[0]-1+i,ocord[1]-1-i)){
            validmoves.push([ocord[0]-1+i,ocord[1]-1-i])
            }
        }
    }
    console.log('valide moves:',validmoves,validmoves1)
    for(var i=0;i<validmoves.length;i++){
        
        if(validmoves[i][0]==(ncord[0]-1)&&validmoves[i][1]==(ncord[1]-1)){
            changeplace(a,disti,ocord,ncord)
            return true
        }
    }
    for(var i=0;i<validmoves1.length;i++){
        
        if(validmoves1[i][0]==(ncord[0]-1)&&validmoves1[i][1]==(ncord[1]-1)){
            changeplace(a,disti,ocord,ncord)
            return true
        }
    }
    return false

/*
    for(var i=0;i<8;i++){
        a[0][22]=="W"?(d=1,t='B'):(d=-1,t='W');
        if(!checkplace(ocord,ncord,0,0)){
            if(checkplace(ocord,ncord,0,i*d)){
                if(checkplace(ocord,ncord,1,i*d)){
                    if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                        if(allids[ncord[0]-1][ncord[1]-1][0][24]=='k'){
                            check_king=true
                            console.log('done')
                        }
                        else{
                            console.log(allids[ncord[0]-1][ncord[1]-1][0])
                        }
                        if(check_way(ocord,i*d,i*d)){
                            console.log('run1')
                            changeplace(a,disti,ocord,ncord)
                        }
                    }
                }
            }
            if(checkplace(ocord,ncord,0,-i*d)){
                if(checkplace(ocord,ncord,1,-i*d)){
                    if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                        if(check_way(ocord,-i*d,-i*d)){
                            console.log('run2')
                            changeplace(a,disti,ocord,ncord)
                        }
                    }
                }
            }
            if(checkplace(ocord,ncord,1,-i*d)){
                if(checkplace(ocord,ncord,0,i*d)){
                    if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                        if(check_way(ocord,i*d,-i*d)){
                            console.log('run3')
                            changeplace(a,disti,ocord,ncord)
                            return true
                        }
                    }
                }
            }
            if(checkplace(ocord,ncord,0,-i*d)){
                if(checkplace(ocord,ncord,1,i*d)){
                    console.log('run4')
                    if(allids[ncord[0]-1][ncord[1]-1][0][22]!=a[0][22]){
                        if(check_way(ocord,-i*d,i*d)){
                            changeplace(a,disti,ocord,ncord)
                        }
                    }
                }
            }
        }
        moveb(a,disti,ncord,[ncord[0]+i,ncord[1]+i])
    }*/
}
function moveQ(a,disti,ocord,ncord){
    moveb(a,disti,ocord,ncord)
    mover(a,disti,ocord,ncord)
}
function movek(a,disti,ocord,ncord){
    a[0][22]=="W"?d=1:d=-1;
    if(checkplace(ocord,ncord,0,1)||checkplace(ocord,ncord,0,-1)){
        if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
            changeplace(a,disti,ocord,ncord)
        }
    }
    if(checkplace(ocord,ncord,1,1)||checkplace(ocord,ncord,1,-1)){
        if(allids[ncord[0]-1][ncord[1]-1][0][22]!='W'){
            changeplace(a,disti,ocord,ncord)
        }
    }
    if(check_king){

    }
}

function move(e){
    if (mover_==0){
        for(var i=0 ;i<8;i++){
            for(var j=0;j<8;j++){
                //console.log(document.querySelectorAll("#"+e.id+' img')[0].src,allids[i][j][0],'hh',i,'hhii',j)
                //console.log('#'+e.id,allids[i][j][1])
                if(document.querySelectorAll("#"+e.id+' img')[0].src===allids[i][j][0]&&'#'+e.id==allids[i][j][1]){
                    mover_=allids[i][j]
                    console.log([i,j])
                    return true
                }
            }
        }
        console.log(allids)
    }
    else{
        promotype='http://127.0.0.1:5500/'+mover_[0][22]
        console.log("checkking",check_king)
        //console.log(mover_,e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        if(mover_[0][24]=='p'){
            movep(mover_,e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        }
        else if(mover_[0][24]=='r'){
            mover(mover_,e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        }
        else if(mover_[0][24]=='n'){
            moven(mover_,e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        }
        else if(mover_[0][24]=='b'){
            moveb(mover_,e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        }
        else if(mover_[0][24]=='Q'){
            moveQ(mover_,e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        }
        else if(mover_[0][24]=='k'){
            movek(mover_,e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        }
        else {
            console.log('notfound'+mover_[0][24])
        }
        check_prmotion([promotype,mover_[1]],e.id,getIndexOfK(allids,mover_[1]),getIndexOfK(allids,'#'+e.id))
        mover_=0
    }
}