document.write("EX 1<br>")
let name_ = "bella abdelouahab"
let age = 20
console.log("hey my name is ", name_, ' I am ', age, ' years old<br>')
document.write("hey my name is " + name_ + ' I am ' + age + ' years old<br>')
let name1 = prompt("donnez votre nom :")
let age1 = prompt("donnez votre age :")
document.write("hey your name is " + name1 + ' you are ' + age1 + ' years old<br>')

var map = {}; // You could also use an array
while true{
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

document.getElementById("hellno").innerHTML = '';
var i, l = map.length;
for(i = 0; i < l; i ++){
   if(map[i]){
       document.getElementById("hellno").innerHTML += '<hr>' + i;
   }
}
}

function def() {
    if (inst.elemArray.length <= 0) return true;
    var $this = $(this);
    inst.hideObjects();
    for (var i = 0; i < inst.elemArray.length; i++)
      if (inst.elemArray[i][ELEM_HREF] == $this.attr("href")) break;
    if (i == inst.elemArray.length) return true;
    inst.options.curElem = i;
    inst.options.nextElem = -1;
    inst.options.prevElem = -1;
    inst.calcNextPrevElem();
    inst.$next.hide();
    inst.$prev.hide();
    inst.reset();
    inst.$lightbox.show();
    if (!inst.options.supportCSSPositionFixed) inst.$lightbox.css("top", $(window).scrollTop());
    var boxW = inst.options.loadingwidth + 2 * inst.options.bordersize;
    var boxH = inst.options.loadingheight + 2 * inst.options.bordersize;
    var winH = window.innerHeight ? window.innerHeight : $(window).height();
    var boxT = Math.round(winH / 2 - boxH / 2);
    if (inst.options.titlestyle != "inside") boxT -= Math.round(inst.options.barheight / 2);
    if (boxT < 16) boxT = 16;
    if (inst.options.iequirksmode) inst.$lightboxBox.css({
      "top": boxT
    });
    else inst.$lightboxBox.css({
      "margin-top": boxT
    });
    inst.$lightboxBox.css({
      "width": boxW,
      "height": boxH
    });
    inst.$elemWrap.css({
      "width": boxW,
      "height": boxH
    });
    inst.loadCurElem();
    return false
  }
  def()