function toggleMenu(){
    let bar =document.querySelector('.navigationbar');
    let toggle =document.querySelector('.toggle');
    bar.classList.toggle('active');
    toggle.classList.toggle('active');
}
var inp1 = document.getElementById("B2");
var inp2 = document.getElementById("B8");
var inp3 = document.getElementById("B16");
var inp4 = document.getElementById("B10");
inp1.onkeyup = function() { inputValidation(this, inp2, inp3,inp4); }
inp2.onkeyup = function() { inputValidation(this, inp1, inp3,inp4); }
inp3.onkeyup = function() { inputValidation(this, inp1,inp2,inp4); }
inp4.onkeyup = function() { inputValidation(this, inp1,inp2,inp3); }
function inputValidation(origin, lock1, lock2, lock3) {
  var response = hasValue(origin.value);
  lock1.disabled = response;
  lock2.disabled = response;
  lock3.disabled = response;
}

function hasValue(value) {
	return value != "" && value.length > 0;
}
function convert(){
    var B2 = document.getElementById("B2").value;
    var B8 = document.getElementById("B8").value;
    var B16 = document.getElementById("B16").value;
    var B10 = document.getElementById("B10").value;
    if(B2)
        fromB2(B2);
    else if(B8)
        fromB8(B8);
    else if(B16)
        fromB16(B16);
    else if(B10)
        fromB10(B10);
}
function fromB2(b){
    var b10= document.getElementById("B10").value = parseInt(b,2);
    document.getElementById("B16").value = b10.toString(16);
    document.getElementById("B8").value = b10.toString(8);
}
function fromB8(b){
    var b10= document.getElementById("B10").value = parseInt(b,8);
    document.getElementById("B16").value = b10.toString(16);
    document.getElementById("B2").value = b10.toString(2);
}
function fromB16(b){
    var b10= document.getElementById("B10").value = parseInt(b,16);
    document.getElementById("B2").value = b10.toString(2);
    document.getElementById("B8").value = b10.toString(8);
}
function fromB10(b){
    b10= parseInt(b,10);
    document.getElementById("B2").value = b10.toString(2);
    document.getElementById("B16").value = b10.toString(16);
    document.getElementById("B8").value = b10.toString(8);
}
function rest(){
    inp1.value="";inp2.value="";inp3.value="";inp4.value="";
    inp1.disabled=false;inp2.disabled=false;inp3.disabled=false;inp4.disabled=false;
}
function myFunction(b) {
    var copyText = document.getElementById("B"+b);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    var tooltip = document.getElementById("myTooltip"+b);
    tooltip.innerHTML = "Copied: " + copyText.value;
  }
  function outFunc(b) {
    var tooltip = document.getElementById("myTooltip"+b);
    tooltip.innerHTML = "Copy to clipboard";
  }
if (localStorage.getItem('light-mode')===null){
    localStorage.setItem('light-mode', "false");
}

checkStatus()

function checkStatus(){
    var elem= document.getElementById('DL');
    if (localStorage.getItem('light-mode')==="true"){
        document.body.classList.add('light-mode');
        elem.src="images/moon.png";
    }else{
        document.body.classList.remove('light-mode');
        elem.src="images/sun.png" ;
    }
}

function DL(){
    var elem= document.getElementById('DL');
     document.body.classList.toggle('light-mode');
    if(document.body.classList.contains('light-mode')){
        elem.src="images/moon.png";
    }
     else{
         elem.src="images/sun.png" ;
     }
 }


function changeStatus(){                                           
    if (localStorage.getItem('light-mode')==="true"){
        localStorage.setItem('light-mode', "false");
        DL();
    } else{
        localStorage.setItem('light-mode', "true");
        DL();
    }
}
function comming(){
    alert('Comming soon !');
}