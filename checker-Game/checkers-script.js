let mover=0
let turn=1
allids=ds=[]
listo=['a','b','c','d','e','f','g','h']
let Dim=false
let pre_capture=false

x=-1
for (var i=1;i<9;i++){
    for(var j=0 ;j<8;j++ ){
        s=$('#I'+i+listo[j]+' > img')
        s[0]?allids.push([[s[0].id,Dim],[s[1].id,Dim]]):allids.push([0]);
    }
}
console.log(allids)
function checkempty(a){
    if((window.getComputedStyle(document.getElementById(a)).getPropertyValue("opacity")==1)){
        return false
    }
    return true
}
function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
        if(arr[i][0]!=0){
            for(var j=0;j<2;j++){
                if(arr[i][j][0]==k){
                    var index=j
                }
                else{
                    var index=-1
                }
                if (index > -1) {
                    return [i,index];
                }
            }
        }
    }
  }
function checkmove(a,c,y){
    let b=getIndexOfK( allids,a[y].id)
    let z=getIndexOfK( allids,c)
    if(z[0]-7==b[0]||z[0]+7==b[0]||z[0]-9==b[0]||z[0]+9==b[0]){
        return true
    }
    y==1?d=0:d=1;
    for(var i=1 ; i<8;i++){
        if(i>1&&allids[z[0]][z[1]][1]!=true){
            return false
        }
        if(z[0]-7*i-7>0&&z[0]-7*i-7==b[0]&&!checkempty(allids[z[0]-7*i][d][0])){
            document.getElementById(allids[z[0]-7*i][d][0]).style.opacity='0';
            pre_capture=true
            return true  
        }
        if(z[0]+7*i+7>0&&z[0]+7*i+7==b[0]&&!checkempty(allids[z[0]+7*i][d][0])){
            document.getElementById(allids[z[0]+7*i][d][0]).style.opacity='0';
            pre_capture=true
            return true
        }
        if(z[0]-9*i-9>0&&z[0]-9*i-9==b[0]&&!checkempty(allids[z[0]-9*i][d][0])){
            document.getElementById(allids[z[0]-9*i][d][0]).style.opacity='0';
            pre_capture=true
            return true
        }
        if(z[0]+9*i+9>0&&z[0]+9*i+9==b[0]&&!checkempty(allids[z[0]+9*i][d][0])){
            document.getElementById(allids[z[0]+9*i][d][0]).style.opacity='0';
            pre_capture=true
            return true
        }
    }
    return false
}
function dime(a){
    let b=getIndexOfK( allids,a)
    if (b[1]==1&&b[0]<8||b[1]==0&&b[0]>56){
        allids[b[0]][b[1]][1]=true
        return true
    }
    return false
}
function doubleshot(z,v){
    v==1?y1=0:y1=1;
    if(pre_capture==false){
        return false
    }
    if((0<(z-14))&&((z+14)<64)&&allids[z-14][0][0]!=0&&checkempty(allids[z-14][0][0])&&checkempty(allids[z-14][1][0])){
        if(document.getElementById(allids[z-7][y1][0]).style.opacity=='1'){
            turn=0
        }
    }
    if((0<(z+14))&&((z+14)<64)&&allids[z+14][0][0]!=0&&checkempty(allids[z+14][0][0])&&checkempty(allids[z+14][1][0])){
        if(document.getElementById(allids[z+7][y1][0]).style.opacity=='1'){
            turn=0
        }
    }
    if((0<(z-18))&&((z-18)<64)&&allids[z-18][0][0]!=0&&checkempty(allids[z-18][0][0])&&checkempty(allids[z-18][1][0])){
        if(document.getElementById(allids[z-9][y1][0]).style.opacity=='1'){
            turn=0
        }
    }
    if((0<(z+18))&&((z+18)<64)&&allids[z+18][0][0]!=0&&checkempty(allids[z+18][0][0])&&checkempty(allids[z+18][1][0])){
        if(document.getElementById(allids[z+9][y1][0]).style.opacity=='1'){
            turn=0
        }
    }
}
function checkwin(){
    let win1=true
    let win2=true
    for(var i=0 ;i<64;i++){
        if(allids[i][0]!=0){
            if(window.getComputedStyle(document.getElementById(allids[i][0][0])).getPropertyValue("opacity")==1){
                win1=false
            }
            if(window.getComputedStyle(document.getElementById(allids[i][1][0])).getPropertyValue("opacity")==1){
                win2=false
            }
        }
    }
    if(win1){
        alert('firts player won')
    }
    if(win2){
        alert('second player won')
    }
}
function move(e){
    if (mover==0) {
        ids=document.querySelectorAll('#'+e.id+' > img')
        if(window.getComputedStyle(document.getElementById(ids[0].id)).getPropertyValue("opacity")==1&&turn==-1){
            mover=[ids[0].id,0]
            turn=-1
        }
        if(window.getComputedStyle(document.getElementById(ids[0].id)).getPropertyValue("opacity")==1&&turn==0){
            mover=[ids[0].id,0]
            turn=1
        }
        if(window.getComputedStyle(document.getElementById(ids[1].id)).getPropertyValue("opacity")==1&&turn==1) {
            mover=[ids[1].id,1]
            turn=1
        }
        if(window.getComputedStyle(document.getElementById(ids[1].id)).getPropertyValue("opacity")==1&&turn==0) {
            mover=[ids[1].id,1]
            turn=-1
        }
    }
    else{
        var x=document.querySelectorAll('#'+e.id+' > img')
        mover[1]==0?y=0:y=1;
        if(!((checkempty(x[0].id))&&checkempty(x[1].id) && (checkmove(x,mover[0],y)) )){
            return false;
        }
        s1=getIndexOfK( allids,x[y].id)[0]
        doubleshot(s1[0],y)
        dime(x[y].id)
        if(allids[getIndexOfK( allids,x[y].id)[0]][getIndexOfK( allids,x[y].id)[1]][1]){
            Dim_capture()
        }
        
        document.getElementById(mover[0]).style.opacity='0';
        document.getElementById(x[y].id).style.opacity='1';
        if(turn!=0){
        turn=-turn
        }
        mover=0
        checkwin()
    }
}