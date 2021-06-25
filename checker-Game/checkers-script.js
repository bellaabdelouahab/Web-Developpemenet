let mover=0
let turn=1
allids=ds=[]
listo=['a','b','c','d','e','f','g','h']
dim=false
d=0
x=-1
for (var i=1;i<9;i++){
    for(var j=d ;j<8;j++ ){
        s=document.querySelectorAll('#I'+i+listo[j]+' > img')
        if(s[0]){
            allids.push([s[0].id,s[1].id])
        }
        else{
            allids.push([0])
        }
    }
}
console.log('hhhhhhhhh',allids)
function checkempty(a){
    if((window.getComputedStyle(document.getElementById(a)).getPropertyValue("opacity")==1)){
        return false
    }
    return true
}
function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return [i,index];
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
    console.log(z[0]-14==b[0],!checkempty(allids[z[0]-7][d]),allids[z[0]-7][d])
    if(z[0]-14==b[0]&&!checkempty(allids[z[0]-7][d])){
        document.getElementById(allids[z[0]-7][d]).style.opacity='0';
        return true  
    }
    if(z[0]+14==b[0]&&!checkempty(allids[z[0]+7][d])){
        document.getElementById(allids[z[0]+7][d]).style.opacity='0';
        return true
    }
    if(z[0]-18==b[0]&&!checkempty(allids[z[0]-9][d])){
        document.getElementById(allids[z[0]-9][d]).style.opacity='0';
        return true
    }
    if(z[0]+18==b[0]&&!checkempty(allids[z[0]+9][d])){
        document.getElementById(allids[z[0]+9][d]).style.opacity='0';
        return true
    }
    return false
}
function dime(a){
    let b=getIndexOfK( allids,a)
    if (b[1]==1){
        
    }
    else{

    }
}
function doubleshot(z,v){
    v==1?y1=0:y1=1;
    if((0<(z-14))&&((z+14)<64)&&allids[z-14][0]!=0&&checkempty(allids[z-14][0])&&checkempty(allids[z-14][1])){
        if(document.getElementById(allids[z-7][y1]).style.opacity=='1'){
            turn=0
        }
    }
    if((0<(z+14))&&((z+14)<64)&&allids[z+14][0]!=0&&checkempty(allids[z+14][0])&&checkempty(allids[z+14][1])){
        if(document.getElementById(allids[z+7][y1]).style.opacity=='1'){
            turn=0
        }
    }
    if((0<(z-18))&&((z-18)<64)&&allids[z-18][0]!=0&&checkempty(allids[z-18][0])&&checkempty(allids[z-18][1])){
        if(document.getElementById(allids[z-9][y1]).style.opacity=='1'){
            turn=0
        }
    }
    if((0<(z+18))&&((z+18)<64)&&allids[z+18][0]!=0&&checkempty(allids[z+18][0])&&checkempty(allids[z+18][1])){
        if(document.getElementById(allids[z+9][y1]).style.opacity=='1'){
            turn=0
        }
    }
}
function move(e){
    if (mover==0) {
        ids=document.querySelectorAll('#'+e.id+' > img')
        if(window.getComputedStyle(document.getElementById(ids[0].id)).getPropertyValue("opacity")==1&&(turn==-1||turn==0)){
            mover=[ids[0].id,0]
            turn=-1
        }
        if(window.getComputedStyle(document.getElementById(ids[1].id)).getPropertyValue("opacity")==1&&(turn==1||turn==0)) {
            mover=[ids[1].id,1]
            turn=1
        }
    }
    else{
        var x=document.querySelectorAll('#'+e.id+' > img')
        mover[1]==0?y=0:y=1;
        if(!((checkempty(x[0].id))&&checkempty(x[1].id) && (checkmove(x,mover[0],y)) )){
            return false;
        }
        s1=getIndexOfK( allids,x[y].id)
        doubleshot(s1[0],y)
        if(dime(x[y].id)){

        }
        console.log(turn)
        document.getElementById(mover[0]).style.opacity='0';
        document.getElementById(x[y].id).style.opacity='1';
        if(turn!=0){
        turn=-turn
        }
        mover=0
    }
}