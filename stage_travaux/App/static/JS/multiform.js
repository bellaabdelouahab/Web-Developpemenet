var currentTab = 0; // Current tab is set to be the first tab (0)
let Cheque=1.0025 // espece paying tax 
showTab(currentTab); // Display the current tab
function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if(x[n].id=='tab' && document.getElementById('rad3').checked){
    var y = document.getElementsByClassName("tab");
    // Hide the current tab:
    y[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + 1;
    fixStepIndicator(1)
    // Otherwise, display the correct tab:
    showTab(currentTab);
    return true
  }
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "inline";
    let a= new Date
    $("#s_c").innerHTML=$("#_s_c").value
    $("#s_f").innerHTML=$("#_s_f").value
    $("#s_a").innerHTML=$("#_s_a").value
    $("#s_p").innerHTML=$("#_s_p").value
    $("#r_c").innerHTML=$("#_r_c").value
    $("#r_f").innerHTML=$("#_r_f").value
    $("#r_a").innerHTML=$("#_r_a").value
    $("#r_p").innerHTML=$("#_r_p").value
    $("#daterec").innerHTML=a.getFullYear()+'/'+a.getMonth()+'/'+a.getDate()+'-'+a.getHours()+':'+a.getMinutes()
    $("#id").innerHTML='id1151'
    $("#Tax").innerHTML=$("#pricetva").innerHTML
    $("#price1").innerHTML=$("#pricenor").innerHTML
    $("#Ttc").innerHTML=$("#pricettc").innerHTML
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "inline";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }

  }
  if(document.querySelector('#_s_p').value.length>0&&!Is_a_phonenumber(document.querySelector('#_s_p'))){
    document.querySelector('#_s_p').className += " invalid";
    valid=false
  }
  if(document.querySelector('#_r_p').value.length>0&&!Is_a_phonenumber(document.querySelector('#_r_p'))){
    document.querySelector('#_r_p').className += " invalid";
    valid=false
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
//... package information
let oldvalue=0
let oldvaluesms=0
let oldvaluerecept=0
let oldvaluetype=1.22
function calc_weight(e){
  let weight=parseFloat(e.value)
  let current_weight=parseFloat(document.getElementById("price").innerHTML)
  current_weight-=oldvalue

  if(0<=weight&&weight<5 ){
    newvalue=user.p1
  }
  else if(5<=weight&&weight<10){
    newvalue=user.p2
  }
  else if(10<=weight&&weight<15){
    newvalue=user.p3
  }
  else if(15<=weight&&weight<20){
    newvalue=user.p4
  }
  else if(20<=weight&&weight<25) {
    newvalue=user.p5
  }
  else if(25<=weight&&weight<30){
    newvalue=user.p6
  }
  else{
    document.getElementById("price").innerHTML=0
    calcall(0)
    oldvalue=current_weight
    return false;
  }
  current_weight+=newvalue
  current_weight-=(oldvaluesms+oldvaluerecept)
  oldvaluerecept=oldvaluesms=0
  document.getElementById("checkbox1").checked = false;
  document.getElementById("checkbox2").checked = false;
  calcall(current_weight)
  oldvalue=current_weight
  oldvaluetype=0
}
function calc_type(){
  let a = document.getElementById("checkbox1").checked
  a?adr=2:adr=-2
  let current_weight=parseFloat(document.getElementById("price").innerHTML)
  current_weight+=adr
  oldvaluesms=adr
  calcall(current_weight)

}
function calc_type1(){
  let a = document.getElementById("checkbox2").checked
  a?adr=12:adr=-12
  let current_weight=parseFloat(document.getElementById("price").innerHTML)
  current_weight+=adr 
  oldvaluesms=adr
  calcall(current_weight)
}
function radio1(){
  let rad1=document.getElementById("rad1").checked
  let rad2=document.getElementById("rad2").checked
  let current_weight=parseFloat(document.getElementById("price").innerHTML)
  if (rad2&&oldvaluetype==0){
    oldvaluetype=current_weight*0.22
    current_weight+=oldvaluetype
  }
  else if(rad1&&oldvaluetype!=0){
    current_weight-=oldvaluetype
    oldvaluetype=0
  }
  calcall(current_weight)
  
}
let rad1=document.getElementById("rad1").checked=true;
function calcall(a){
  document.getElementById("price").innerHTML=a
  document.getElementById("pricetva").innerHTML=(a*0.20).toFixed(2)+'DH'
  document.getElementById("pricettc").innerHTML=(a*1.20*Cheque).toFixed(2)+'DH'
}
function cheque(){
  document.getElementById("rad4").checked?Cheque=1:Cheque=1.0025;
  let current_weight=parseFloat(document.getElementById("price").innerHTML)
  calcall(current_weight)
}
function Is_a_phonenumber(phon_nbr){
  var phoneno = /^\+?([0-9]{1})\)?[-. ]?([0-9]{8})$/;
  if((phon_nbr.value.match(phoneno))){
    return true;
  }
  else{
    return false;
  }
}
document.querySelector('#_s_p').addEventListener('input',function(){
  if(document.querySelector('#_s_p').value.length==2&&!document.querySelector('#_s_p').value.includes('-')){
    document.querySelector('#_s_p').value=document.querySelector('#_s_p').value[0]+'-'+document.querySelector('#_s_p').value[1]
  }
})
document.querySelector('#_r_p').addEventListener('input',function(){
  if(document.querySelector('#_r_p').value.length==2&&!document.querySelector('#_r_p').value.includes('-')){
    document.querySelector('#_r_p').value=document.querySelector('#_r_p').value[0]+'-'+document.querySelector('#_r_p').value[1]
  }
})
