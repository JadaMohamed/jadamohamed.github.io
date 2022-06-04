function toggleMenu(){
    let bar =document.querySelector('.navigationbar');
    let toggle =document.querySelector('.toggle');
    bar.classList.toggle('active');
    toggle.classList.toggle('active');
}
document.getElementById("basesF").value=10
document.getElementById("result").disabled=true;
function convert(){
    var F=document.getElementById("basesF").value;
    var T=document.getElementById("basesT").value;
    var conv =document.getElementById("inputnbr").value;
    var b10=parseInt(conv,F);
    document.getElementById("result").value= b10.toString(T);
}
function rest(){
    document.getElementById("inputnbr").value="";
    document.getElementById("result").value="";
}
function copy() {
    var copyText = document.getElementById("result");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
}
function outCopy() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}
if (localStorage.getItem('light-mode')===null){
    localStorage.setItem('light-mode', "false");
}
function swap(){
    var tmp=document.getElementById("basesF").value;
    document.getElementById("basesF").value= document.getElementById("basesT").value;
    document.getElementById("basesT").value=tmp;
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